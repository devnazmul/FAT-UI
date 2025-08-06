import moment from "moment";
import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { IoMdArrowDropleft, IoMdArrowDropright } from "react-icons/io";

const FilterByDate = ({
  isInitialState = true,
  defaultDateRange,
  onChange = (e) => e,
  defaultSelectedDateRange = {
    startDate: moment().startOf("month"),
    endDate: moment().endOf("month")
  },
  isNeedFutureDates = false
}) => {
  const checkboxRef = useRef(null);
  const [isInitial, setIsInitial] = useState(isInitialState);
  const [dateRange, setDateRange] = useState(defaultSelectedDateRange);

  const [filterName, setFilterName] = useState("thisMonth");
  const [buttonName, setButtonName] = useState("Today");
  const handleDateChange = (amount) => {
    setButtonName(""); // Reset button name initially

    setDateRange((prevDateRange) => {
      const newStartDate = prevDateRange.startDate
        .clone()
        .add(
          amount,
          filterName === "today"
            ? "days"
            : filterName.includes("Week")
              ? "weeks"
              : filterName.includes("Month")
                ? "months"
                : "years"
        );

      const newEndDate = newStartDate
        .clone()
        .endOf(
          filterName === "today"
            ? "day"
            : filterName.includes("Week")
              ? "week"
              : filterName.includes("Month")
                ? "month"
                : "year"
        );

      // Update button name to show only the month name
      const newButtonName = newStartDate.format("MMMM"); // Example: "March"

      setButtonName(newButtonName);

      return { startDate: newStartDate, endDate: newEndDate };
    });
  };

  const handleButtonClick = (preset) => {
    let startDate, endDate;
    setFilterName(preset);
    switch (preset) {
      case "today":
        setButtonName("Today");
        startDate = moment().startOf("day");
        endDate = moment().endOf("day");
        break;

      // WEEK
      case "lastWeek":
        setButtonName("Last Week");
        startDate = moment().subtract(1, "week").startOf("week");
        endDate = moment().subtract(1, "week").endOf("week");
        break;

      case "thisWeek":
        setButtonName("This Week");
        startDate = moment().startOf("week");
        endDate = moment().endOf("week");
        break;

      case "nextWeek":
        setButtonName("Next Week");
        startDate = moment().add(1, "week").startOf("week");
        endDate = moment().add(1, "week").endOf("week");
        break;

      // MONTH
      case "lastMonth":
        setButtonName("Last Month");
        startDate = moment().subtract(1, "month").startOf("month");
        endDate = moment().subtract(1, "month").endOf("month");
        break;

      case "thisMonth":
        setButtonName("This Month");
        startDate = moment().startOf("month");
        endDate = moment().endOf("month");
        break;

      case "nextMonth":
        setButtonName("Next Month");
        startDate = moment().add(1, "month").startOf("month");
        endDate = moment().add(1, "month").endOf("month");
        break;

      // YEAR
      case "lastYear":
        setButtonName("Last Year");
        startDate = moment().subtract(1, "year").startOf("year");
        endDate = moment().subtract(1, "year").endOf("year");
        break;
      case "thisYear":
        setButtonName("This Year");
        startDate = moment().startOf("year");
        endDate = moment().endOf("year");
        break;
      case "nextYear":
        setButtonName("Next Year");
        startDate = moment().add(1, "year").startOf("year");
        endDate = moment().add(1, "year").endOf("year");
        break;

      default:
        break;
    }

    setDateRange({ startDate, endDate });
  };

  const handleCheckboxRef = () => {
    if (checkboxRef.current) {
      checkboxRef.current.checked = false;
    }
  };

  useEffect(() => {
    if (isInitial) {
      handleButtonClick("thisMonth");
    }
    if (!isInitial) {
      handleButtonClick(defaultDateRange);
    }
  }, []);

  const formattedDateRange = () => {
    if (
      moment(dateRange.startDate).format("MMMM D, YYYY") ===
      moment(dateRange.endDate).format("MMMM D, YYYY")
    ) {
      return (
        <span className={`flex gap-2`}>
          <span className={`text-primary font-semibold`}>
            {moment(dateRange.startDate).format("DD MMM YYYY")}
          </span>
        </span>
      );
    } else {
      return (
        <span className={`flex gap-2`}>
          <span className={`text-primary font-semibold`}>
            {moment(dateRange.startDate).format("DD MMM YYYY")}
          </span>
          <span className={``}>To</span>
          <span className={`text-primary font-semibold`}>
            {moment(dateRange.endDate).format("DD MMM YYYY")}
          </span>
        </span>
      );
    }
  };

  useEffect(() => {
    if (!isInitial) {
      onChange({
        filterName: buttonName,
        start: dateRange?.startDate?.format("DD-MM-YYYY"),
        end: dateRange?.endDate?.format("DD-MM-YYYY")
      });
    } else {
      setIsInitial(false);
    }
  }, [dateRange]);

  // ===================================================
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

  // ===============================================================

  return (
    <div className=" flex flex-col gap-5 md:gap-1 w-full mb-5  md:mb-5 rounded-xl overflow-hidden shadow-md">
      <div className="flex bg-base-100 flex-col sm:flex-row gap-5 md:gap-0 justify-between items-center py-5 px-5 rounded-xl">
        <div className="hidden md:block">{formattedDateRange()}</div>

        <div className="flex justify-between w-full md:w-16 gap-2">
          <button
            data-auto={`filter-by-date-left-attendance`}
            onClick={() => handleDateChange(-1)}
          >
            <IoMdArrowDropleft className="text-3xl md:text-2xl hover:text-primary" />
          </button>

          <div className="block md:hidden">{formattedDateRange()}</div>

          <button
            data-auto={`filter-by-date-right-attendance`}
            onClick={() => handleDateChange(1)}
          >
            <IoMdArrowDropright className="text-3xl md:text-2xl hover:text-primary" />
          </button>
        </div>
      </div>

      {/* Additional div below the parent div */}
      <div className="collapse md:hidden collapse-arrow bg-base-200">
        <input type="checkbox" name="my-accordion-2" ref={checkboxRef} />
        <div
          data-auto={`filter-by-date-anonymous-button-attendance`}
          className="collapse-title  text-md font-medium bg-primary text-base-300"
        >
          {buttonName}
        </div>

        {/* MOBILE   */}
        <div className="collapse-content">
          <div className="mt-4 flex flex-col gap-1 justify-between items-center py-2">
            <button
              data-auto={`filter-by-date-today-button-attendance`}
              className={`${
                moment().startOf("day").format("DD-MM-YYYY") !==
                  moment(dateRange?.startDate).format("DD-MM-YYYY") &&
                "btn-outline"
              } font-semibold btn btn-primary w-full`}
              onClick={() => {
                handleButtonClick("today");
                handleCheckboxRef();
              }}
            >
              Today
            </button>

            <button
              data-auto={`filter-by-date-last-week-button-attendance`}
              className={`${
                buttonName !== "Last Week" && "btn-outline"
              } font-semibold btn btn-primary w-full`}
              onClick={() => {
                handleButtonClick("lastWeek");
                handleCheckboxRef();
              }}
            >
              Last Week
            </button>

            <button
              data-auto={`filter-by-date-this-week-button-attendance`}
              className={`${
                buttonName !== "This Week" && "btn-outline"
              } font-semibold btn btn-primary w-full`}
              onClick={() => {
                handleButtonClick("thisWeek");
                handleCheckboxRef();
              }}
            >
              This Week
            </button>

            {!!isNeedFutureDates && (
              <button
                data-auto={`filter-by-date-next-week-button-attendance`}
                className={`${
                  buttonName !== "Next Week" && "btn-outline"
                } font-semibold btn btn-primary w-full`}
                onClick={() => {
                  handleButtonClick("nextWeek");
                  handleCheckboxRef();
                }}
              >
                Next Week
              </button>
            )}

            <button
              data-auto={`filter-by-date-last-month-button-attendance`}
              className={`${
                buttonName !== "Last Month" && "btn-outline"
              } font-semibold btn btn-primary w-full`}
              onClick={() => {
                handleButtonClick("lastMonth");
                handleCheckboxRef();
              }}
            >
              Last Month
            </button>

            <button
              data-auto={`filter-by-date-this-month-button-attendance`}
              className={`${
                buttonName !== "This Month" && "btn-outline"
              } font-semibold btn btn-primary w-full`}
              onClick={() => {
                handleButtonClick("thisMonth");
                handleCheckboxRef();
              }}
            >
              This Month
            </button>

            {!!isNeedFutureDates && (
              <button
                data-auto={`filter-by-date-next-month-button-attendance`}
                className={`${
                  buttonName !== "Next Month" && "btn-outline"
                } font-semibold btn btn-primary w-full`}
                onClick={() => {
                  handleButtonClick("nextMonth");
                  handleCheckboxRef();
                }}
              >
                Next Month
              </button>
            )}

            <button
              data-auto={`filter-by-date-last-year-button-attendance`}
              className={`${
                buttonName !== "Last Year" && "btn-outline"
              } font-semibold btn btn-primary w-full`}
              onClick={() => {
                handleButtonClick("lastYear");
                handleCheckboxRef();
              }}
            >
              Last Year
            </button>

            <button
              data-auto={`filter-by-date-this-year-button-attendance`}
              className={`${
                buttonName !== "This Year" && "btn-outline"
              } font-semibold btn btn-primary w-full`}
              onClick={() => {
                handleButtonClick("thisYear");
                handleCheckboxRef();
              }}
            >
              This Year
            </button>

            {!!isNeedFutureDates && (
              <button
                data-auto={`filter-by-date-next-year-button-attendance`}
                className={`${
                  buttonName !== "Next Year" && "btn-outline"
                } font-semibold btn btn-primary w-full`}
                onClick={() => {
                  handleButtonClick("nextYear");
                  handleCheckboxRef();
                }}
              >
                Next Year
              </button>
            )}
          </div>
        </div>
      </div>

      {/* DESKTOP  */}
      <div
        ref={scrollContainerRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUpOrLeave}
        onMouseLeave={handleMouseUpOrLeave}
        className={`${
          isNeedFutureDates
            ? "relative scroll-smooth hidden md:flex select-none items-center overflow-x-auto gap-1 whitespace-nowrap py-1 scrollbar-none scroll cursor-grab "
            : "py-3 hidden md:flex justify-between md:px-5 lg:px-16"
        }`}
      >
        {/* LEFT NAVIGATE  */}
        <button
          onClick={() => {
            scrollContainerRef.current.scrollLeft -= 100;
          }}
          className={`sticky  hover:text-primary cursor-pointer flex justify-start items-center bg-gradient-to-l pl-1 from-transparent via-base-300 to-base-300 left-0 bottom-0 min-h-10 min-w-10`}
        >
          <FiChevronLeft className={`text-xl`} />
        </button>

        <button
          data-auto={`filter-by-date-today-button-desktop-attendance`}
          className={`${
            moment().startOf("day").format("DD-MM-YYYY") ==
              moment(dateRange.startDate).format("DD-MM-YYYY") && "text-primary"
          } font-semibold ${
            isNeedFutureDates ? "min-w-32 md:block hidden" : ""
          }`}
          onClick={() => handleButtonClick("today")}
        >
          Today
        </button>

        <button
          data-auto={`filter-by-date-last-week-button-desktop-attendance`}
          className={`${
            buttonName === "Last Week" && "text-primary"
          } font-semibold ${
            isNeedFutureDates ? "min-w-32 md:block hidden" : ""
          }`}
          onClick={() => handleButtonClick("lastWeek")}
        >
          Last Week
        </button>

        <button
          data-auto={`filter-by-date-this-week-button-desktop-attendance`}
          className={`${
            buttonName === "This Week" && "text-primary"
          } font-semibold ${
            isNeedFutureDates ? "min-w-32 md:block hidden" : ""
          }`}
          onClick={() => handleButtonClick("thisWeek")}
        >
          This Week
        </button>

        {!!isNeedFutureDates && (
          <button
            data-auto={`filter-by-date-next-week-button-desktop-attendance`}
            className={`${
              buttonName === "Next Week" && "text-primary"
            } font-semibold ${
              isNeedFutureDates ? "min-w-32 md:block hidden" : ""
            }`}
            onClick={() => handleButtonClick("nextWeek")}
          >
            Next Week
          </button>
        )}

        <button
          data-auto={`filter-by-date-last-month-button-desktop-attendance`}
          className={`${
            buttonName === "Last Month" && "text-primary"
          } font-semibold ${
            isNeedFutureDates ? "min-w-32 md:block hidden" : ""
          }`}
          onClick={() => handleButtonClick("lastMonth")}
        >
          Last Month
        </button>

        <button
          data-auto={`filter-by-date-this-month-button-desktop-attendance`}
          className={`${
            buttonName === "This Month" && "text-primary"
          } font-semibold ${
            isNeedFutureDates ? "min-w-32 md:block hidden" : ""
          }`}
          onClick={() => handleButtonClick("thisMonth")}
        >
          This Month
        </button>

        {!!isNeedFutureDates && (
          <button
            data-auto={`filter-by-date-next-month-button-desktop-attendance`}
            className={`${
              buttonName === "Next Month" && "text-primary"
            } font-semibold ${
              isNeedFutureDates ? "min-w-32 md:block hidden" : ""
            }`}
            onClick={() => handleButtonClick("nextMonth")}
          >
            Next Month
          </button>
        )}

        <button
          data-auto={`filter-by-date-last-year-button-desktop-attendance`}
          className={`${
            buttonName === "Last Year" && "text-primary"
          } font-semibold ${
            isNeedFutureDates ? "min-w-32 md:block hidden" : ""
          }`}
          onClick={() => handleButtonClick("lastYear")}
        >
          Last Year
        </button>

        <button
          data-auto={`filter-by-date-this-year-button-desktop-attendance`}
          className={`${
            buttonName === "This Year" && "text-primary"
          } font-semibold ${
            isNeedFutureDates ? "min-w-32 md:block hidden" : ""
          }`}
          onClick={() => handleButtonClick("thisYear")}
        >
          This Year
        </button>
        {!!isNeedFutureDates && (
          <button
            data-auto={`filter-by-date-next-year-button-desktop-attendance`}
            className={`${
              buttonName === "Next Year" && "text-primary"
            } font-semibold ${
              isNeedFutureDates ? "min-w-32 md:block hidden" : ""
            }`}
            onClick={() => handleButtonClick("nextYear")}
          >
            Next Year
          </button>
        )}
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
    </div>
  );
};

FilterByDate.propTypes = {
  isInitialState: PropTypes.bool,
  defaultDateRange: PropTypes.object,
  onChange: PropTypes.func,
  defaultSelectedDateRange: PropTypes.shape({
    startDate: PropTypes.object.isRequired,
    endDate: PropTypes.object.isRequired
  }),
  isNeedFutureDates: PropTypes.bool
};

export default FilterByDate;
