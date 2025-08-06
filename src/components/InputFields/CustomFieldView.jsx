import PropTypes from "prop-types";
export default function CustomFieldView({
  label,
  value,
  wrapperClassName,
  dataAuto
}) {
  return (
    <div className={`w-full ${wrapperClassName}`}>
      <div className={`flex flex-col gap-1`}>
        <span
          data-auto={`${dataAuto}-label`}
          className={`label-text text-md font-bold  text-opacity-60`}
        >
          {label}
        </span>
        <span
          data-auto={dataAuto}
          className={`text-base md:text-lg font-semibold`}
        >
          {value}
        </span>
      </div>
    </div>
  );
}

CustomFieldView.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  wrapperClassName: PropTypes.string,
  dataAuto: PropTypes.string.isRequired
};
