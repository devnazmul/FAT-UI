import PropTypes from "prop-types";
import { IoInformationCircleSharp } from "react-icons/io5";

export default function CustomField({
  pattern = "",
  id = "",
  label = "",
  required = false,
  type = "text",
  name = "",
  value = "",
  placeholder,
  onChange = (e) => e,
  error = "",
  show = true,
  defaultValue,
  disable = false,
  wrapperClassName = "",
  fieldClassName = "",
  onBlur = (e) => e,
  hint = "",
  visibleBorder = false,
  labelClass = "",
  taskField = false,
  maxLength,
  minLength,
  dataAuto = "",
  extraNote = "",
  extraNoteClassName = ""
}) {
  return (
    <div
      data-auto={`container-${dataAuto}`}
      className={`${wrapperClassName} ${show ? "" : "hidden"}`}
    >
      {/* LABEL */}
      <div className={`flex items-center gap-2`}>
        {label && (
          <label htmlFor={id} className="label" data-auto={`label-${dataAuto}`}>
            <span className={`label-text text-md font-bold ${labelClass}`}>
              {label}{" "}
              {label && required && !disable && (
                <span className="text-error font-bold text-md">*</span>
              )}
              {/* EXTRA NOTE */}{" "}
              {extraNote && (
                <span className={`${extraNoteClassName}`}>{extraNote}</span>
              )}
            </span>
          </label>
        )}
        {hint && (
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-circle btn-ghost btn-xs"
            >
              <IoInformationCircleSharp className={`text-primary`} />
            </div>
            <div
              tabIndex={0}
              className="card compact dropdown-content z-[1] shadow-lg border border-primary-content shadow-primary-content bg-base-300 rounded-xl w-64"
            >
              <div tabIndex={0} className="card-body">
                <h2 className="card-title text-primary">{label}</h2>
                <p> {hint}</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* FIELD  */}
      <input
        data-auto={dataAuto}
        onInvalidCapture={() => {}}
        maxLength={maxLength}
        minLength={minLength}
        pattern={pattern}
        disabled={disable}
        id={id}
        onChange={onChange}
        value={value || defaultValue}
        type={type}
        name={name}
        onBlur={onBlur}
        // defaultValue={defaultValue}
        placeholder={`${placeholder}${required ? (taskField ? "" : "*") : ""}`}
        className={`input bg-base-300
        ${
          disable &&
          ` py-0 border disabled:text-black ${
            visibleBorder
              ? "disabled:border-gray-200 border-opacity-10 px-4"
              : "px-1"
          }`
        }  focus:outline-primary rounded-md ${
          taskField ? "focus:input-bordered font-bold" : "input-bordered"
        } ${fieldClassName}`}
      />
      {/* VALIDATION MESSAGE  */}
      {error && (
        <label data-auto={`error-${dataAuto}`} className="label h-7">
          <span className="label-text-alt text-error">{error}</span>
        </label>
      )}
    </div>
  );
}

CustomField.propTypes = {
  pattern: PropTypes.string,
  id: PropTypes.string,
  label: PropTypes.string,
  required: PropTypes.bool,
  type: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  placeholder: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  error: PropTypes.string,
  defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  disable: PropTypes.bool,
  wrapperClassName: PropTypes.string,
  fieldClassName: PropTypes.string,
  onBlur: PropTypes.func,
  hint: PropTypes.string,
  visibleBorder: PropTypes.bool,
  labelClass: PropTypes.string,
  taskField: PropTypes.bool,
  maxLength: PropTypes.number,
  minLength: PropTypes.number,
  dataAuto: PropTypes.string,
  extraNote: PropTypes.string,
  extraNoteClassName: PropTypes.string,
  show: PropTypes.bool
};
