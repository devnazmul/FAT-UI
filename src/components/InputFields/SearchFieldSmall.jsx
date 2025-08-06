import PropTypes from "prop-types";

export default function SearchFieldSmall({
  fieldClassName,
  handleChange,
  wrapperClass,
  dataAuto
}) {
  return (
    <div className={`flex w-auto ${wrapperClass}`}>
      <input
        data-auto={`search-field-small-input-${dataAuto}`}
        onChange={handleChange}
        type={"type"}
        name={"search"}
        placeholder={`search here`}
        className={`bg-base-300 input h-10 border border-primary rounded-lg outline-none w-full md:w-[350px]  focus:outline-none input-bordered ${fieldClassName}`}
      />
    </div>
  );
}

SearchFieldSmall.propTypes = {
  fieldClassName: PropTypes.string,
  handleChange: PropTypes.func.isRequired,
  wrapperClass: PropTypes.string,
  dataAuto: PropTypes.string.isRequired
};
