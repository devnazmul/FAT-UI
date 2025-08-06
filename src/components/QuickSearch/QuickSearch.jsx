import quickSearchStore from "@/store/quickSearchStore.js";
import { flattenRoutes } from "@/utils/flattenRoutes.js";
import HighlightMatch from "@/utils/HighlightMatch.jsx";
import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import { OutsideClickHandler } from "../OutsideClickHandler.jsx";
import { BiLinkExternal } from "react-icons/bi";

const QuickSearch = ({ routes, shortcuts }) => {
  const { isQuickSearchOpen: open, setIsQuickSearchOpen: setOpen } =
    quickSearchStore();
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(-1);
  const inputRef = useRef(null);
  const resultsContainerRef = useRef(null);
  const [results, setResults] = useState({
    routes: [],
    shortcuts: []
  });

  // HANDLE FILTER FUNCTIONALITY
  function filterItems(query) {
    // If query is empty return empty array
    if (!query) return [];

    // Convert query to lowercase
    const q = query?.toLowerCase();

    // Filter routes and shortcuts
    const routeResults = flattenRoutes(routes)
      .filter((r) => r?.title?.toLowerCase()?.includes(q) && !r?.isParent)
      .map((r) => ({ type: "Route", ...r }));

    // Filter shortcuts
    const shortcutResults = shortcuts
      .filter((s) => s?.title?.toLowerCase()?.includes(q))
      .map((s) => ({ type: "Shortcut", ...s }));

    // Return filtered results
    return [...routeResults, ...shortcutResults];
  }

  // HANDLE MOUSE CLICKS TO PERFORM OPEN AND CLOSE QUICK SEARCH
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen(true);
      }
      if (open) {
        if (e.key === "Escape") {
          setOpen(false);
        } else if (e.key === "ArrowDown") {
          e.preventDefault();
          setActiveIndex((prevIndex) => {
            const totalResults =
              results.routes.length + results.shortcuts.length;
            return prevIndex < totalResults - 1 ? prevIndex + 1 : prevIndex;
          });
        } else if (e.key === "ArrowUp") {
          e.preventDefault();
          setActiveIndex((prevIndex) => {
            return prevIndex > 0 ? prevIndex - 1 : 0;
          });
        } else if (e.key === "Enter") {
          e.preventDefault();
          if (activeIndex !== -1) {
            const allItems = [...results.routes, ...results.shortcuts];
            const activeItem = allItems[activeIndex];

            if (activeItem) {
              if (activeItem.type === "Route" && activeItem.show) {
                const linkElement = resultsContainerRef.current?.querySelector(
                  `[data-index="${activeIndex}"][data-type="Route"]`
                );
                linkElement?.click();
              } else if (activeItem.type === "Shortcut") {
                activeItem.handler();
                setOpen(false);
              }
            }
          }
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, results.routes, results.shortcuts, activeIndex, setOpen]);

  // HANDLE QUERY CHANGE WHEN SEARCH POPUP OPEN AND CLOSE
  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current && inputRef.current.focus(), 100);
      setActiveIndex(-1);
    } else {
      setQuery("");
      setResults({ routes: [], shortcuts: [] });
      setActiveIndex(-1);
    }
  }, [open]);

  // ACCORDING TO THE QUERY GETTING THE RESULTS
  useEffect(() => {
    setResults({
      routes: filterItems(query)?.filter((item) => item.type === "Route"),
      shortcuts: filterItems(query)?.filter((item) => item.type === "Shortcut")
    });
  }, [query]);

  // SCROLLING TO THE ACTIVE ITEM
  useEffect(() => {
    // Scroll to the active item
    if (activeIndex !== -1 && resultsContainerRef.current) {
      const activeElement = resultsContainerRef.current.querySelector(
        `[data-index="${activeIndex}"]`
      );

      // Scroll to the active item
      if (activeElement) {
        activeElement.scrollIntoView({
          block: "nearest",
          inline: "nearest",
          behavior: "smooth"
        });
      }
    }
  }, [activeIndex]);

  // COMBINE ROUTES AND SHORTCUTS
  const combinedResults = [
    ...results.routes.filter((r) => r.show),
    ...results.shortcuts
  ];

  return (
    <>
      {/* QUICK SEARCH OPENED? */}
      {open && (
        <div
          style={{
            zIndex: 9999
          }}
          className={`w-screen h-screen bg-opacity-50 bg-black fixed left-0 top-0`}
        >
          {/* POPUP */}
          <OutsideClickHandler
            onOutsideClick={() => setOpen(false)}
            className={`bg-base-300 fixed transition-all duration-300 ease-in-out w-[95%] md:max-w-[700px] top-28 border rounded-xl  overflow-hidden shadow-2xl right-1/2 translate-x-1/2`}
          >
            <div
              style={{
                minWidth: 400,
                display: "flex",
                flexDirection: "column",
                alignItems: "stretch"
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* INPUT FIELD */}
              <label htmlFor="quick-search-input" className={`relative`}>
                <input
                  id="quick-search-input"
                  ref={inputRef}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search routes, shortcuts..."
                  className={`px-3 md:px-5  w-[calc(100%-60px)] outline-none text-md md:text-[20px] py-1 my-5 bg-base-300 mb-[20px]`}
                />
                <kbd
                  className={`absolute top-1/2 -translate-y-1/2 right-5 kbd kbd-xs md:kbd-sm`}
                >
                  Esc
                </kbd>
              </label>

              {/* RESULTS DROPDOWN */}
              <div
                ref={resultsContainerRef}
                className={`divide-y max-h-[400px] overflow-y-auto overflow-x-hidden custom-scrollbar`}
              >
                {/* NO RESULTS FOUND */}
                {combinedResults.length === 0 && query ? (
                  <div
                    className={`flex justify-center items-center flex-col gap-5 p-10 border-t`}
                  >
                    <img
                      className={`w-32 h-32 md:w-52 md:h-52 object-contain`}
                      src="/assets/no_search_result.png"
                      alt="No results found"
                    />
                    <span className={`text-md md:text-xl font-semibold`}>
                      No results found.
                    </span>
                  </div>
                ) : (
                  // RESULTS FOUND
                  <>
                    {/* ROUTES  */}
                    {results?.routes?.length > 0 && (
                      <h4
                        className={`uppercase text-zinc-400 bg-base-100 text-xs px-5 py-2 border-t font-bold sticky top-0 z-10`}
                      >
                        Routes
                      </h4>
                    )}

                    {/* ROUTES LIST */}
                    {results?.routes
                      ?.filter((r) => r.show)
                      .map((item, idx) => {
                        const globalIndex = combinedResults.findIndex(
                          (res) => res === item
                        );
                        return (
                          <NavLink
                            onClick={() => setOpen(false)}
                            to={item.link}
                            key={`route-${idx}`}
                            data-index={globalIndex}
                            data-type="Route"
                            className={`px-5  group py-2 flex-col items-start justify-center w-full text-left flex gap-x-2
                              ${
                                activeIndex === globalIndex
                                  ? "bg-primary text-base-300"
                                  : "hover:bg-primary hover:text-base-300"
                              }`}
                          >
                            {/* TITLE */}
                            <span className={`flex items-center gap-x-1`}>
                              <BiLinkExternal />

                              <HighlightMatch
                                text={item?.title}
                                query={query}
                              />
                            </span>
                            {/* STRUCTURE */}
                            <span
                              className={`${
                                activeIndex === globalIndex
                                  ? "text-base-300"
                                  : "text-zinc-400 group-hover:text-base-300"
                              } text-xs font-light`}
                            >
                              {item?.routesStructure}
                            </span>
                          </NavLink>
                        );
                      })}

                    {/* ========================================================== */}
                    {/* ========================================================== */}

                    {/* SHORTCUTS */}
                    {results?.shortcuts?.length > 0 && (
                      <h4
                        className={`uppercase text-zinc-400 bg-base-100 text-xs px-5 py-2 border-t font-bold sticky top-0 z-10`}
                      >
                        Shortcuts
                      </h4>
                    )}

                    {/* SHORTCUTS LIST */}
                    {results?.shortcuts?.map((item, idx) => {
                      const globalIndex = combinedResults.findIndex(
                        (res) => res === item
                      );
                      return (
                        <button
                          key={`shortcut-${idx}`}
                          data-index={globalIndex}
                          data-type="Shortcut"
                          className={`px-5 py-2 w-full text-left
                            ${
                              activeIndex === globalIndex
                                ? "bg-primary text-base-300"
                                : "hover:bg-primary hover:text-base-300"
                            }`}
                          onClick={() => {
                            item.handler();
                            setOpen(false);
                          }}
                        >
                          <HighlightMatch text={item.title} query={query} />
                        </button>
                      );
                    })}
                  </>
                )}
              </div>
            </div>
          </OutsideClickHandler>
        </div>
      )}
    </>
  );
};

export default QuickSearch;

QuickSearch.propTypes = {
  routes: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      link: PropTypes.string,
      Icon: PropTypes.element,
      show: PropTypes.bool,
      childrens: PropTypes.array
    })
  ),
  shortcuts: PropTypes.arrayOf(
    PropTypes.shape({
      Icon: PropTypes.element,
      title: PropTypes.string,
      handler: PropTypes.func
    })
  )
};
