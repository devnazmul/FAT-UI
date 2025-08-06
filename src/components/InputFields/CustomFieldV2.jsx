import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";
import { IoInformationCircleSharp } from "react-icons/io5";

export default function CustomFieldV2({
  patternErrorMsg = "",
  pattern = "",
  id,
  label,
  show = true,
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
  hintLeft = "-left-16",
  visibleBorder = false,
  labelClass = "",
  taskField,
  maxLength,
  minLength,
  dataAuto
}) {
  const inputRef = useRef();

  const [regexError, setRegexError] = useState("");

  const handleOnInput = () => {
    const regex = new RegExp(pattern);
    if (inputRef.current.value !== "") {
      if (!regex.test(inputRef.current.value)) {
        setRegexError(patternErrorMsg || "Pattern not matched");
      } else {
        setRegexError("");
      }
    }
  };

  useEffect(() => {
    setRegexError(error);
  }, [error]);
  return (
    <div
      data-auto={`container-${dataAuto}`}
      className={`${wrapperClassName} ${show ? "" : "hidden"}`}
    >
      {/* LABEL */}
      <div
        className={`flex items-center gap-2`}
        data-auto={`label-container-${dataAuto}`}
      >
        {label && (
          <label data-auto={`label-${dataAuto}`} htmlFor={id} className="label">
            <span className={`label-text text-md font-bold ${labelClass}`}>
              {label}{" "}
              {label && required && !disable && (
                <span className="text-error font-bold text-md">*</span>
              )}
            </span>
          </label>
        )}
        {hint && (
          <div className="dropdown">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-circle btn-ghost btn-xs"
            >
              <IoInformationCircleSharp className={`text-primary text-xl`} />
            </div>
            <div
              tabIndex={0}
              className={`card compact dropdown-content z-[100] shadow-lg border border-primary-content shadow-primary-content bg-base-300 rounded-xl w-64 absolute ${hintLeft}`}
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
        onInput={handleOnInput}
        ref={inputRef}
        maxLength={maxLength}
        minLength={minLength}
        pattern={pattern instanceof RegExp ? pattern.source : undefined}
        disabled={disable}
        id={id}
        onChange={onChange}
        value={value || defaultValue}
        type={type}
        name={name}
        onBlur={onBlur}
        // defaultValue={defaultValue}
        placeholder={`${placeholder}${required ? (taskField ? "" : "*") : ""}`}
        className={`input bg-base-300 ${
          disable &&
          `px-1 py-0 border disabled:text-gray-700 ${
            visibleBorder && "disabled:border-gray-200 border-opacity-10 px-4"
          }`
        }  focus:outline-primary rounded-md ${
          taskField ? "focus:input-bordered font-bold" : "input-bordered"
        } ${fieldClassName}`}
      />
      {/* VALIDATION MESSAGE  */}
      {(regexError || error) && (
        <label data-auto={`error-${dataAuto}`} className="label h-7">
          <span className="label-text-alt text-error">
            {regexError || error}
          </span>
        </label>
      )}
    </div>
  );
}

CustomFieldV2.propTypes = {
  patternErrorMsg: PropTypes.string,
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
  hintLeft: PropTypes.string,
  show: PropTypes.bool
};
