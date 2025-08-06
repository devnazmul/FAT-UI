import { formatText } from "@/utils/formatText.js";
import PropTypes from "prop-types";

const ColorIndicator = ({ colors, indicators }) => {
  return (
    <div
      data-auto="color_container_activity_calendar"
      className={`flex-wrap gap-10 py-2 px-5 `}
    >
      {indicators?.map((indicator) => (
        <div
          key={indicator}
          className={`inline-flex items-center gap-x-2 w-[120px] my-2`}
        >
          <div className={`w-5 h-5 rounded-md ${colors[indicator]}`}></div>
          <span data-auto="leave_activity_calendar" className={`text-xs`}>
            {formatText(indicator)}
          </span>
        </div>
      ))}
    </div>
  );
};

ColorIndicator.propTypes = {
  colors: PropTypes.object.isRequired,
  indicators: PropTypes.array.isRequired,
};

export default ColorIndicator;
