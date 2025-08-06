import moment from "moment";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import RenderCalendar from "./RenderCalendar";

export default function MonthCalendar({
  startDate = "01-12-2023",
  endDate = "31-12-2023",
  spacialDates = []
}) {
  // Parse the date strings using Moment.js
  const parsedStartDate = moment(startDate, "DD-MM-YYYY");
  const parsedEndDate = moment(endDate, "DD-MM-YYYY");
  const [months, setMonths] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Get the list of months between the two dates
  let currentDate = parsedStartDate.clone();

  useEffect(() => {
    const months = [];
    setIsLoading(true);
    while (currentDate.isSameOrBefore(parsedEndDate)) {
      months.push(new Date(currentDate));
      setMonths(months);
      currentDate.add(1, "month");
    }
    setIsLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [startDate]);

  return (
    <div>
      <h1 className="text-center font-semibold mb-2">
        {moment(startDate, "DD-MM-YYYY").format("DD-MM-YYYY")} To{" "}
        {moment(endDate, "DD-MM-YYYY").format("DD-MM-YYYY")}
      </h1>
      <div className={`flex justify-center`}>
        <div className={`grid grid-cols-1 max-w-[600px] gap-2`}>
          {!isLoading
            ? months.map((month, index) => (
                <div key={index} className={`border p- rounded-xl p-5`}>
                  <RenderCalendar
                    key={index}
                    currentMonth={month}
                    spacialDates={spacialDates}
                    type="sm"
                  />
                </div>
              ))
            : ""}
        </div>
      </div>
    </div>
  );
}

MonthCalendar.propTypes = {
  startDate: PropTypes.string,
  endDate: PropTypes.string,
  spacialDates: PropTypes.arrayOf(PropTypes.any)
};
