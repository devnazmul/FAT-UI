import PropTypes from "prop-types";
import { FiSearch } from "react-icons/fi";

export default function SearchField({
  fieldClassName,
  handleChange,
  width = "w-full md:w-[300px]",
  contentWidth = "w-auto",
  dataAuto
}) {
  return (
    <div
      className={`flex  ${contentWidth}`}
      data-auto={`search-field-container-${dataAuto}`}
    >
      <span
        data-auto={`search-field-button-all-page`}
        className="bg-primary rounded-l-xl w-12 text-base-100 flex justify-center items-center"
      >
        <FiSearch className="text-xl" />
      </span>
      <input
        data-auto={`search-field-input-${dataAuto}`}
        onChange={handleChange}
        type={"text"}
        name={"search"}
        autoComplete="off"
        placeholder={`search here`}
        className={`bg-base-100 input rounded-r-xl rounded-l-none outline-none ${width} border-primary focus:outline-none input-bordered ${fieldClassName}`}
      />
    </div>
  );
}

SearchField.propTypes = {
  fieldClassName: PropTypes.string,
  handleChange: PropTypes.func.isRequired,
  width: PropTypes.string,
  contentWidth: PropTypes.string,
  dataAuto: PropTypes.string.isRequired
};
