import { ErrorMessage } from "@hookform/error-message";
import PropTypes from "prop-types";
import { Controller } from "react-hook-form";
import { IoInformationCircleSharp } from "react-icons/io5";

export default function TextFieldV2({
  control,
  type,
  id,
  name,
  label,
  maxLength,
  minLength,
  pattern,
  defaultValue, // Ensure a default value is set
  placeholder = "", // Default placeholder
  required = false,
  readOnly = false,
  disabled = false,
  minLengthMessage,
  maxLengthMessage,
  patternMessage,
  requiredMessage,
  onChange = (event) => event,
  hint = "",
  visibleBorder = false,
  errors,
  wrapperClassName,
  fieldClassName
}) {
  return (
    <div
      data-auto={`view-employee-container-text-field-v2`}
      className={`flex flex-col ${wrapperClassName}`}
    >
      {/* LABEL */}
      <div className={`flex items-center gap-2`}>
        {label && (
          <label htmlFor={id} className="label">
            <span className={`label-text text-md font-bold`}>
              {label}{" "}
              {label && required && !disabled && (
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

      {/* INPUT FIELD */}
      <Controller
        defaultValue={defaultValue}
        name={name}
        control={control}
        rules={{
          required: {
            value: required,
            message: requiredMessage || "Field is required"
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
          <input
            {...field}
            type={type}
            id={id}
            onChange={(event) => {
              // Call the custom onChange prop
              onChange(event);
              // Call the field's onChange method
              field.onChange(event);
            }}
            value={field.value} // Ensure value is controlled by React Hook Form
            maxLength={maxLength}
            placeholder={placeholder}
            aria-placeholder={placeholder} // Use aria-placeholder for accessibility
            aria-invalid={invalid}
            aria-describedby={error ? `${id}-error` : undefined}
            readOnly={readOnly}
            autoComplete="off" // Disable autocomplete
            spellCheck={false} // Disable spell checking
            autoFocus={false} // Don't auto-focus
            className={`input bg-base-300 focus:outline-primary rounded-md input-bordered
              ${fieldClassName}
              ${
                disabled &&
                `px-1 py-0 border
              ${
                visibleBorder &&
                "disabled:border-gray-200 border-opacity-10 px-4"
              }`
              }
                ${
                  invalid
                    ? "border-red-500 focus:border-red-500"
                    : "input-bordered"
                }
                `}
          />
        )}
      />

      {/* Error Message */}
      <ErrorMessage
        errors={errors}
        name={name}
        render={({ message }) => (
          <label
            data-auto={`view-employee-error-message-text-field-v2`}
            className="label h-7"
          >
            <p
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

TextFieldV2.propTypes = {
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
