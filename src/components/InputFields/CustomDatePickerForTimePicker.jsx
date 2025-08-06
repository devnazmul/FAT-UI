import {
  addMonths,
  format as formatDate,
  getDaysInMonth,
  setYear,
  startOfMonth,
  subMonths
} from "date-fns";
import moment from "moment";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { BiReset } from "react-icons/bi";
import { FaRegCalendarAlt } from "react-icons/fa";
import { IoMdInformationCircle } from "react-icons/io";
import { isDateInRange } from "../../utils/isDateInRange";
import { selectMonth } from "../../utils/selectMonth";
import ColorIndicatorDetails from "../ColorIndicatorDetails";
import { OutsideClickHandler } from "../OutsideClickHandler";
const CustomDatePicker = ({
  hint = false,
  specialDates = [],
  format = "dd-LL-yyyy",
  defaultDate,
  fieldClassName,
  id,
  label,
  required = false,
  name,
  value = "",
  placeholder,
  onChange = (e) => e,
  error,
  defaultValue,
  wrapperClassName,
  top = false,
  right = false,
  allowedDayArray = [],
  disabled = false,
  from = "",
  to = "",
  calenderStartFrom = JSON.parse(localStorage.getItem("userData"))?.business
    ?.business_start_day || 1,
  visibleBorder = false,
  small = false,
  dataAuto
}) => {
  const [step, setStep] = useState("day");
  const [selectedDate, setSelectedDate] = useState(
    value ? new Date(moment(value, "DD-MM-YYYY")) : new Date()
  );
  const [currentMonth, setCurrentMonth] = useState(
    value !== null &&
      value !== undefined &&
      value !== "" &&
      typeof value === "string"
      ? new Date(
          value.split("-")[2],
          value.split("-")[1] - 1,
          value.split("-")[0]
        )
      : new Date()
  );
  const [isDatePickerActive, setDatePickerActive] = useState(false);
  useEffect(() => {
    if (defaultDate) {
      setSelectedDate(defaultDate ? new Date(defaultDate) : "");
    }
  }, [defaultDate]);
  useEffect(() => {
    if (!value) {
      setSelectedDate("");
    } else {
      setSelectedDate(new Date(moment(value, "DD-MM-YYYY")));
    }
  }, [value]);
  const handleMonthChange = (newMonth) => {
    setCurrentMonth(newMonth);
    setStep("day");
  };
  const handleChangeYear = (start, end) => {
    setStartYear(start);
    setEndYear(end);
    setAllYear(
      Array.from({ length: end - start + 1 }, (_, index) => start + index)
    );
  };
  const handleDateClick = (day) => {
    setSelectedDate(day);
    onChange(formatDate(day, format));
    setDatePickerActive(false);
  };
  const handleInputClick = () => {
    setDatePickerActive(!isDatePickerActive);
  };
  // RENDER CALENDER
  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(
      currentMonth
        ? currentMonth
        : value
          ? moment(value, "DD-MM-YYYY").toDate()
          : currentMonth
    );
    const firstDayOfMonth = startOfMonth(
      currentMonth
        ? currentMonth
        : value
          ? moment(value, "DD-MM-YYYY").toDate()
          : currentMonth
    );
    const weekDays = getWeekDays(calenderStartFrom);
    const today = new Date();
    // Adjust the first day of the month to align with calendarStartFrom
    const adjustedFirstDayIndex =
      (firstDayOfMonth.getDay() - calenderStartFrom + 7) % 7;
    return (
      <div
        className="grid grid-rows-6 grid-cols-7  md:gap-1"
        data-auto={`data-picker-date-select`}
      >
        {weekDays.map((weekDay) => (
          <div key={weekDay} className="text-center py-2 font-bold">
            {weekDay}
          </div>
        ))}
        {/* EMPTY  */}
        {Array.from({ length: adjustedFirstDayIndex }).map((_, index) => (
          <div
            key={`empty-${index}`}
            className={`p-2 ${small ? "h-7 w-7" : "md:h-10 md:w-10 h-7 w-7"}`}
          ></div>
        ))}
        {/* DAYS  */}
        {Array.from({ length: daysInMonth }, (_, index) => index + 1).map(
          (day, i) => (
            <button
              key={i}
              title={
                specialDates.find(
                  (obj) =>
                    obj?.date ===
                    moment(
                      new Date(
                        currentMonth.getFullYear(),
                        currentMonth.getMonth(),
                        day
                      )
                    ).format("DD-MM-YYYY")
                )?.title
              }
              disabled={
                (specialDates.some(
                  (obj) =>
                    obj?.date ===
                    moment(
                      new Date(
                        currentMonth.getFullYear(),
                        currentMonth.getMonth(),
                        day
                      )
                    ).format("DD-MM-YYYY")
                ) &&
                  specialDates.find(
                    (obj) =>
                      obj?.date ===
                      moment(
                        new Date(
                          currentMonth.getFullYear(),
                          currentMonth.getMonth(),
                          day
                        )
                      ).format("DD-MM-YYYY")
                  )?.isDisabled &&
                  !isDateInRange(
                    moment(
                      new Date(
                        currentMonth.getFullYear(),
                        currentMonth.getMonth(),
                        day
                      )
                    ).format("DD-MM-YYYY"),
                    from,
                    to
                  )) ||
                (allowedDayArray.length
                  ? !allowedDayArray?.includes(
                      moment(
                        new Date(
                          currentMonth.getFullYear(),
                          currentMonth.getMonth(),
                          day
                        )
                      ).format("ddd")
                    )
                  : false)
              }
              className={`text-center ${
                small ? "h-7 w-7" : "md:h-10 md:w-10 h-7 w-7"
              } rounded-md  flex justify-center items-center ${
                !isDateInRange(
                  moment(
                    new Date(
                      currentMonth.getFullYear(),
                      currentMonth.getMonth(),
                      day
                    )
                  ).format("DD-MM-YYYY"),
                  from,
                  to
                ) ||
                (allowedDayArray.length
                  ? !allowedDayArray?.includes(
                      moment(
                        new Date(
                          currentMonth.getFullYear(),
                          currentMonth.getMonth(),
                          day
                        )
                      ).format("ddd")
                    )
                  : false)
                  ? `cursor-not-allowed bg-base-100 text-opacity-40 group border border-base-100 text-gray-500  border-opacity-40 relative`
                  : `${
                      specialDates.some(
                        (obj) =>
                          obj?.date ===
                          moment(
                            new Date(
                              currentMonth.getFullYear(),
                              currentMonth.getMonth(),
                              day
                            )
                          ).format("DD-MM-YYYY")
                      )
                        ? `${
                            specialDates.find(
                              (obj) =>
                                obj?.date ===
                                moment(
                                  new Date(
                                    currentMonth.getFullYear(),
                                    currentMonth.getMonth(),
                                    day
                                  )
                                ).format("DD-MM-YYYY")
                            )?.textColor
                          }  ${
                            specialDates.find(
                              (obj) =>
                                obj?.date ===
                                moment(
                                  new Date(
                                    currentMonth.getFullYear(),
                                    currentMonth.getMonth(),
                                    day
                                  )
                                ).format("DD-MM-YYYY")
                            )?.isDisabled
                              ? `cursor-not-allowed  group border `
                              : `cursor-pointer`
                          } ${
                            specialDates.find(
                              (obj) =>
                                obj?.date ===
                                moment(
                                  new Date(
                                    currentMonth.getFullYear(),
                                    currentMonth.getMonth(),
                                    day
                                  )
                                ).format("DD-MM-YYYY")
                            )?.borderColor
                          } relative`
                        : `${
                            moment(
                              new Date(
                                currentMonth.getFullYear(),
                                currentMonth.getMonth(),
                                day
                              )
                            ).format("DD-MM-YYYY") ===
                            moment(new Date()).format("DD-MM-YYYY")
                              ? "bg-primary"
                              : ""
                          } cursor-pointer ${
                            selectedDate
                              ? selectedDate &&
                                selectedDate.getDate() === day &&
                                selectedDate.getMonth() ===
                                  currentMonth.getMonth() &&
                                selectedDate.getFullYear() ===
                                  currentMonth.getFullYear()
                                ? "bg-primary text-base-300 border-primary"
                                : "bg-gray-500  bg-opacity-40 border-gray-500 border-opacity-40 hover:border-primary hover:bg-primary-content"
                              : new Date(moment(value, "DD-MM-YYYY")) &&
                                  new Date(
                                    moment(value, "DD-MM-YYYY")
                                  ).getDate() === day &&
                                  new Date(
                                    moment(value, "DD-MM-YYYY")
                                  ).getMonth() === currentMonth.getMonth() &&
                                  new Date(
                                    moment(value, "DD-MM-YYYY")
                                  ).getFullYear() === currentMonth.getFullYear()
                                ? "bg-primary text-base-300 border-primary"
                                : "bg-gray-500  bg-opacity-40 border-gray-500 border-opacity-40 hover:border-primary hover:bg-primary-content"
                          }
                  ${
                    today.getFullYear() === currentMonth.getFullYear() &&
                    today.getDate() === day &&
                    today.getMonth() === currentMonth.getMonth()
                  }`
                    }  border-2
              `
              } `}
              onClick={(event) => {
                event.preventDefault();
                isDateInRange(
                  moment(
                    new Date(
                      currentMonth.getFullYear(),
                      currentMonth.getMonth(),
                      day
                    )
                  ).format("DD-MM-YYYY"),
                  from,
                  to
                ) &&
                  !specialDates.find(
                    (obj) =>
                      obj?.date ===
                      moment(
                        new Date(
                          currentMonth.getFullYear(),
                          currentMonth.getMonth(),
                          day
                        )
                      ).format("DD-MM-YYYY")
                  )?.isDisabled &&
                  handleDateClick(
                    new Date(
                      currentMonth.getFullYear(),
                      currentMonth.getMonth(),
                      day
                    )
                  );
              }}
              data-auto={`click-${dataAuto}`}
            >
              {day}
            </button>
          )
        )}
        {/* EMPTY  */}
        {Array.from({
          length: 11 - Array.from({ length: adjustedFirstDayIndex })?.length
        }).map((_, index) => (
          <div
            key={`empty-${index}`}
            className={`p-2 ${small ? "h-7 w-7" : "md:h-10 md:w-10 h-7 w-7"}`}
          ></div>
        ))}
      </div>
    );
  };
  const [allYear, setAllYear] = useState(
    Array.from(
      {
        length:
          parseInt(formatDate(currentMonth, "yyyy")) +
          11 -
          parseInt(formatDate(currentMonth, "yyyy")) +
          1
      },
      (_, index) => parseInt(formatDate(currentMonth, "yyyy")) + index
    )
  );
  const [startYear, setStartYear] = useState(
    parseInt(formatDate(currentMonth, "yyyy"))
  );
  const [endYear, setEndYear] = useState(
    parseInt(formatDate(currentMonth, "yyyy")) + 11
  );
  useEffect(() => {
    setStartYear(parseInt(formatDate(currentMonth, "yyyy")));
    setEndYear(parseInt(formatDate(currentMonth, "yyyy")) + 11);
    setAllYear(
      Array.from(
        {
          length:
            parseInt(formatDate(currentMonth, "yyyy")) +
            11 -
            parseInt(formatDate(currentMonth, "yyyy")) +
            1
        },
        (_, index) => parseInt(formatDate(currentMonth, "yyyy")) + index
      )
    );
  }, [currentMonth]);
  return (
    <OutsideClickHandler
      onOutsideClick={() => {
        setStep("day");
        setDatePickerActive(false);
      }}
      className={`relative ${wrapperClassName}`}
      dataAuto={`container-${dataAuto}`}
    >
      {selectedDate ? (
        <>
          {!disabled && (
            <button
              data-auto={`custom-date-picker-reset-button-all-page`}
              data-tip="reset"
              className={`tooltip tooltip-bottom absolute right-2 ${
                label ? "top-[50px]" : "top-[14px]"
              } text-xl text-primary `}
              onClick={(event) => {
                event.preventDefault();
                setSelectedDate(null);
                onChange("");
              }}
            >
              <BiReset />
            </button>
          )}
        </>
      ) : (
        <>
          {!disabled && (
            <button
              data-auto={`custom-date-picker-calendar-button-all-page`}
              data-tip="calender"
              className={`tooltip tooltip-bottom absolute right-2 ${
                label ? "top-[50px]" : "top-[14px]"
              } text-xl text-primary `}
              onClick={(event) => {
                event.preventDefault();
                !disabled && handleInputClick;
              }}
            >
              <FaRegCalendarAlt />
            </button>
          )}
        </>
      )}
      {/* LABEL */}
      {label && (
        <label data-auto={`label-${dataAuto}`} htmlFor={id} className="label">
          <span className="label-text text-md font-bold">
            {label}{" "}
            {!disabled && required && (
              <span className="text-error font-bold text-md">*</span>
            )}
          </span>
        </label>
      )}
      {/* FIELD  */}
      <input
        data-auto={`${dataAuto}`}
        disabled={disabled}
        id={id}
        type={"text"}
        name={name}
        defaultValue={
          defaultValue ? formatDate(new Date(defaultValue), format) : ""
        }
        placeholder={`${placeholder}${required ? "*" : ""}`}
        className={`bg-base-300 ${
          disabled
            ? `${
                visibleBorder && "disabled:border-gray-200 border-opacity-10"
              } disabled:text-black`
            : ""
        }  focus:outline-primary input rounded-md input-bordered w-full ${fieldClassName}`}
        value={
          selectedDate
            ? formatDate(selectedDate, format)
            : value
              ? formatDate(new Date(moment(value, "DD-MM-YYYY")), format)
              : ""
        }
        onClick={!disabled && handleInputClick}
        readOnly
      />
      {/* VALIDATION MESSAGE  */}
      {error && (
        <label
          data-auto={`custom-date-picker-error-message-all-page`}
          className="label h-7 mt-2"
        >
          <span className="label-text-alt text-error">{error}</span>
        </label>
      )}
      {isDatePickerActive && !disabled && (
        <div
          style={{
            zIndex: 50
          }}
          className={`${top ? "bottom-full -mb-6" : "top-full mt-2"} ${
            right ? "right-0" : "left-0"
          } bg-base-300 border border-primary-content absolute rounded-xl ${
            small
              ? "md:w-[250px]  px-3  py-3"
              : "md:w-[350px] px-3 md:px-5   md:py-5"
          } w-[250px] text-sm`}
          data-auto="date-picker-container"
        >
          {/* hinComponent */}
          {hint && (
            <>
              <button
                data-auto={`custom-date-picker-hint-button-all-page`}
                className="tooltip tooltip-primary  absolute right-1 top-1"
                onClick={() =>
                  document.getElementById("my_modal_1").showModal()
                }
                data-tip="details"
              >
                <IoMdInformationCircle className={`text-primary text-2xl`} />
              </button>
              <dialog id="my_modal_1" className="modal">
                <div
                  data-auto={`custom-date-picker-dialog-all-page`}
                  className="modal-box"
                >
                  <ColorIndicatorDetails />
                  <div className="modal-action">
                    <form method="dialog">
                      {/* if there is a button in form, it will close the modal */}
                      <button
                        data-auto={`custom-date-picker-close-dialog-button-all-page`}
                        className="btn btn-primary"
                      >
                        Close
                      </button>
                    </form>
                  </div>
                </div>
              </dialog>
            </>
          )}
          <div className="" data-auto="date-picker-header">
            {step === "day" && (
              <div
                data-auto={"date-picker-header-container"}
                className="mb-4 flex justify-between items-center pt-7 md:pt-0"
              >
                <button
                  data-auto={`custom-date-picker-day-step-button-all-page`}
                  className="text-lg w-7 md:w-10 h-7 md:h-10 hover:text-base-300 bg-base-300 rounded-full text-accent hover:bg-primary font-bold cursor-pointer"
                  onClick={(event) => {
                    event.preventDefault();
                    handleMonthChange(subMonths(currentMonth, 1));
                  }}
                >
                  {"<"}
                </button>
                <p
                  data-auto={"date-picker-month-year-select"}
                  className="text-lg font-bold flex items-center gap-2"
                >
                  <button
                    data-auto={`custom-date-picker-month-step-button-all-page`}
                    onClick={() => {
                      setStep("month");
                    }}
                  >
                    {formatDate(currentMonth, "MMMM")}
                  </button>
                  <button
                    data-auto={`custom-date-picker-year-step-button-all-page`}
                    onClick={() => {
                      setStep("year");
                    }}
                  >
                    {formatDate(currentMonth, "yyyy")}
                  </button>
                </p>
                <button
                  data-auto={`custom-date-picker-day-step-change-button-all-page`}
                  className="text-lg w-7 md:w-10 h-7 md:h-10 hover:text-base-300 bg-base-300 rounded-full text-accent hover:bg-primary font-bold cursor-pointer"
                  onClick={(event) => {
                    event.preventDefault();
                    handleMonthChange(addMonths(currentMonth, 1));
                  }}
                >
                  {">"}
                </button>
              </div>
            )}
          </div>
          <>
            {step === "month" && (
              <>
                <h3
                  data-cy={"month_step_header_custom_date_picker"}
                  className={`text-center mb-2 text-primary text-lg font-medium`}
                >
                  Select Month
                </h3>
                <div
                  className={`grid grid-cols-3 gap-1`}
                  data-auto={`date-picker-month-container`}
                >
                  <button
                    data-auto={``}
                    onClick={() => {
                      handleMonthChange(selectMonth(currentMonth, 0));
                    }}
                    className={`btn btn-primary btn-outline text-xs w-18`}
                  >
                    January
                  </button>
                  <button
                    data-auto={`custom-date-picker-month-step-feb-button-all-page`}
                    onClick={() => {
                      handleMonthChange(selectMonth(currentMonth, 1));
                    }}
                    className={`btn btn-primary btn-outline text-xs w-18`}
                  >
                    February
                  </button>
                  <button
                    data-auto={`custom-date-picker-month-step-mar-button-all-page`}
                    onClick={() => {
                      handleMonthChange(selectMonth(currentMonth, 2));
                    }}
                    className={`btn btn-primary btn-outline text-xs w-18`}
                  >
                    March
                  </button>
                  <button
                    data-auto={`custom-date-picker-month-step-apr-button-all-page`}
                    onClick={() => {
                      handleMonthChange(selectMonth(currentMonth, 3));
                    }}
                    className={`btn btn-primary btn-outline text-xs w-18`}
                  >
                    April
                  </button>
                  <button
                    data-auto={`custom-date-picker-month-step-may-button-all-page`}
                    onClick={() => {
                      handleMonthChange(selectMonth(currentMonth, 4));
                    }}
                    className={`btn btn-primary btn-outline text-xs w-18`}
                  >
                    May
                  </button>
                  <button
                    data-auto={`custom-date-picker-month-step-june-button-all-page`}
                    onClick={() => {
                      handleMonthChange(selectMonth(currentMonth, 5));
                    }}
                    className={`btn btn-primary btn-outline text-xs w-18`}
                  >
                    June
                  </button>
                  <button
                    data-auto={`custom-date-picker-month-step-july-button-all-page`}
                    onClick={() => {
                      handleMonthChange(selectMonth(currentMonth, 6));
                    }}
                    className={`btn btn-primary btn-outline text-xs w-18`}
                  >
                    July
                  </button>
                  <button
                    data-auto={`custom-date-picker-month-step-aug-button-all-page`}
                    onClick={() => {
                      handleMonthChange(selectMonth(currentMonth, 7));
                    }}
                    className={`btn btn-primary btn-outline text-xs w-18`}
                  >
                    August
                  </button>
                  <button
                    data-auto={`custom-date-picker-month-step-sep-button-all-page`}
                    onClick={() => {
                      handleMonthChange(selectMonth(currentMonth, 8));
                    }}
                    className={`btn btn-primary btn-outline text-xs w-18`}
                  >
                    September
                  </button>
                  <button
                    data-auto={`custom-date-picker-month-step-oct-button-all-page`}
                    onClick={() => {
                      handleMonthChange(selectMonth(currentMonth, 9));
                    }}
                    className={`btn btn-primary btn-outline text-xs w-18`}
                  >
                    October
                  </button>
                  <button
                    data-auto={`custom-date-picker-month-step-nov-button-all-page`}
                    onClick={() => {
                      handleMonthChange(selectMonth(currentMonth, 10));
                    }}
                    className={`btn btn-primary btn-outline text-xs w-18`}
                  >
                    November
                  </button>
                  <button
                    data-auto={`custom-date-picker-month-step-dec-button-all-page`}
                    onClick={() => {
                      handleMonthChange(selectMonth(currentMonth, 11));
                    }}
                    className={`btn btn-primary btn-outline text-xs w-18`}
                  >
                    December
                  </button>
                </div>
              </>
            )}
            {step === "day" && (
              <>{isDatePickerActive && !disabled && renderCalendar()}</>
            )}
            {step === "year" && (
              <>
                {
                  <div data-auto={"date-picker-year-container"}>
                    <div
                      data-auto={"date-picker-year-header"}
                      className="mb-4 flex justify-between items-center"
                    >
                      <button
                        data-auto={`custom-date-picker-year-left-button-all-page`}
                        className="text-lg w-10 h-10 bg-base-300 rounded-full text-accent hover:bg-primary font-bold cursor-pointer"
                        onClick={(event) => {
                          event.preventDefault();
                          handleChangeYear(startYear - 12, startYear - 1);
                        }}
                      >
                        {"<"}
                      </button>
                      <p
                        data-auto={`custom-date-picker-current-year-all-page`}
                        className="text-lg font-bold flex items-center gap-2"
                      >
                        {formatDate(currentMonth, "yyyy")}
                      </p>
                      <button
                        data-auto={`custom-date-picker-year-right-button-all-page`}
                        className="text-lg w-10 h-10 bg-base-300 rounded-full text-accent hover:bg-primary font-bold cursor-pointer"
                        onClick={(event) => {
                          event.preventDefault();
                          handleChangeYear(startYear + 12, endYear + 12);
                        }}
                      >
                        {">"}
                      </button>
                    </div>
                    <div
                      data-auto={"date-picker-year-select"}
                      className={`grid grid-cols-3 gap-1`}
                    >
                      {allYear.map((year, i) => (
                        <button
                          data-auto={`custom-date-picker-all-year-button-${
                            i + 1
                          }-all-page`}
                          key={i}
                          disabled={
                            (isNaN(from) &&
                              year < moment(from, "DD-MM-YYYY").year()) ||
                            (isNaN(to) &&
                              year > moment(to, "DD-MM-YYYY").year())
                          }
                          onClick={() => {
                            if (
                              !(
                                isNaN(from) &&
                                year < moment(from, "DD-MM-YYYY").year()
                              ) ||
                              !(
                                isNaN(from) &&
                                year > moment(to, "DD-MM-YYYY").year()
                              )
                            ) {
                              handleMonthChange(setYear(currentMonth, year));
                            }
                          }}
                          className={`btn btn-primary ${
                            parseInt(formatDate(currentMonth, "yyyy")) === year
                              ? ""
                              : "btn-outline"
                          }  text-xs w-18`}
                        >
                          {year}
                        </button>
                      ))}
                    </div>
                  </div>
                }
              </>
            )}
          </>
        </div>
      )}
    </OutsideClickHandler>
  );
};

