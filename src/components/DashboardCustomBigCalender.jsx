import moment from "moment";
import { Calendar, momentLocalizer } from "react-big-calendar";
import { generateYearlyRepeatingEvents } from "../utils/generateYearlyRepeatingEvents";
import PropTypes from "prop-types";

const localizer = momentLocalizer(moment);

export const DashboardCustomBigCalender = ({
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
  defaultView = "month",
  views = [["month", "week", "day"]]
}) => (
  <div
    data-auto={`dashboard-custom-big-calendar-dashboard`}
    className="h-[95%]"
  >
    <Calendar
      localizer={localizer}
      events={events.flatMap(generateYearlyRepeatingEvents)}
      startAccessor="start"
      endAccessor="end"
      onSelectSlot={onSelectSlot}
      onSelecting={onSelecting}
      onDoubleClickEvent={onDoubleClickEvent}
      onDrillDown={onDrillDown}
      views={views}
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

DashboardCustomBigCalender.propTypes = {
  events: PropTypes.array.isRequired,
  onSelectSlot: PropTypes.func,
  onSelecting: PropTypes.func,
  onDoubleClickEvent: PropTypes.func,
  onDrillDown: PropTypes.func,
  onKeyPressEvent: PropTypes.func,
  onNavigate: PropTypes.func,
  onRangeChange: PropTypes.func,
  onSelectEvent: PropTypes.func,
  onShowMore: PropTypes.func,
  defaultView: PropTypes.string,
  views: PropTypes.arrayOf(PropTypes.array)
};
