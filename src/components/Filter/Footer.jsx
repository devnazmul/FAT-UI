import PropTypes from "prop-types";
export default function Footer({ handleClear, handleApplyAllFilters }) {
  return (
    <div
      style={{
        boxShadow: "0px -2px 10px #eee"
      }}
      className={`py-2 px-2 flex justify-between items-center z-20`}
    >
      <button
        data-auto={`footer-clear-all-button-all-page`}
        onClick={handleClear}
        className={`btn btn-sm md:btn-md btn-error`}
      >
        Clear All
      </button>
      <button
        data-auto={`footer-apply-all-button-all-page`}
        onClick={handleApplyAllFilters}
        className={`btn btn-sm md:btn-md btn-primary`}
      >
        Apply Filters
      </button>
    </div>
  );
}

Footer.propTypes = {
  handleClear: PropTypes.func.isRequired,
  handleApplyAllFilters: PropTypes.func.isRequired,
  totalResult: PropTypes.number
};