// PROPS TYPES
CustomDatePicker.propTypes = {
  hint: PropTypes.string,
  specialDates: PropTypes.array,
  format: PropTypes.string,
  defaultDate: PropTypes.string,
  fieldClassName: PropTypes.string,
  id: PropTypes.string,
  label: PropTypes.string,
  required: PropTypes.bool,
  name: PropTypes.string,
  value: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  error: PropTypes.string,
  defaultValue: PropTypes.string,
  wrapperClassName: PropTypes.string,
  top: PropTypes.bool,
  right: PropTypes.bool,
  allowedDayArray: PropTypes.array,
  disabled: PropTypes.bool,
  from: PropTypes.string,
  to: PropTypes.string,
  calenderStartFrom: PropTypes.number,
  visibleBorder: PropTypes.bool,
  small: PropTypes.bool,
  dataAuto: PropTypes.string
};

const getWeekDays = (calenderStartFrom) => {
  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  // Ensure calenderStartFrom is within valid range (0-6)
  if (calenderStartFrom < 0 || calenderStartFrom > 6) {
    throw new Error("calenderStartFrom must be between 0 and 6");
  }
  // Rearrange the days starting from the given index
  return [
    ...weekDays.slice(calenderStartFrom),
    ...weekDays.slice(0, calenderStartFrom)
  ];
};
CustomDatePicker.propTypes = {
  format: PropTypes.string,
  defaultDate: PropTypes.instanceOf(Date)
};
export default CustomDatePicker;
