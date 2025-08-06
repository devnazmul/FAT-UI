import PropTypes from "prop-types";
import { useState } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { OutsideClickHandler } from "../OutsideClickHandler";

export default function ActinDropdownButton({
  options,
  buttonText = "Actions",
  buttonColorClass = `bg-primary`,
  buttonClass = `px-5 py-2`,
  dataAuto
}) {
  const [open, setOpen] = useState(false);

  return (
    <OutsideClickHandler
      onOutsideClick={() => {
        setOpen(false);
      }}
      className="relative "
    >
      <button
        data-auto={`actin-dropdown-button-open-toggle-${dataAuto}`}
        className={`tooltip tooltip-left tooltip-primary rounded-md text-base-300 flex items-center gap-2 justify-between ${buttonClass} ${buttonColorClass}`}
        onClick={() => setOpen(!open)}
      >
        {buttonText}{" "}
        {open ? (
          <IoIosArrowUp className="text-lg" />
        ) : (
          <IoIosArrowDown className="text-lg" />
        )}
      </button>
      {open && (
        <div
          style={{
            zIndex: 999
          }}
          className="absolute top-full right-0 mt-1 w-[200px]  bg-base-300 flex flex-col  shadow-md rounded-xl max-h-[200px] scrollbar overflow-auto"
        >
          {options
            ?.filter((opt) => opt?.show)
            .map((opt, index) => (
              <button
                data-auto={`actin-dropdown-button-option-button${opt?.title}-${dataAuto}`}
                key={index}
                data-tip={opt?.title}
                className="tooltip tooltip-left tooltip-primary inline-block hover:bg-primary-content px-5 py-2 w-full text-left"
                onClick={() => {
                  opt?.handler();
                  setOpen(false);
                }}
              >
                {opt?.title}
              </button>
            ))}
        </div>
      )}
    </OutsideClickHandler>
  );
}

ActinDropdownButton.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      handler: PropTypes.func
    })
  ).isRequired,
  buttonText: PropTypes.string,
  buttonColorClass: PropTypes.string,
  buttonClass: PropTypes.string,
  dataAuto: PropTypes.string.isRequired
};
