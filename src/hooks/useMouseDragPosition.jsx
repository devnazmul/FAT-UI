// ============================
// #00313
// ============================

import { useEffect, useState } from "react";

export const useMouseDragPosition = () => {
  const [mousePosition, setMousePosition] = useState({ x: null, y: null });
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    const handleMouseMove = (event) => {
      if (isDragging) {
        setMousePosition({
          x: event.clientX,
          y: event.clientY
        });
      }
    };

    const handleMouseDown = () => {
      setIsDragging(true);
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    // Cleanup listeners on component unmount
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging]);

  return { mousePosition, isDragging };
};

export default useMouseDragPosition;
