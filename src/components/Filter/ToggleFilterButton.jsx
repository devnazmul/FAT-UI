import { FilterIcon } from "lucide-react";
import PropTypes from "prop-types";
import { MdCancel } from "react-icons/md";

const ToggleFilterButton = ({
  isFilterOpen,
  buttonRef,
  handleButtonClick,
  options
}) => {
  return (
    <button
      data-auto={`toggle-filter-button-toggle-all-page`}
      ref={buttonRef}
      onClick={handleButtonClick}
      className={`relative flex justify-center items-center gap-1 py-2 rounded-lg w-28 transition-transform active:scale-90 text-base-300 ${
        isFilterOpen ? "bg-error" : "bg-primary"
      }`}
    >
      {options.filter((value) =>
        value?.type === "single-select" ||
        value?.type === "multi-select" ||
        value?.type === "range" ||
        value?.type === "date-range"
          ? value?.defaultSelectedValues?.length !== 0
          : value?.defaultValue !== ""
      )?.length > 0 ? (
        <span
          className={`absolute w-3 h-3 rounded-full inline-block -top-1 -left-1 bg-green-500`}
        >
          <span className="w-3 h-3 animate-ping  inline-flex left-1/2 top-1/2 rounded-full bg-green-500 bg-opacity-80 opacity-75"></span>
        </span>
      ) : (
        ""
      )}
      {isFilterOpen ? (
        <>
          <MdCancel size={20} /> Close
        </>
      ) : (
        <>
          <FilterIcon size={15} /> Filter
        </>
      )}
    </button>
  );
};

export default ToggleFilterButton;

ToggleFilterButton.propTypes = {
  isFilterOpen: PropTypes.bool,
  buttonRef: PropTypes.object,
  handleButtonClick: PropTypes.func,
  options: PropTypes.array
};
