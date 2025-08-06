import PropTypes from "prop-types";
import { Fragment, useEffect, useRef, useState } from "react";
import { FiMoreVertical } from "react-icons/fi";
import { RxCross2 } from "react-icons/rx";
import { checkPermissions } from "../utils/checkPermissions";
import { formatText } from "../utils/formatText";
const CustomDropDownForTableV2 = ({
  index,
  data,
  actions,
  disabled,
  isDeleteDisabled = false,
}) => {
  const permissions = localStorage.getItem("permissions");
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <span className={`relative inline-block text-left mt-2`} ref={dropdownRef}>
      <button
        data-auto={`custom_dropdown_for_tableV2_toggle-${data.id}`}
        disabled={disabled}
        onClick={toggleDropdown}
        className="text-primary"
      >
        {isOpen ? (
          <RxCross2 className="text-xl text-red-500" />
        ) : (
          <FiMoreVertical className="text-xl" />
        )}
      </button>

      {isOpen && (
        <div
          className={` z-20 ${
            index >= 2 ? "bottom-[150%]" : "top-full"
          } absolute right-0 mt-2 w-48 rounded-md shadow-lg shadow-primary-content border border-primary text-primary bg-base-300 ring-opacity-5 focus:outline-none`}
        >
          {/* Dropdown content goes here */}
          <ul className="overflow-hidden">
            {actions.map((action, i) => (
              <Fragment key={i}>
                {checkPermissions(action?.permissions, permissions) &&
                  !(action.name === "delete" && isDeleteDisabled) && (
                    <li
                      data-auto={action?.dataAuto}
                      onClick={() => {
                        action.handler(data);
                      }}
                      className={`hover:bg-primary hover:text-base-300 rounded-sm cursor-pointer opacity-100 h-5 px-2 py-4 flex items-center`}
                    >
                      <button
                        disabled={isDeleteDisabled && action.name === "delete"}
                        className={`w-full h-full flex gap-3 items-center `}
                      >
                        <action.Icon className={`text-lg`} />
                        {formatText(action.name)}
                      </button>
                    </li>
                  )}
              </Fragment>
            ))}
          </ul>
        </div>
      )}
    </span>
  );
};

CustomDropDownForTableV2.propTypes = {
  index: PropTypes.number.isRequired,
  data: PropTypes.object.isRequired,
  actions: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      handler: PropTypes.func.isRequired,
      Icon: PropTypes.elementType.isRequired,
      permissions: PropTypes.arrayOf(PropTypes.string),
      dataAuto: PropTypes.string,
    })
  ).isRequired,
  disabled: PropTypes.bool,
  isDeleteDisabled: PropTypes.bool,
  dataAuto: PropTypes.string,
};

export default CustomDropDownForTableV2;
