import PropTypes from "prop-types";
import { IoInformationCircleSharp } from "react-icons/io5";

export default function CustomFieldGlass({
  pattern = "",
  id,
  label,
  required = false,
  type,
  name,
  value,
  placeholder,
  onChange,
  error,
  defaultValue,
  disable = false,
  wrapperClassName,
  fieldClassName,
  onBlur = () => {},
  hint = "",
  visibleBorder = false,
  labelClass = "",
  taskField,
  maxLength,
  minLength,
  dataCyInput,
  dataCyLabel,
  dataCyError,
  dataAuto
}) {
  return (
    <div className={`${wrapperClassName}`}>
      {/* LABEL */}
      <div className={`flex items-center gap-2`}>
        {label && (
          <label htmlFor={id} className="label" data-cy={dataCyLabel}>
            <span
              data-auto={`label-${dataAuto}`}
              className={`label-text text-md font-bold ${labelClass}`}
            >
              {label}{" "}
              {label && required && !disable && (
                <span className="text-error font-bold text-md">*</span>
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
        data-cy={dataCyInput}
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
        className={`input placeholder:text-gray-300 bg-transparent border-white text-white
        ${
          disable &&
          `px-1 py-0 border ${
            visibleBorder && "disabled:border-gray-200 border-opacity-10 px-4"
          }`
        }  focus:outline-none rounded-md ${
          taskField ? "focus:input-bordered font-bold" : "input-bordered"
        } ${fieldClassName}`}
      />
      {/* VALIDATION MESSAGE  */}
      {error && (
        <label className="label h-7" data-cy={dataCyError}>
          <span
            data-auto={`error_message-${dataAuto}`}
            className="label-text-alt text-red-300"
          >
            {error}
          </span>
        </label>
      )}
    </div>
  );
}

CustomFieldGlass.propTypes = {
  label: PropTypes.string,
  hint: PropTypes.string,
  dataCyInput: PropTypes.string,
  dataAuto: PropTypes.string,
  maxLength: PropTypes.number,
  minLength: PropTypes.number,
  pattern: PropTypes.string,
  disable: PropTypes.bool,
  id: PropTypes.string,
  onChange: PropTypes.func,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  type: PropTypes.string,
  name: PropTypes.string,
  onBlur: PropTypes.func,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  taskField: PropTypes.bool,
  visibleBorder: PropTypes.bool,
  fieldClassName: PropTypes.string,
  error: PropTypes.string,
  dataCyError: PropTypes.string,
  wrapperClassName: PropTypes.string,
  labelClass: PropTypes.string,
  dataCyLabel: PropTypes.string
};
