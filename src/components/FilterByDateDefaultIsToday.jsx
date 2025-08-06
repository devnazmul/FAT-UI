import { useAuth } from "@/context/AuthContext.jsx";
import moment from "moment";
import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { IoMdArrowDropleft, IoMdArrowDropright } from "react-icons/io";
import CustomDatePickerOnDateClick from "./InputFields/CustomDatePickerOnDateClick.jsx";

const FilterByDateDefaultIsToday = ({
  value,
  isInitialState = true,
  defaultDateRange,
  onChange = (e) => e,
  isFutureDates = true,
  dataAuto
}) => {
  const { user } = useAuth();
  const checkboxRef = useRef(null);
  const [isInitial] = useState(isInitialState);
  const [dateRange, setDateRange] = useState({
    startDate: moment().startOf("month"),
    endDate: moment().endOf("month")
  });

  useEffect(() => {
    if (Object.keys(value || {}).length > 0) {
      if (value?.start_date && value?.end_date) {
        setDateRange({
          startDate: moment(value.start_date, "DD-MM-YYYY"),
          endDate: moment(value.end_date, "DD-MM-YYYY")
        });
        setButtonName(
          handleButtonName({
            startDate: moment(value.start_date, "DD-MM-YYYY"),
            endDate: moment(value.end_date, "DD-MM-YYYY")
          })
        );
      } else if (value?.start_date && !value?.end_date) {
        setDateRange({
          startDate: moment(value.start_date, "DD-MM-YYYY"),
          endDate: moment(value.start_date, "DD-MM-YYYY")
        });
        setButtonName(
          handleButtonName({
            startDate: moment(value.start_date, "DD-MM-YYYY"),
            endDate: moment(value.start_date, "DD-MM-YYYY")
          })
        );
      } else {
        setDateRange({
          startDate: moment(value.end_date, "DD-MM-YYYY"),
          endDate: moment(value.end_date, "DD-MM-YYYY")
        });
        setButtonName(
          handleButtonName({
            startDate: moment(value.end_date, "DD-MM-YYYY"),
            endDate: moment(value.end_date, "DD-MM-YYYY")
          })
        );
      }
    }
  }, [value]);

  const [filterName, setFilterName] = useState("today");
  const [buttonName, setButtonName] = useState("Today");

  const handleDateChange = (amount) => {
    setButtonName("");
    if (filterName === "today") {
      setDateRange((prevDateRange) => ({
        startDate: prevDateRange.startDate.clone().add(amount, "days"),
        endDate: prevDateRange.endDate.clone().add(amount, "days")
      }));
      onChange({
        filterName: buttonName,
        start: dateRange.startDate
          .clone()
          .add(amount, "days")
          ?.format("DD-MM-YYYY"),
        end: dateRange.endDate.clone().add(amount, "days")?.format("DD-MM-YYYY")
      });
    } else if (
      filterName === "thisWeek" ||
      filterName === "lastWeek" ||
      filterName === "nextWeek"
    ) {
      setDateRange((prevDateRange) => ({
        startDate: prevDateRange.startDate.clone().add(amount, "weeks"),
        endDate: prevDateRange.startDate
          .clone()
          .add(amount, "weeks")
          .endOf("week")
      }));
      onChange({
        filterName: buttonName,
        start: dateRange.startDate
          .clone()
          .add(amount, "weeks")
          ?.format("DD-MM-YYYY"),
        end: dateRange.endDate
          .clone()
          .add(amount, "weeks")
          ?.format("DD-MM-YYYY")
      });
    } else if (
      filterName === "thisMonth" ||
      filterName === "lastMonth" ||
      filterName === "nextMonth"
    ) {
      setDateRange((prevDateRange) => ({
        startDate: prevDateRange.startDate.clone().add(amount, "months"),
        endDate: prevDateRange.startDate
          .clone()
          .add(amount, "months")
          .endOf("month")
      }));
      onChange({
        filterName: buttonName,
        start: dateRange.startDate
          .clone()
          .add(amount, "months")
          ?.format("DD-MM-YYYY"),
        end: dateRange.endDate
          .clone()
          .add(amount, "months")
          ?.format("DD-MM-YYYY")
      });
    } else {
      setDateRange((prevDateRange) => ({
        startDate: prevDateRange.startDate.clone().add(amount, "years"),
        endDate: prevDateRange.startDate
          .clone()
          .add(amount, "years")
          .endOf("year")
      }));
      onChange({
        filterName: buttonName,
        start: dateRange.startDate
          .clone()
          .add(amount, "years")
          ?.format("DD-MM-YYYY"),
        end: dateRange.endDate
          .clone()
          .add(amount, "years")
          ?.format("DD-MM-YYYY")
      });
    }
  };

  const startOfCustomWeek = ({ date = moment(), startDay, dateType }) => {
    const currentDay = date.day();
    const diff = (currentDay - startDay + 7) % 7;
    const rem = 6 - diff;
    if (dateType === "endOf") {
      return date?.clone()?.add(rem, "days")?.endOf("day");
    }
    return date?.clone()?.subtract(diff, "days")?.startOf("day");
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
      case "thisWeek":
        setButtonName("This Week");
        startDate = startOfCustomWeek({
          startDay: user?.business?.business_start_day
        });
        endDate = startOfCustomWeek({
          startDay: user?.business?.business_start_day,
          dateType: "endOf"
        });
        break;
      case "lastWeek":
        setButtonName("Last Week");
        startDate = startOfCustomWeek({
          date: moment().subtract(1, "week"),
          startDay: user?.business?.business_start_day
        });
        endDate = startOfCustomWeek({
          date: moment().subtract(1, "week"),
          startDay: user?.business?.business_start_day,
          dateType: "endOf"
        });
        break;
      case "nextWeek":
        setButtonName("Next Week");
        startDate = startOfCustomWeek({
          date: moment().add(1, "week"),
          startDay: user?.business?.business_start_day
        });
        endDate = startOfCustomWeek({
          date: moment().add(1, "week"),
          startDay: user?.business?.business_start_day,
          dateType: "endOf"
        });
        break;
      case "thisMonth":
        setButtonName("This Month");
        startDate = moment().startOf("month");
        endDate = moment().endOf("month");
        break;
      case "lastMonth":
        setButtonName("Last Month");
        startDate = moment().subtract(1, "month").startOf("month");
        endDate = moment().subtract(1, "month").endOf("month");
        break;
      case "nextMonth":
        setButtonName("Next Month");
        startDate = moment().add(1, "month").startOf("month");
        endDate = moment().add(1, "month").endOf("month");
        break;
      case "thisYear":
        setButtonName("This Year");
        startDate = moment().startOf("year");
        endDate = moment().endOf("year");
        break;
      case "lastYear":
        setButtonName("Last Year");
        startDate = moment().subtract(1, "year").startOf("year");
        endDate = moment().subtract(1, "year").endOf("year");
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

    onChange({
      filterName: buttonName,
      start: startDate?.format("DD-MM-YYYY"),
      end: endDate?.format("DD-MM-YYYY")
    });
  };

  const handleButtonName = (dateRange) => {
    const start = moment(dateRange?.startDate)?.startOf("day");
    const end = moment(dateRange?.endDate)?.endOf("day");

    if (
      start.isSame(moment().startOf("day")) &&
      end.isSame(moment().endOf("day"))
    ) {
      return "Today";
    } else if (
      start.isSame(
        startOfCustomWeek({
          startDay: user?.business?.business_start_day
        })
      ) &&
      end.isSame(
        startOfCustomWeek({
          startDay: user?.business?.business_start_day,
          dateType: "endOf"
        })
      )
    ) {
      return "This Week";
    } else if (
      start.isSame(
        startOfCustomWeek({
          date: moment().subtract(1, "week"),
          startDay: user?.business?.business_start_day
        })
      ) &&
      end.isSame(
        startOfCustomWeek({
          date: moment().subtract(1, "week"),
          startDay: user?.business?.business_start_day,
          dateType: "endOf"
        })
      )
    ) {
      return "Last Week";
    } else if (
      start.isSame(
        startOfCustomWeek({
          date: moment().add(1, "week"),
          startDay: user?.business?.business_start_day
        })
      ) &&
      end.isSame(
        startOfCustomWeek({
          date: moment().add(1, "week"),
          startDay: user?.business?.business_start_day,
          dateType: "endOf"
        })
      )
    ) {
      return "Next Week";
    } else if (
      start.isSame(moment().startOf("month")) &&
      end.isSame(moment().endOf("month"))
    ) {
      return "This Month";
    } else if (
      start.isSame(moment().subtract(1, "month").startOf("month")) &&
      end.isSame(moment().subtract(1, "month").endOf("month"))
    ) {
      return "Last Month";
    } else if (
      start.isSame(moment().add(1, "month").startOf("month")) &&
      end.isSame(moment().add(1, "month").endOf("month"))
    ) {
      return "Next Month";
    } else if (
      start.isSame(moment().startOf("year")) &&
      end.isSame(moment().endOf("year"))
    ) {
      return "This Year";
    } else if (
      start.isSame(moment().subtract(1, "year").startOf("year")) &&
      end.isSame(moment().subtract(1, "year").endOf("year"))
    ) {
      return "Last Year";
    } else if (
      start.isSame(moment().add(1, "year").startOf("year")) &&
      end.isSame(moment().add(1, "year").endOf("year"))
    ) {
      return "Next Year";
    }

    return "";
  };

  const handleCheckboxRef = () => {
    if (checkboxRef.current) {
      checkboxRef.current.checked = false;
    }
  };

  useEffect(() => {
    if (isInitial) {
      handleButtonClick("today");
    }
    if (!isInitial) {
      if (defaultDateRange) {
        handleButtonClick(defaultDateRange);
      }
    }
  }, []);

  const formattedDateRange = (dateRange) => {
    return (
      <div className={`flex items-center gap-2 z-[100]`}>
        <CustomDatePickerOnDateClick
          className="font-bold"
          value={dateRange?.startDate}
          onChange={(e) => {
            onChange({
              start: e,
              end: dateRange?.endDate.format("DD-MM-YYYY")
            });
          }}
          to={dateRange?.endDate.format("DD-MM-YYYY")}
        />

        <p>to</p>

        <div className={`hidden md:block`}>
          <CustomDatePickerOnDateClick
            className="font-bold"
            value={dateRange?.endDate}
            onChange={(e) => {
              onChange({
                start: dateRange?.startDate.format("DD-MM-YYYY"),
                end: e
              });
            }}
            from={dateRange?.startDate.format("DD-MM-YYYY")}
          />
        </div>
        <div className={`block md:hidden`}>
          <CustomDatePickerOnDateClick
            right
            className="font-bold"
            value={dateRange?.endDate}
            onChange={(e) => {
              onChange({
                start: dateRange?.startDate,
                end: e
              });
            }}
            from={dateRange?.starDate}
          />
        </div>
      </div>
    );
  };

  const [dateUI, setDateUI] = useState(formattedDateRange(dateRange));

  useEffect(() => {
    setDateUI(formattedDateRange(dateRange));
  }, [dateRange]);

  const buttons = [
    {
      expectedButtonName: "Last Year",
      handlerTrigger: "lastYear",
      show: true
    },
    {
      expectedButtonName: "Last Month",
      handlerTrigger: "lastMonth",
      show: true
    },
    {
      expectedButtonName: "Last Week",
      handlerTrigger: "lastWeek",
      show: true
    },
    {
      expectedButtonName: "Today",
      handlerTrigger: "today",
      show: true
    },
    {
      expectedButtonName: "This Week",
      handlerTrigger: "thisWeek",
      show: true
    },
    {
      expectedButtonName: "This Month",
      handlerTrigger: "thisMonth",
      show: true
    },
    {
      expectedButtonName: "This Year",
      handlerTrigger: "thisYear",
      show: true
    },
    {
      expectedButtonName: "Next Week",
      handlerTrigger: "nextWeek",
      show: isFutureDates
    },
    {
      expectedButtonName: "Next Month",
      handlerTrigger: "nextMonth",
      show: isFutureDates
    },
    {
      expectedButtonName: "Next Year",
      handlerTrigger: "nextYear",
      show: isFutureDates
    }
  ];

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

  return (
    <div className="flex flex-col gap-5 md:gap-1 w-full mb-5  md:mb-5 rounded-xl  shadow-md">
      <div className="flex bg-base-100 flex-col sm:flex-row gap-5 md:gap-0 justify-between items-center py-5 px-5 rounded-xl">
        <div className="hidden md:block">{dateUI}</div>

        <div className="flex justify-between w-full md:w-16 gap-2">
          <button
            data-auto={`filter-by-date-left-attendance`}
            onClick={() => handleDateChange(-1)}
          >
            <IoMdArrowDropleft className="text-3xl md:text-2xl hover:text-primary" />
          </button>

          <div className="block md:hidden">{dateUI}</div>

          <button
            data-auto={`filter-by-date-right-attendance`}
            onClick={() => handleDateChange(1)}
          >
            <IoMdArrowDropright className="text-3xl md:text-2xl hover:text-primary" />
          </button>
        </div>
      </div>

      {/* MOBILE DEVICE */}
      {/* Additional div below the parent div */}
      <div className="collapse md:hidden collapse-arrow bg-base-200">
        <input type="checkbox" name="my-accordion-2" ref={checkboxRef} />
        <div
          data-auto={`filter-by-date-anonymous-button-attendance`}
          className="collapse-title  text-md font-medium bg-primary text-base-300"
        >
          {buttonName || "Custom Date"}
        </div>

        <div className="collapse-content">
          <div className="mt-4 flex flex-col gap-1 justify-between items-center py-2">
            {buttons
              ?.filter((b) => b?.show)
              ?.map((b, i) => (
                <button
                  key={i}
                  data-auto={`mobile-${dataAuto}-${b?.expectedButtonName}`}
                  className={`${
                    buttonName !== b?.expectedButtonName && "btn-outline"
                  } font-semibold btn btn-primary w-full`}
                  onClick={() => {
                    handleButtonClick(b?.handlerTrigger);
                    handleCheckboxRef();
                  }}
                >
                  {b?.expectedButtonName}
                </button>
              ))}
          </div>
        </div>
      </div>

      {/* DESKTOP */}

      <div
        ref={scrollContainerRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUpOrLeave}
        onMouseLeave={handleMouseUpOrLeave}
        className={`relative scroll-smooth hidden md:flex justify-between select-none items-center gap-3 overflow-x-auto whitespace-nowrap py-3 scrollbar-none scroll cursor-grab w-auto`}
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

        {buttons
          ?.filter((b) => b?.show)
          ?.map((b, i) => (
            <button
              key={i}
              data-auto={`${dataAuto}-${b?.expectedButtonName}`}
              className={`${
                buttonName === b?.expectedButtonName && "text-primary"
              } font-semibold flex items-center gap-1`}
              onClick={() => handleButtonClick(b?.handlerTrigger)}
            >
              {b?.expectedButtonName?.split(" ")?.map((t, i) => (
                <span key={i}>{t}</span>
              ))}
            </button>
          ))}

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

export default FilterByDateDefaultIsToday;

FilterByDateDefaultIsToday.propTypes = {
  value: PropTypes.object,
  isInitialState: PropTypes.bool,
  defaultDateRange: PropTypes.string,
  onChange: PropTypes.func,
  isFutureDates: PropTypes.bool,
  dataAuto: PropTypes.string
};
