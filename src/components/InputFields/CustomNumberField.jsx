import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";
import { IoInformationCircleSharp } from "react-icons/io5";

export default function CustomNumberField({
  id,
  label,
  show = true,
  required,
  name,
  type = "number",
  value,
  defaultValue,
  placeholder,
  onChange,
  error = "",
  hint = "",
  hintLeft = "-left-16",
  min,
  minMsg,
  max,
  maxMsg,
  minLength,
  maxLength,
  size,
  wrapperClassName,
  fieldClassName,
  disable = false,
  visibleBorder = false,
  onBlur = () => {},
  dataAuto,
  extraNoteWithLabel = ""
}) {
  const inputRef = useRef();
  const [validationError, setValidationError] = useState(error);

  // Input value change validation field
  const onInputChange = () => {
    let inputValue = inputRef.current.value;

    // Instantly remove the negative sign if typed
    if (inputValue.includes("-")) {
      inputValue = inputValue.slice(1); // Remove the first character if it's a negative sign
      inputRef.current.value = inputValue;
    }

    const min = Number(inputRef.current.min);
    const max = Number(inputRef.current.max);
    const maxLength =
      inputRef.current.maxLength !== -1 ? inputRef.current.maxLength : Infinity;

    // Handle maxLength validation
    if (maxLength && inputValue.length > maxLength) {
      inputRef.current.value = inputValue.slice(0, maxLength);
    }

    // Handle number validations
    const numericValue = Number(inputValue);

    if (numericValue < 0) {
      setValidationError("Value cannot be negative");
    } else if (min && numericValue < min) {
      setValidationError(minMsg || `Value should be at least ${min}`);
    } else if (max && numericValue > max) {
      setValidationError(maxMsg || `Value should not exceed ${max}`);
    } else {
      setValidationError("");
    }
  };

  useEffect(() => {
    const handleWheel = (e) => {
      e.preventDefault();
    };

    const handleKeyDown = (e) => {
      if (e.key === "ArrowUp" || e.key === "ArrowDown") {
        e.preventDefault();
      }
    };

    const inputElement = inputRef.current;

    if (inputElement) {
      inputElement.addEventListener("wheel", handleWheel, { passive: false });
      inputElement.addEventListener("keydown", handleKeyDown, {
        passive: false
      });

      return () => {
        inputElement.removeEventListener("wheel", handleWheel);
        inputElement.removeEventListener("keydown", handleKeyDown);
      };
    }
  }, []);

  return (
    <div
      data-auto={`container-${dataAuto}`}
      className={`${wrapperClassName} ${show ? "" : "hidden"}`}
    >
      <div className={`flex items-center gap-2`}>
        {/* LABEL */}
        {label && (
          <label data-auto={`label-${dataAuto}`} htmlFor={id} className="label">
            <span className={`label-text text-md font-bold`}>
              {label}{" "}
              {required && !disable && (
                <span className="text-error font-bold text-md">*</span>
              )}{" "}
              {extraNoteWithLabel ? (
                <span className={`text-xs`}>({extraNoteWithLabel})</span>
              ) : (
                ""
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
        onBlur={onBlur}
        disabled={disable}
        id={id}
        value={value || defaultValue}
        // defaultValue={defaultValue}
        type={type}
        name={name}
        min={min}
        max={max}
        minLength={minLength}
        maxLength={maxLength}
        size={size}
        placeholder={`${placeholder}${required ? "*" : ""}`}
        className={`bg-base-300 ${
          disable &&
          `px-1 disabled:text-gray-700 ${
            visibleBorder && "disabled:border-gray-200  border-opacity-10 px-4"
          }`
        } input focus:outline-primary input-bordered ${fieldClassName}`}
        onChange={onChange}
        ref={inputRef}
        onInput={onInputChange}
      />
      {/* VALIDATION MESSAGE  */}
      {(error || validationError) && (
        <label data-auto={`error-${dataAuto}`} className="label ">
          <span className="label-text-alt text-error">
            {error || validationError}
          </span>
        </label>
      )}
    </div>
  );
}

CustomNumberField.propTypes = {
  label: PropTypes.string,
  show: PropTypes.bool,
  required: PropTypes.bool,
  disable: PropTypes.bool,
  extraNoteWithLabel: PropTypes.string,
  dataAuto: PropTypes.string.isRequired,
  onBlur: PropTypes.func,
  id: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  type: PropTypes.string,
  name: PropTypes.string,
  min: PropTypes.number,
  max: PropTypes.number,
  minLength: PropTypes.number,
  maxLength: PropTypes.number,
  size: PropTypes.number,
  placeholder: PropTypes.string,
  fieldClassName: PropTypes.string,
  onChange: PropTypes.func,
  error: PropTypes.string,
  visibleBorder: PropTypes.bool,
  minMsg: PropTypes.string,
  maxMsg: PropTypes.string,
  wrapperClassName: PropTypes.string,
  hint: PropTypes.string,
  hintLeft: PropTypes.string
};
