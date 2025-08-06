import { generateMongoDBObjectID } from "@/utils/generateMongoDBObjectID.js";
import { InfoIcon } from "lucide-react";
import PropTypes from "prop-types";
import { useState } from "react";
import { BiSolidCheckCircle } from "react-icons/bi";

function CustomRadioButton({
  options = [],
  onChange = (e) => e,
  wrapperClassName = "",
  label = "",
  disabled = false,
  required = false,
  defaultChecked,
  inputFieldStyle,
  inputFieldClassName,
  dataAuto,
  error,
  description = false,
  DescriptionComponent,
  id = generateMongoDBObjectID()
}) {
  const [isDescriptionOpen, setIsDescriptionOpen] = useState(false);
  return (
    <div data-auto={`${dataAuto}-container`} className={`${wrapperClassName}`}>
      <div className={`flex items-center gap-x-2`}>
        <label
          data-auto={`${dataAuto}_label`}
          className="label flex justify-between"
        >
          <span className={`label-text text-md font-bold `}>
            {label}{" "}
            {required && !disabled && (
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
      <div
        data-auto={`${dataAuto}_options`}
        style={inputFieldStyle}
        className={`grid gap-x-2 ${inputFieldClassName}`}
      >
        {options?.map(({ name, title, value, Icon }, index) => (
          <div
            key={index}
            data-auto={`${dataAuto}_container_${value}`}
            className={`w-full `}
          >
            <input
              type="radio"
              name={name}
              onClick={onChange}
              value={value}
              disabled={disabled}
              className={`hidden`}
              id={`${id}${name}${value}`}
              checked={defaultChecked === value}
              data-auto={`${dataAuto}-${value}`}
            />

            <label
              data-auto={`${dataAuto}_${title}`}
              htmlFor={`${id}${name}${value}`}
              className={`${
                defaultChecked === value
                  ? " relative bg-primary-content border-primary font-semibold"
                  : "bg-base-100 opacity-50 border-primary-content"
              } justify-center sm:flex-col lg:flex-row gap-x-1 rounded-lg border-2 px-5 h-11 flex items-center ${disabled ? "cursor-not-allowed" : "cursor-pointer"} checked:text-primary `}
            >
              {defaultChecked === value ? (
                <BiSolidCheckCircle
                  className={`absolute bg-white rounded-full -right-2 -top-2 text-xl text-primary`}
                />
              ) : (
                ""
              )}
              {Icon && <Icon className={`text-md`} />}{" "}
              <span className={`text-xs`}>{title}</span>
            </label>
          </div>
        ))}
      </div>

      {/* ERROR MESSAGE */}
      {error && (
        <label data-auto={`error-${dataAuto}`} className="label ">
          <span className="label-text-alt text-error">{error}</span>
        </label>
      )}
    </div>
  );
}

export default CustomRadioButton;

// PROP TYPES
CustomRadioButton.propTypes = {
  options: PropTypes.array,
  onChange: PropTypes.func,
  wrapperClassName: PropTypes.string,
  label: PropTypes.string.isRequired,
  disabled: PropTypes.bool.isRequired,
  required: PropTypes.bool.isRequired,
  defaultChecked: PropTypes.any,
  inputFieldStyle: PropTypes.object,
  inputFieldClassName: PropTypes.string,
  dataAuto: PropTypes.string.isRequired,
  error: PropTypes.string,
  description: PropTypes.bool,
  DescriptionComponent: PropTypes.any,
  id: PropTypes.string
};
