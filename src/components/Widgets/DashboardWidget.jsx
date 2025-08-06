// Widget.js

import React from "react";
import { useDrag } from "react-dnd";
import { formatText } from "../../utils/formatText";

const DashboardWidget = ({ id, item, isDragAble = true, icons }) => {
  const [{ isDragging }, drag] = useDrag({
    type: "WIDGET",
    item: { ...item, widget_order: item.widget_order }, // Include widget_order in the item
    canDrag: isDragAble,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  return (
    <div
      ref={isDragAble ? drag : null}
      className={`cursor-move h-[100px] bg-base-300 flex gap-5 justify-start items-center font-bold rounded-xl border-primary-content border-2 p-5  ${
        isDragging ? "border-dashed opacity-70 border-primary" : ""
      }`}
      data-widget-id={id}
    >
      <div
        className={`w-10 md:w-12 h-10 md:h-12 bg-primary-content rounded-xl shadow-md  flex justify-center items-center text-primary text-xl md:text-2xl`}
      >
        {icons[item?.widget_name]}
      </div>
      <span>{formatText(item?.widget_name)}</span>
    </div>
  );
};

export default DashboardWidget;
