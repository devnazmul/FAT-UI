import moment from "moment";
import { Calendar, momentLocalizer } from "react-big-calendar";
import { generateYearlyRepeatingEvents } from "../utils/generateYearlyRepeatingEvents";
import PropTypes from "prop-types";

const localizer = momentLocalizer(moment);

export const CustomBigCalender = ({
  events,
  onSelectSlot,
  onSelecting,
  onDoubleClickEvent,
  onDrillDown,
  onKeyPressEvent,
  onNavigate,
  onRangeChange,
  onSelectEvent,
  onShowMore,
  defaultView = "month"
}) => (
  <div
    data-auto={`custom-big-calendar-component-holidays`}
    className="h-[90vh] md:h-screen"
  >
    <Calendar
      localizer={localizer}
      events={events?.flatMap(generateYearlyRepeatingEvents)}
      startAccessor="start"
      endAccessor="end"
      onSelectSlot={onSelectSlot}
      onSelecting={onSelecting}
      onDoubleClickEvent={onDoubleClickEvent}
      onDrillDown={onDrillDown}
      onKeyPressEvent={onKeyPressEvent}
      onNavigate={onNavigate}
      onRangeChange={onRangeChange}
      onSelectEvent={onSelectEvent}
      onShowMore={onShowMore}
      selectable
      defaultView={defaultView}
    />
  </div>
);

// PROP TYPES
CustomBigCalender.propTypes = {
  events: PropTypes.array,
  onSelectSlot: PropTypes.func,
  onSelecting: PropTypes.func,
  onDoubleClickEvent: PropTypes.func,
  onDrillDown: PropTypes.func,
  onKeyPressEvent: PropTypes.func,
  onNavigate: PropTypes.func,
  onRangeChange: PropTypes.func,
  onSelectEvent: PropTypes.func,
  onShowMore: PropTypes.func,
  defaultView: PropTypes.string
};
