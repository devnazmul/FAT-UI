import PropTypes from "prop-types";
import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

export default function CustomPasswordField({
  id,
  label,
  required = false,
  name,
  value,
  placeholder,
  onChange,
  error,
  defaultValue,
  wrapperClassName,
  fieldClassName,
  disabled,
  visibleBorder = false,
  labelClass = "",
  eyeToggleClass = "",
  dataCyLabel,
  dataCyError,
  dataAuto
}) {
  const [isVisible, setIsVisible] = useState(false);
  return (
    <div className={`${wrapperClassName}`}>
      {/* LABEL */}
      <label data-cy={dataCyLabel} htmlFor={id} className="label">
        <span
          data-auto={`custom-password-field-label-all-page`}
          className={`label-text text-md font-bold ${labelClass}`}
        >
          {label}{" "}
          {required && <span className="text-error font-bold text-md">*</span>}
        </span>
      </label>
      <div className={`w-full relative ${eyeToggleClass}`}>
        {isVisible ? (
          <AiOutlineEyeInvisible
            onClick={() => {
              setIsVisible(!isVisible);
            }}
            className="absolute right-3 text-xl top-1/2 -translate-y-1/2"
          />
        ) : (
          <AiOutlineEye
            onClick={() => {
              setIsVisible(!isVisible);
            }}
            className="absolute right-3 text-xl top-1/2 -translate-y-1/2"
          />
        )}
        <input
          data-auto={dataAuto}
          id={id}
          // required
          disabled={disabled}
          onChange={onChange}
          type={isVisible ? "text" : "password"}
          // defaultValue={defaultValue}
          value={value || defaultValue}
          name={name}
          placeholder={`${placeholder}${required && "*"}`}
          className={`bg-base-300 pr-9 focus:outline-primary input rounded-md input-bordered  ${
            disabled &&
            `px-1 py-0 border ${
              visibleBorder && "disabled:border-gray-200 border-opacity-10 px-4"
            }`
          } ${fieldClassName}`}
        />
      </div>
      {/* VALIDATION MESSAGE  */}
      {error && (
        <label
          data-auto={`custom-password-field-error-all-page`}
          data-cy={dataCyError}
          className="label h-7"
        >
          <span className="label-text-alt text-error">{error}</span>
        </label>
      )}
    </div>
  );
}

CustomPasswordField.propTypes = {
  id: PropTypes.string,
  label: PropTypes.string,
  required: PropTypes.bool,
  name: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  placeholder: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.string,
  defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  wrapperClassName: PropTypes.string,
  fieldClassName: PropTypes.string,
  disabled: PropTypes.bool,
  visibleBorder: PropTypes.bool,
  labelClass: PropTypes.string,
  eyeToggleClass: PropTypes.string,
  dataCyLabel: PropTypes.string,
  dataCyError: PropTypes.string,
  dataAuto: PropTypes.string.isRequired
};
