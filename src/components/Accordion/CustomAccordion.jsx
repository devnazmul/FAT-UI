import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { MdKeyboardArrowDown } from "react-icons/md";

export default function CustomAccordion({
  TitleComponent,
  Details = () => {},
  isOpenValue = false
}) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(isOpenValue);
  }, [isOpenValue]);
  return (
    <div className={`relative border rounded-md shadow-sm`}>
      <div
        onClick={() => setIsOpen(!isOpen)}
        className={`py-2 px-2 rounded-md border border-gray-300 cursor-pointer flex justify-between items-center`}
      >
        <TitleComponent />
        <MdKeyboardArrowDown
          className={`${isOpen && "rotate-180"} duration-100 font-bold text-xl`}
        />
      </div>

      {/* DETAILS  */}
      <div
        className={`overflow-hidden  top-[95%] w-full bg-base-300 duration-200 ${
          isOpen ? "h-auto  px-5 py-2 " : "h-0"
        }`}
      >
        <div className={` ${isOpen ? "opacity-100 " : "opacity-50"}`}>
          <Details />
        </div>
      </div>
    </div>
  );
}

CustomAccordion.propTypes = {
  TitleComponent: PropTypes.elementType || PropTypes.any,
  Details: PropTypes.func,
  isOpenValue: PropTypes.bool
};
