import { OctagonAlert } from "lucide-react";
import PropTypes from "prop-types";
import { forwardRef, useEffect, useMemo, useRef, useState } from "react";
import { FiPlus } from "react-icons/fi";
import { RxCrossCircled } from "react-icons/rx";
import truncateText from "../../../utils/truncateText";

const MultiSelectV2 = forwardRef(
  (
    {
      id,
      name,
      placeholder,
      onChange,
      options = [],
      singleSelect = false,
      defaultValue = [],
      label = "Test",
      disable = false,
      addNewItem = false,
      handleAddNewItem = (event) => event,
      hintIcon = <OctagonAlert color="#000000" />, // New hintIcon prop
      onHintIconClick = () => {}, // Callback for hint icon click
      isClearable = false,
      isSearchable = true,
      isAllSelectable = false,
      required = false,
      isHintShow = false,
      visibleBorder = false,
      top = false,
      wrapperClassName,
      isValid,
      dataAuto
    },
    forwardedRef
  ) => {
    const selectRef = useRef();
    const dropdownRef = useRef();
    const [selectedOptions, setSelectedOptions] = useState([]);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");

    const defaultValueMemo = useMemo(() => defaultValue, [defaultValue]);
    const optionsMemo = useMemo(() => options, [options]);

    // Ensure the default value is set on mount
    useEffect(() => {
      //  THAT IS FOR SINGLE SELECT
      if (!Array.isArray(defaultValueMemo)) {
        const defaultOptions = optionsMemo.filter((item) =>
          [defaultValue].includes(item.id)
        );
        setSelectedOptions(defaultOptions);
        // onChange(defaultValue); // Ensure onChange sends array of IDs
      }

      // MULTIPLE SELECT
      if (Array.isArray(defaultValueMemo)) {
        if (defaultValue.length) {
          const defaultOptions = optionsMemo.filter((item) =>
            defaultValue.includes(item.id)
          );
          setSelectedOptions(defaultOptions);
        }
      }

      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [defaultValueMemo, optionsMemo]);

    useEffect(() => {
      const handler = (event) => {
        if (!selectRef.current?.contains(event.target)) {
          setIsDropdownOpen(false);
        }
      };
      document.addEventListener("mousedown", handler);

      return () => {
        document.removeEventListener("mousedown", handler);
      };
    }, []);

    const handleOptionToggle = (option) => {
      if (singleSelect) {
        setSelectedOptions([option]);
        setIsDropdownOpen(false); // Close dropdown after selecting in single select mode
        onChange([option]); // Trigger onChange with the selected option
      } else {
        const index = selectedOptions.findIndex(
          (item) => item.id === option.id
        );
        if (index !== -1) {
          const newSelectedOptions = selectedOptions.filter(
            (item) => item.id !== option.id
          );
          setSelectedOptions(newSelectedOptions);
          onChange(newSelectedOptions); // Trigger onChange with the new selected options
        } else {
          const newSelectedOptions = [...selectedOptions, option];
          setSelectedOptions(newSelectedOptions);
          onChange(newSelectedOptions); // Trigger onChange with the new selected options
        }
      }
    };

    const handleOptionRemove = (option) => {
      const newSelectedOptions = selectedOptions.filter(
        (item) => item.id !== option.id
      );
      setSelectedOptions(newSelectedOptions);
      onChange(newSelectedOptions); // Trigger onChange with the new selected options
    };

    const toggleDropdown = (e) => {
      e.stopPropagation();
      if (!disable) {
        setIsDropdownOpen(!isDropdownOpen);
      }
    };

    const handleSearchChange = (e) => {
      setSearchTerm(e.target.value);
      setIsDropdownOpen(true);
    };

    const filteredOptions = options.filter((option) =>
      option.label.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleSelectAll = (e) => {
      if (e.target.checked) {
        setSelectedOptions(filteredOptions);
        onChange(filteredOptions); // Trigger onChange with all filtered options
      } else {
        setSelectedOptions([]);
        onChange([]); // Trigger onChange with an empty array
      }
    };

    const isAllSelected =
      Array.isArray(selectedOptions) &&
      filteredOptions.length > 0 &&
      filteredOptions.every((option) =>
        selectedOptions.some((item) => item.id === option.id)
      );

    const handleClearSelection = (event) => {
      event.stopPropagation();
      setSelectedOptions([]);
      setSearchTerm("");
      onChange([]); // Trigger onChange with an empty array
    };

    return (
      <div
        className={`relative w-full ${wrapperClassName}`}
        onClick={(e) => {
          e.stopPropagation();
        }}
        ref={selectRef}
      >
        {label && (
          <div className="flex items-center">
            <label className={`label`}>
              <span className="label-text  text-md font-bold">
                {label}{" "}
                {required && !disable && (
                  <span className="text-error font-bold text-md">*</span>
                )}
              </span>
            </label>
            {isHintShow && (
              <button
                type="button"
                className="ml-2 p-1"
                onClick={(event) => {
                  event.preventDefault();
                  onHintIconClick();
                }}
              >
                {hintIcon}
              </button>
            )}
          </div>
        )}

        <div
          data-auto={`${dataAuto}-open`}
          style={{ display: "flex" }}
          className={`relative z-10 flex-wrap rounded-md bg-base-300 input-bordered outline-none focus:outline-none items-center px-1
        ${
          disable
            ? `h-[3.2rem] cursor-not-allowed
            ${visibleBorder && "disabled:border-gray-200 border-opacity-10"}`
            : `h-auto`
        }
        w-full input
        ${isDropdownOpen ? "border-2 border-primary" : ""}
        ${isValid ? "border-red-500" : ""}
          `}
          onClick={(event) => {
            // event.preventDefault();
            toggleDropdown(event);
          }}
        >
          {selectedOptions.map((option) => (
            <div
              key={option.id}
              className="bg-primary-content z-10 px-5 py-1 rounded-md my-1 mx-1 shadow-md inline-flex gap-2 items-center"
              role="button"
              onClick={(event) => {
                event.stopPropagation();
                if (!disable) {
                  toggleDropdown(event);
                }
              }}
              data-auto={`selected_values-${dataAuto}`}
            >
              {typeof option?.label === "string" &&
                truncateText(option?.label, 20)}{" "}
              {!disable && (
                <button
                  data-auto={`selected_values_remove-${dataAuto}`}
                  onClick={(e) => {
                    // e.preventDefault();
                    e.stopPropagation();
                    handleOptionRemove(option);
                  }}
                >
                  <RxCrossCircled
                    className={`text-red-500 hover:bg-red-500 rounded-full hover:text-base-300`}
                  />
                </button>
              )}
            </div>
          ))}
          {isSearchable && (
            <input
              // data-auto={`${dataAuto}-open`}
              autoCapitalize="none"
              autoComplete="off"
              autoCorrect="off"
              spellCheck={true}
              aria-autocomplete="list"
              aria-expanded={false}
              aria-haspopup={true}
              role="combobox"
              aria-activedescendant={options.id}
              id={id}
              name={name}
              type="search"
              value={searchTerm}
              onChange={handleSearchChange}
              placeholder={placeholder || "Select..."}
              onClick={(e) => {
                // e.preventDefault();
                e.stopPropagation();
                if (!disable) {
                  setIsDropdownOpen(!isDropdownOpen);
                }
              }}
              ref={forwardedRef}
              // disabled={(singleSelect && selectedOptions.length > 0) || disable} // Disable input if singleSelect is true and an option is selected or if disable is true
              className={` bg-base-300  h-11 p-1 outline-none  ${
                (singleSelect && selectedOptions.length) || disable
                  ? "hidden"
                  : ""
              }`}
            />
          )}
          {isClearable && selectedOptions.length > 0 && (
            <button
              type="button"
              className="ml-2 rounded bg-gray-200 p-1 hover:bg-gray-300"
              onClick={() => {
                // event.preventDefault();
                handleClearSelection();
              }}
            >
              <svg
                className="h-4 w-4 text-gray-700"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          )}
        </div>
        {isDropdownOpen && !disable && (
          <div
            data-auto={`${dataAuto}-option_container`}
            ref={dropdownRef}
            className={`absolute ${
              top ? "bottom-full -mb-7" : "top-full mt-2"
            } z-30 bg-base-300 duration-200 transition-all overflow-hidden  ${
              isDropdownOpen
                ? "opacity-100 h-auto block"
                : "opacity-0 h-0 hidden"
            }  shadow-lg border-2 border-primary rounded-md w-full left-0`}
          >
            {!singleSelect && isAllSelectable && (
              <label className="flex cursor-pointer items-center space-x-2 p-2 hover:bg-gray-100">
                <input
                  type="checkbox"
                  checked={isAllSelected}
                  onChange={handleSelectAll}
                  className="hidden"
                />
                <span className="flex-grow text-gray-700">Select All</span>
              </label>
            )}
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option) => (
                <label
                  key={option.id}
                  data-auto={`${dataAuto}-${option?.id}`}
                  className={`px-5 py-1   justify-between w-full flex items-center hover:cursor-pointer text-base-content border-b border-solid border-gray-300  ${
                    selectedOptions.some((item) => item.id === option.id)
                      ? "bg-primary text-base-300"
                      : "hover:bg-primary-content"
                  }`}
                >
                  <input
                    id={id + option.id}
                    name={name + option.id}
                    type="checkbox"
                    checked={selectedOptions.some(
                      (item) => item.id === option.id
                    )}
                    onChange={(e) => {
                      e.stopPropagation();
                      handleOptionToggle(option);
                    }}
                    className="hidden" // Hide the checkbox
                  />
                  <span
                    className={`inline-flex gap-2 items-center text-left w-full
                        ${
                          selectedOptions.some((item) => item.id === option.id)
                            ? "text-base-300"
                            : ""
                        }
                        `}
                  >
                    {option.label}
                  </span>
                  {selectedOptions.some((item) => item.id === option.id) && (
                    <svg
                      className={`h-4 w-8 text-white`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      ></path>
                    </svg>
                  )}
                </label>
              ))
            ) : (
              <div className="p-2 text-gray-500">No options found</div>
            )}
            {addNewItem && (
              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  event.preventDefault();
                  handleAddNewItem(event);
                }}
                className={`w-full text-center bg-primary text-base-300 py-2 hover:bg-primary-focus`}
              >
                Add New Option
              </button>
            )}
          </div>
        )}
      </div>
    );
  }
);

MultiSelectV2.displayName = "Select";

MultiSelectV2.propTypes = {
  id: PropTypes.string,
  name: PropTypes.string,
  label: PropTypes.string,
  className: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    })
  ),
  defaultValue: PropTypes.array,
  singleSelect: PropTypes.bool,
  disable: PropTypes.bool,
  addNewItem: PropTypes.bool,
  handleAddNewItem: PropTypes.func,
  hintIcon: PropTypes.element, // Prop type for the hint icon
  onHintIconClick: PropTypes.func, // Callback for hint icon click
  isClearable: PropTypes.bool,
  isSearchable: PropTypes.bool
};

export default MultiSelectV2;
