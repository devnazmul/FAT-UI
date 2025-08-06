import { useEffect, useState } from "react";
import { LuSearch } from "react-icons/lu";
import { NavLink, useLocation } from "react-router-dom";
import { OutsideClickHandler } from "./OutsideClickHandler";
import PropTypes from "prop-types";

const filterTitles = (routes, term) => {
  return routes.reduce((acc, route) => {
    const matches = route.title.toLowerCase().includes(term.toLowerCase());

    let filteredChildren = [];
    if (route.childrens && route.childrens.length > 0) {
      filteredChildren = filterTitles(route.childrens, term);
    }

    if (filteredChildren.length > 0) {
      // Parent has matching children, include only those children in the result
      acc = acc.concat(filteredChildren);
    } else if (matches && route.show) {
      // Parent has no children or no matching children, include parent alone
      acc.push({
        ...route,
        childrens: [] // Clear children since we're not including any
      });
    }

    return acc;
  }, []);
};

const RouteSearchComponentSlackTheme = ({ routes }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [isSuggestionOpen, setIsSuggestionOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setSearchTerm("");
    setIsSuggestionOpen(false);
  }, [location]);

  // Function to handle input change
  const handleInputChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    if (term) {
      setIsSuggestionOpen(true);
    }
    const filteredSuggestions = filterTitles(routes, term).map(
      (route) => route
    );
    setSuggestions(filteredSuggestions);
  };

  return (
    <OutsideClickHandler
      onOutsideClick={() => {
        setSearchTerm("");
        setIsSuggestionOpen(false);
      }}
      className={`relative`}
    >
      <input
        type="text"
        value={searchTerm}
        onChange={handleInputChange}
        className={`bg-primary-content focus:outline-none outline-none focus:ring-offset-0 focus:ring-opacity-0 focus:border-2 rounded-[5px] py-2 px-2  border-primary w-[500px] placeholder:text-primary text-primary`}
        placeholder="Quick Search..."
        onFocus={() => {
          if (searchTerm) {
            setIsSuggestionOpen(true);
          }
        }}
      />
      <LuSearch
        className={`absolute top-1/2 -translate-y-1/2 right-2  text-primary-content text-xl`}
      />
      {isSuggestionOpen ? (
        <ul
          className={`absolute top-[57px] right-0 bg-base-300 rounded-[5px] shadow-primary-content shadow-2xl max-h-[300px] overflow-y-auto overflow-x-hidden custom-scrollbar w-[500px] border border-primary`}
        >
          {suggestions?.length > 0 ? (
            <>
              {suggestions?.map((suggestion, index) => (
                <NavLink
                  onClick={() => {
                    setSearchTerm("");
                  }}
                  to={suggestion?.link}
                  className={`py-2 px-2 flex items-center hover:bg-primary hover:text-base-300`}
                  key={index}
                >
                  {suggestion?.title}
                </NavLink>
              ))}
            </>
          ) : (
            <div
              className={`flex flex-col py-2 px-2 gap-2 w-full justify-center items-center`}
            >
              <img
                className={`w-32 h-32 object-cover`}
                src="/assets/no_search_result.png"
                alt="No results found"
              />
              <span className={`text-lg font-semibold`}>No results found</span>
            </div>
          )}
        </ul>
      ) : (
        ""
      )}
    </OutsideClickHandler>
  );
};

export default RouteSearchComponentSlackTheme;

RouteSearchComponentSlackTheme.propTypes = {
  routes: PropTypes.array
};
