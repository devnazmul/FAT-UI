import moment from "moment";
import PropTypes from "prop-types";

export default function DayCalendar({ spacialDates = [] }) {
  return (
    <div className="flex flex-col justify-center items-start">
      <h1 className={`text-center font-semibold text-xl mb-2`}>
        On {moment(spacialDates[0]?.date, "DD-MM-YYYY").format("LL")}
      </h1>

      <div>{spacialDates?.[0]?.CustomComponent}</div>
    </div>
  );
}

DayCalendar.propTypes = {
  spacialDates: PropTypes.arrayOf(
    PropTypes.shape({
      date: PropTypes.string.isRequired,
      CustomComponent: PropTypes.node.isRequired
    })
  )
};
