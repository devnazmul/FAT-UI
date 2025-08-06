import PropTypes from "prop-types";
import { createContext, useContext } from "react";
import { BiSolidCheckCircle } from "react-icons/bi";

// Context for the radio group
const RadioContext = createContext();

export function RadioGroup({ value, onChange, children }) {
  return (
    <RadioContext.Provider value={{ value, onChange }}>
      {children}
    </RadioContext.Provider>
  );
}

RadioGroup.propTypes = {
  value: PropTypes.any.isRequired,
  onChange: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired
};

export function RadioButton({
  options = [],
  wrapperClassName = "",
  label = "",
  disabled = false,
  required = false,
  inputFieldClassName
}) {
  const { value, onChange } = useContext(RadioContext);

  return (
    <div className={wrapperClassName}>
      <label className="label flex justify-between">
        <span
          className={`label-text text-md font-bold ${
            disabled && "text-gray-500"
          }`}
        >
          {label}{" "}
          {required && <span className="text-error font-bold text-md">*</span>}
        </span>
      </label>
      <div className={`grid gap-x-2 ${inputFieldClassName}`}>
        {options?.map(({ name, title, value: optionValue, Icon }, index) => (
          <label
            key={index}
            className={`${
              value === optionValue
                ? "relative bg-primary-content border-primary font-semibold"
                : "bg-base-100 opacity-50 border-primary-content"
            } justify-center sm:flex-col lg:flex-row gap-x-1 rounded-lg border-2 px-5 h-11 flex items-center cursor-pointer`}
          >
            <input
              type="radio"
              name={name}
              className="hidden"
              value={optionValue}
              checked={value === optionValue}
              onChange={onChange}
              disabled={disabled}
            />
            {value === optionValue && (
              <BiSolidCheckCircle className="absolute bg-white rounded-full -right-2 -top-2 text-xl text-primary" />
            )}
            {Icon && <Icon className="text-md" />}{" "}
            <span className="text-xs">{title}</span>
          </label>
        ))}
      </div>
    </div>
  );
}

RadioButton.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      value: PropTypes.any.isRequired,
      Icon: PropTypes.element
    })
  ),
  wrapperClassName: PropTypes.string,
  label: PropTypes.string,
  disabled: PropTypes.bool,
  required: PropTypes.bool,
  inputFieldClassName: PropTypes.string
};
