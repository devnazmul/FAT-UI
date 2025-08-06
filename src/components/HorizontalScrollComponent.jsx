import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

export default function HorizontalScrollComponent({ data = [] }) {
  // HANDLE VERTICAL SCROLL
  const scrollContainerRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    // Horizontal scroll with mouse wheel
    const handleWheel = (e) => {
      e.preventDefault(); // Prevent vertical scroll
      scrollContainer.scrollLeft += e.deltaY; // Scroll horizontally instead
    };
    scrollContainer.addEventListener("wheel", handleWheel);
    // Cleanup the event listener when the component unmounts
    return () => {
      scrollContainer.removeEventListener("wheel", handleWheel);
    };
  }, []);

  // Mouse down event for initiating the drag
  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - scrollContainerRef.current.offsetLeft);
    setScrollLeft(scrollContainerRef.current.scrollLeft);
  };

  // Mouse move event for dragging
  const handleMouseMove = (e) => {
    if (!isDragging) return; // Only move if dragging
    e.preventDefault();
    const x = e.pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - startX) * 2; // The multiplier controls the scroll speed
    scrollContainerRef.current.scrollLeft = scrollLeft - walk;
  };

  // Mouse up or leave event for stopping the drag
  const handleMouseUpOrLeave = () => {
    setIsDragging(false);
  };

  return (
    <div className={`flex justify-between items-center`}>
      {/* LEFT NAVIGATE  */}
      <button
        onClick={() => {
          scrollContainerRef.current.scrollLeft -= 100;
        }}
        className={`sticky hover:text-primary cursor-pointer flex justify-start items-center bg-gradient-to-l pl-1 from-transparent via-base-300 to-base-300 left-0 bottom-0 min-h-10 min-w-10`}
      >
        <FiChevronLeft className={`text-xl`} />
      </button>

      <div
        ref={scrollContainerRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUpOrLeave}
        onMouseLeave={handleMouseUpOrLeave}
        className={`relative scroll-smooth flex justify-start select-none items-center gap-3 overflow-x-auto whitespace-nowrap py-3 scrollbar-none scroll cursor-grab w-full`}
      >
        {data?.map((b, i) => (
          <b.ButtonComponent key={i} />
        ))}
      </div>

      {/* RIGHT NAVIGATE  */}
      <button
        onClick={() => {
          scrollContainerRef.current.scrollLeft += 100;
        }}
        className={`sticky flex cursor-pointer hover:text-primary justify-end items-center bg-gradient-to-r pr-1 from-transparent via-base-300 to-base-300 right-0 bottom-0 min-h-10 min-w-10`}
      >
        <FiChevronRight className={`text-xl  `} />
      </button>
    </div>
  );
}
HorizontalScrollComponent.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      ButtonComponent: PropTypes.elementType.isRequired
    })
  )
};
