import { ErrorMessage } from "@hookform/error-message";
import PropTypes from "prop-types";
import { Controller } from "react-hook-form";

export default function NumberFieldWithCurrencyV2({
  control,
  id,
  name,
  label,
  min,
  max,
  maxLength,
  minLength,
  pattern,
  defaultValue, // Ensure a default value is set
  placeholder = "", // Default placeholder
  required = false,
  readOnly = false,
  disabled = false,
  visibleBorder = false,
  minLengthMessage,
  maxLengthMessage,
  patternMessage,
  requiredMessage,
  onChange = (event) => event,
  errors,
  wrapperClassName,
  fieldClassName,
  currency = "£"
}) {
  return (
    <div className={`flex flex-col ${wrapperClassName}`}>
      {/* LABEL */}
      {label && (
        <label
          data-auto={`number-field-with-currency-v2-label-job-board`}
          className="label"
        >
          <span className={`label-text text-md font-bold`}>
            {label}{" "}
            {required && !disabled && (
              <span className="text-error font-bold text-md">*</span>
            )}
          </span>
        </label>
      )}

      {/* INPUT FIELD */}
      <Controller
        data-auto={`number-field-with-currency-v2-controller-job-board`}
        defaultValue={defaultValue}
        disabled={disabled}
        name={name}
        control={control}
        rules={{
          required: {
            value: required,
            message: requiredMessage || "Field is required"
          },
          min: {
            value: min,
            message: "Minimum value not met"
          },
          max: {
            value: max,
            message: "Maximum value exceeded"
          },
          maxLength: {
            value: maxLength,
            message: maxLengthMessage || "Maximum length exceeded"
          },
          minLength: {
            value: minLength,
            message: minLengthMessage || "Minimum length not met"
          },
          pattern: {
            value: pattern,
            message: patternMessage || "Invalid values"
          }
        }}
        render={({ field, fieldState: { invalid, error } }) => (
          <div className="w-full flex justify-center items-center ">
            <span
              className={`flex justify-center items-center h-[50px] w-[50px] ${
                disabled ? "bg-primary" : "bg-primary"
              }  text-base-100 rounded-l-md`}
            >
              {currency}
            </span>
            <input
              data-auto={`number-field-with-currency-v2-render-input-job-board`}
              {...field}
              type="number"
              id={id}
              onChange={(event) => {
                // Call the custom onChange prop
                onChange(event);
                // Call the field's onChange method
                field.onChange(event);
              }}
              value={field.value || ""} // Ensure value is never undefined
              placeholder={placeholder}
              aria-placeholder={placeholder} // Use aria-placeholder for accessibility
              aria-invalid={invalid}
              aria-describedby={error ? `${id}-error` : undefined}
              readOnly={readOnly}
              autoComplete="off" // Disable autocomplete
              spellCheck={false} // Disable spell checking
              autoFocus={false} // Don't auto-focus
              className={`bg-base-300 ${
                disabled &&
                `px-1 py-0 border ${
                  visibleBorder &&
                  "disabled:border-gray-200 border-opacity-10 px-4"
                }`
              } focus:outline-primary input rounded-r-md rounded-l-none focus:outline-none input-bordered ${fieldClassName}
                  ${invalid ? "border-red-500 focus:border-red-500" : ""}
               `}
            />
          </div>
        )}
      />

      {/* Error Message */}
      <ErrorMessage
        errors={errors}
        name={name}
        render={({ message }) => (
          <label className="label h-7">
            <p
              data-auto={`number-field-with-currency-v2-error-message-job-board`}
              id={`${id}-error`} // ID to link with input field's aria-describedby
              role="alert"
              aria-label="error message"
              aria-live="assertive" // Ensures screen readers announce the message immediately
              aria-atomic="true" // Ensures the whole message is read out
              className="label-text-alt text-error"
            >
              {message}
            </p>
          </label>
        )}
      />
    </div>
  );
}

NumberFieldWithCurrencyV2.propTypes = {
  control: PropTypes.object.isRequired,
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  maxLength: PropTypes.number,
  minLength: PropTypes.number,
  pattern: PropTypes.instanceOf(RegExp),
  defaultValue: PropTypes.string,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  readOnly: PropTypes.bool,
  disabled: PropTypes.bool,
  minLengthMessage: PropTypes.string,
  maxLengthMessage: PropTypes.string,
  patternMessage: PropTypes.string,
  onChange: PropTypes.func,
  errors: PropTypes.object
};
