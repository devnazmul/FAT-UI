import PropTypes from "prop-types";
import { formatText } from "../utils/formatText";
import DayCalendar from "./DayCalendar";
import MonthCalendar from "./MonthCalendar";
import WeekCalendar from "./WeekCalendar";
import YearCalendar from "./YearCalendar";

const CustomLeaveCalender = ({
  startDate = null, // DD-MM-YYYY
  endDate = null, // DD-MM-YYYY
  spacialDates = [],
  type, // Today | This Week | Last Week | This Month | Last Month | This Year | Last Year
  handleClosePopup, // Handle Close Popup
  rowData,
}) => (
  <div className="bg-base-300 p-5 rounded">
    {console.log({ type })}
    {rowData ? (
      <h1
        className={`${
          type !== "Today" ? "text-center" : "text-xl"
        }  font-bold text-primary mb-2`}
      >
        Employee Name :{" "}
        {formatText(
          `${rowData?.title} ${rowData?.first_Name} ${
            rowData?.middle_Name || ""
          } ${rowData?.last_Name}`
        )}
      </h1>
    ) : (
      ""
    )}
    {type === "Today" ? (
      <DayCalendar
        startDate={startDate}
        endDate={endDate}
        spacialDates={spacialDates}
      />
    ) : (
      ""
    )}
    {type === "This Week" || type === "Last Week" ? (
      <WeekCalendar
        startDate={startDate}
        endDate={endDate}
        spacialDates={spacialDates}
      />
    ) : (
      ""
    )}
    {type === "This Month" || type === "Last Month" ? (
      <MonthCalendar
        startDate={startDate}
        endDate={endDate}
        spacialDates={spacialDates}
      />
    ) : (
      ""
    )}
    {type === "This Year" || type === "Last Year" ? (
      <YearCalendar
        startDate={startDate}
        endDate={endDate}
        spacialDates={spacialDates}
      />
    ) : (
      ""
    )}

    {/* CLOSE BUTTON  */}
    <div className="sticky bottom-0 bg-base-300 py-5 z-[1000] flex flex-col md:flex-row w-full justify-center md:justify-end items-center mt-5 gap-2">
      <button
        data-auto={`custom-leave-calendar-close-button-leave`}
        // disabled={isPendingSubmit}
        onClick={handleClosePopup}
        className="btn w-full md:btn-wide btn-primary"
      >
        Close
      </button>
    </div>
  </div>
);

export default CustomLeaveCalender;
CustomLeaveCalender.propTypes = {
  startDate: PropTypes.string,
  endDate: PropTypes.string,
  spacialDates: PropTypes.array,
  type: PropTypes.string,
  handleClosePopup: PropTypes.func,
  rowData: PropTypes.object,
};
