import { InfoIcon } from "lucide-react";
import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";

export default function CustomNumberFieldWithCurrency({
  id = "",
  label = "",
  show = true,
  required = false,
  name = "",
  type = "number",
  value = "",
  defaultValue,
  placeholder = "",
  onChange = (e) => e,
  error = "",
  min = 0,
  minMsg = "Value is too low",
  max,
  maxLength,
  maxMsg = "Value exceeds",
  minLength,
  wrapperClassName = "",
  fieldClassName = "",
  currency = "£",
  disable = false,
  visibleBorder = false,
  symbolInBeginning = true,
  description = false,
  DescriptionComponent,
  dataAuto
}) {
  const inputRef = useRef();
  const [validationError, setValidationError] = useState(error);

  // Input value change validation field
  const onInputChange = () => {
    const inputValue = inputRef.current.value;
    const min = Number(inputRef.current.min);
    const max = Number(inputRef.current.max);
    const maxLength =
      inputRef.current.maxLength !== -1 ? inputRef.current.maxLength : Infinity;

    if (inputValue === "") {
      setValidationError(error || "");
      return;
    }

    // Handle maxLength validation
    if (!!maxLength && inputValue.length > maxLength) {
      inputRef.current.value = inputValue.slice(0, maxLength);
    }

    // Handle number validations
    const numericValue = Number(inputRef.current.value);

    if (numericValue < 0) {
      setValidationError("Value cannot be negative");
    } else if (min && numericValue < min) {
      setValidationError(minMsg || "Value is too low");
    } else if (max && numericValue > max) {
      setValidationError(maxMsg || `Value exceeds ${max}`);
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

  const [isDescriptionOpen, setIsDescriptionOpen] = useState(false);

  return (
    <div className={`${wrapperClassName} ${show ? "" : "hidden"}`}>
      {/* LABEL */}
      <div className={`flex items-center gap-x-2`}>
        <label
          data-auto={`custom-number-field-with-currency-label-all-page`}
          htmlFor={id}
          className="label"
        >
          <span className="label-text text-md font-bold">
            {label}{" "}
            {required && !disable && (
              <span className="text-error font-bold text-md">*</span>
            )}
          </span>
        </label>

        {description && (
          <InfoIcon
            onClick={() => setIsDescriptionOpen(!isDescriptionOpen)}
            size={20}
            className={`text-primary cursor-pointer`}
          />
        )}
      </div>

      {isDescriptionOpen && (
        <div
          className={`bg-primary-content/50 border-primary/50 border-2 rounded-lg p-5 mb-2 ${
            isDescriptionOpen && "block"
          }`}
        >
          {DescriptionComponent}
        </div>
      )}

      {/* FIELD  */}
      <div className="w-full flex justify-center items-center ">
        {!!symbolInBeginning && (
          <span
            data-auto={`custom-number-field-with-currency-currency-all-page`}
            className={`flex justify-center items-center h-[50px] w-[50px] ${
              disable ? "bg-primary" : "bg-primary"
            }  text-base-100 rounded-l-md`}
          >
            {currency}
          </span>
        )}
        <input
          data-auto={dataAuto}
          ref={inputRef}
          onInput={onInputChange}
          disabled={disable}
          id={id}
          onChange={onChange}
          value={value || defaultValue}
          // defaultValue={defaultValue}
          type={type}
          name={name}
          min={min}
          max={max}
          maxLength={maxLength}
          minLength={minLength}
          placeholder={`${placeholder}${required ? "*" : ""}`}
          className={`bg-base-300 ${
            disable &&
            `px-1 py-0 border ${
              visibleBorder && "disabled:border-gray-200 border-opacity-10 px-4"
            }`
          } focus:outline-primary input ${
            symbolInBeginning
              ? "rounded-r-md rounded-l-none"
              : "rounded-l-md rounded-r-none"
          }  focus:outline-none input-bordered ${fieldClassName}`}
        />
        {!symbolInBeginning && (
          <span
            data-auto={`custom-number-field-with-currency-currency-all-page`}
            className={`flex justify-center items-center h-[50px] w-[50px] ${
              disable ? "bg-primary" : "bg-primary"
            }  text-base-100 rounded-r-md`}
          >
            {currency}
          </span>
        )}
      </div>
      {/* VALIDATION MESSAGE  */}
      {(error || validationError) && (
        <label
          data-auto={`custom-number-field-with-currency-error-message-all-page`}
          className="label h-7"
        >
          <span className="label-text-alt text-error">
            {error || validationError}
          </span>
        </label>
      )}
    </div>
  );
}

CustomNumberFieldWithCurrency.propTypes = {
  id: PropTypes.string,
  label: PropTypes.string,
  show: PropTypes.bool,
  required: PropTypes.bool,
  name: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  error: PropTypes.string,
  min: PropTypes.number,
  minMsg: PropTypes.string,
  max: PropTypes.number,
  maxLength: PropTypes.number,
  maxMsg: PropTypes.string,
  minLength: PropTypes.number,
  wrapperClassName: PropTypes.string,
  fieldClassName: PropTypes.string,
  currency: PropTypes.string,
  disable: PropTypes.bool,
  visibleBorder: PropTypes.bool,
  symbolInBeginning: PropTypes.bool,
  description: PropTypes.bool,
  DescriptionComponent: PropTypes.elementType,
  dataAuto: PropTypes.string.isRequired
};
