import { ChevronDown } from "lucide-react";
import PropTypes from "prop-types";
import { createContext, useContext, useEffect, useRef, useState } from "react";

const AccordionContext = createContext();

export default function Accordion({
  children,
  value,
  defaultValue,
  onChange,
  wrapperClassName
}) {
  const [selected, setSelected] = useState(defaultValue || null);
  const [previousSelected, setPreviousSelected] = useState(null);
  // Handle changes to default value
  useEffect(() => {
    if (defaultValue !== undefined && defaultValue !== null) {
      setSelected(defaultValue);
    }
  }, [defaultValue]);

  // Handle changes to controlled value
  useEffect(() => {
    if (value !== undefined && value !== null) {
      setSelected(value);
    }
  }, [value]);

  // Handle selected value changes
  useEffect(() => {
    if (previousSelected !== null && previousSelected !== selected) {
      onChange?.(previousSelected, "clear");
    }
    // if (selected !== null) {
    //     onChange?.(selected);
    // }
    setPreviousSelected(selected);
  }, [selected, previousSelected, onChange]);

  return (
    <ul className={`${wrapperClassName} flex flex-col gap-2`}>
      <AccordionContext.Provider value={{ selected, setSelected, onChange }}>
        {children}
      </AccordionContext.Provider>
    </ul>
  );
}

export function AccordionItem({ children, value, trigger, isSuccess = false }) {
  const { selected, setSelected, onChange } = useContext(AccordionContext);
  const open = selected === value;

  const ref = useRef(null);

  return (
    <li
      className={`bg-white border border-solid border-primary-focus text-primary-focus rounded-md`}
    >
      <header
        data-auto={`accordion-header-job-board`}
        role="button"
        onClick={() => {
          if (!open) {
            onChange(value);
          }
          setSelected(open ? null : value);
        }}
        className={`flex justify-between items-center p-4 font-medium ${
          isSuccess ? "bg-primary" : "bg-white"
        } rounded-md
                    ${open ? "bg-primary-focus " : ""}
                    `}
      >
        {trigger}
        <ChevronDown
          size={16}
          className={`transition-transform ${open ? "rotate-180" : ""}`}
        />
      </header>

      <div
        data-auto={`accordion-children-job-board`}
        style={{ height: open ? ref.current?.offsetHeight || 0 : 0 }}
        className={`overflow-y-hidden transition-all`}
      >
        <div ref={ref} className={`pt-2 pb-4 pl-4 text-xl`}>
          {children}
        </div>
      </div>
    </li>
  );
}

Accordion.propTypes = {
  children: PropTypes.node.isRequired,
  value: PropTypes.string,
  defaultValue: PropTypes.string,
  onChange: PropTypes.func,
  wrapperClassName: PropTypes.string
};

AccordionItem.propTypes = {
  children: PropTypes.node.isRequired,
  value: PropTypes.string.isRequired,
  trigger: PropTypes.node.isRequired,
  isSuccess: PropTypes.bool
};
