import PropTypes from "prop-types";
export default function CustomTextareaField({
  id,
  label,
  required = false,
  type,
  name,
  value,
  placeholder,
  onChange,
  error,
  show = true,
  defaultValue,
  rows = 7,
  height = "h-52",
  wrapperClassName,
  fieldClassName,
  disable,
  visibleBorder = false,
  maxLength,
  resize = "both",
  minLength,
  dataAuto,
  style,
  ref
}) {
  return (
    <div className={`${wrapperClassName} ${show ? "" : "hidden"}`}>
      {/* LABEL */}
      {label ? (
        <label data-auto={`label-${dataAuto}`} htmlFor={id} className="label">
          <span className={`label-text text-md font-bold`}>
            {label}{" "}
            {required && <span className="text-error font-bold">*</span>}
          </span>
        </label>
      ) : (
        ""
      )}
      {/* FIELD  */}
      <textarea
        ref={ref}
        data-auto={dataAuto}
        style={{
          resize: resize,
          ...style
        }}
        maxLength={maxLength}
        minLength={minLength}
        disabled={disable}
        rows={rows}
        id={id}
        onChange={onChange}
        value={value || defaultValue}
        type={type}
        name={name}
        // defaultValue={defaultValue}
        placeholder={`${placeholder}${required ? "*" : ""}`}
        className={`bg-base-300 ${error && "border-error"} ${
          disable &&
          `${
            visibleBorder && "disabled:border-gray-200 border-opacity-10"
          } disabled:text-black`
        } focus:outline-primary scrollbar input input-bordered ${height} pt-3 ${fieldClassName}`}
      />
      {/* VALIDATION MESSAGE  */}
      {error && (
        <label
          data-auto={`custom-textarea-field-error-message-all-page`}
          className="label h-7"
        >
          <span className="label-text-alt text-error">{error}</span>
        </label>
      )}
    </div>
  );
}

CustomTextareaField.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string,
  required: PropTypes.bool,
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  placeholder: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.string,
  defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  rows: PropTypes.number,
  height: PropTypes.string,
  wrapperClassName: PropTypes.string,
  fieldClassName: PropTypes.string,
  disable: PropTypes.bool,
  visibleBorder: PropTypes.bool,
  maxLength: PropTypes.number,
  resize: PropTypes.string,
  minLength: PropTypes.number,
  dataAuto: PropTypes.string.isRequired,
  style: PropTypes.object,
  show: PropTypes.bool,
  ref: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) })
  ])
};
