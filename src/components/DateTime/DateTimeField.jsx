import moment from "moment";
import "moment-timezone";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";

export default function DateTimeField({
  id = "date-picker",
  disabled = false,
  visibleBorder = true,
  fieldClassName = "",
  format = "DD-MM-YYYY",
  minDate = "01-01-1900",
  maxDate = "31-12-3000",
  value = "",
  onError = (e) => e,
  setSelectedDate,
  dataAuto = "",
  selectMonth,
  currentMonth,
  handleMonthOrYearChange,
  setSelectedYear,
  setDatePickerActive
}) {
  // DEBOUNCE FUNCTIONALITY
  const debounce = (func, delay) => {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => func(...args), delay);
    };
  };

  const updateSelectedDate =
    // debounce(
    (dateString) => {
      setSelectedDate(new Date(moment(dateString, "DD-MM-YYYY")));
    };
  // , 300);

  const MIN_DATE = moment(minDate, format); // moment("1900-01-01");
  const MAX_DATE = moment(maxDate, format); // moment("3000-12-31");

  const [day, setDay] = useState("DD");
  const [month, setMonth] = useState("MM");
  const [year, setYear] = useState("YYYY");

  // SET DEFAULT VALUE
  useEffect(() => {
    console.log({ value });

    if (value) {
      const date = moment(value, format);
      setDay(date.format("DD"));
      setMonth(date.format("MM"));
      setYear(date.format("YYYY"));
    }
    // else {
    //   setDay("DD");
    //   setMonth("MM");
    //   setYear("YYYY");
    // }
  }, [value]);

  // ON CLICK FULL TEXT SELECT
  const handleClick = (e) => {
    setDatePickerActive(false);
    e.target.select(); // Auto-select the input day when clicked
  };

  //   HANDLE CHANGE DAY
  const handleChangeDay = (e, nextId) => {
    let inputValue = e.target.value || ""; // Safely get the day or fallback to an empty string

    inputValue = inputValue.replace(/[^0-9]/g, ""); // Remove any non-numeric characters

    if (inputValue.length === 1) {
      inputValue = `0${inputValue}`; // Add leading zero for single digits
    } else if (inputValue.length > 2) {
      inputValue = inputValue.slice(-2); // Keep only the last two digits
    }

    const numericValue = parseInt(inputValue, 10);

    // Restrict day between 01 and 31
    if (numericValue > 31) {
      inputValue = `0${inputValue.slice(-1)}`; // Set day to last typed digit with leading zero
    }

    const nextInput = document.querySelector(`#${nextId}`);
    if (inputValue > 3) {
      nextInput.select();
    }

    if (inputValue !== "") {
      setDay(inputValue);
    } else {
      setDay("DD");
    }
  };

  //   HANDLE CHANGE MONTH
  const handleChangeMonth = (e, nextId) => {
    let inputValue = e.target.value || ""; // Safely get the month or fallback to an empty string

    inputValue = inputValue.replace(/[^0-9]/g, ""); // Remove any non-numeric characters

    if (inputValue.length === 1) {
      inputValue = `0${inputValue}`; // Add leading zero for single digits
    } else if (inputValue.length > 2) {
      inputValue = inputValue.slice(-2); // Keep only the last two digits
    }

    const numericValue = parseInt(inputValue, 10);

    // Restrict month between 01 and 31
    if (numericValue > 12) {
      inputValue = `0${inputValue.slice(-1)}`; // Set month to last typed digit with leading zero
    }

    const nextInput = document.querySelector(`#${nextId}`);
    if (inputValue > 1) {
      nextInput.select();
    }

    if (inputValue !== "") {
      handleMonthOrYearChange(
        selectMonth(currentMonth, parseInt(inputValue - 1))
      );

      setMonth(inputValue);
    } else {
      setMonth("MM");
    }
  };

  //   HANDLE CHANGE YEAR
  const handleChangeYear = (e) => {
    let inputValue = e.target.value || ""; // Safely get the month or fallback to an empty string
    inputValue = inputValue.replace(/[^0-9]/g, ""); // Remove any non-numeric characters

    if (inputValue.length === 1) {
      inputValue = `000${inputValue}`; // Add leading zero for single digits
    } else if (inputValue.length > 4) {
      inputValue = inputValue.slice(-4); // Keep only the last two digits
    }

    // Restrict year between 0000 and 9999
    if (inputValue === "0000") {
      inputValue = "0001";
    }

    if (inputValue !== "") {
      handleMonthOrYearChange(
        setSelectedYear(currentMonth, parseInt(inputValue))
      );

      setTimeout(() => setYear(inputValue), 1);
    } else {
      setTimeout(() => setYear("YYYY"), 1);
    }
  };

  //   VALIDATE DATE
  const [errorMessages, setErrorMessages] = useState("");
  const checkValidation = (dateString) => {
    setErrorMessages("");

    // Parse the date with the specified format
    const date = moment(dateString, "DD-MM-YYYY", true); // true for strict parsing

    // Check if the date is valid
    if (!date.isValid()) {
      setErrorMessages("Please enter a valid date");
      return false;
    }

    // Check if the date is within the specified range
    if (!date.isBetween(MIN_DATE, MAX_DATE, null, "[]")) {
      setErrorMessages(`Please enter a date between ${minDate} and ${maxDate}`);
      setSelectedDate(null);
    }

    return date.isBetween(MIN_DATE, MAX_DATE, null, "[]");
  };

  useEffect(() => {
    onError(errorMessages);
  }, [errorMessages]);

  useEffect(() => {
    if (day !== "DD" && month !== "MM" && year !== "YYYY") {
      if (checkValidation(`${day}-${month}-${year}`)) {
        // Define the input date string and format
        const dateString = `${day}-${month}-${year}`;

        // Set the formatted date in the state
        if (value !== dateString) {
          updateSelectedDate(dateString);
        }
      }
    }
  }, [day, month, year]);

  return (
    <>
      <div
        data-auto={`container-${dataAuto}`}
        id={id}
        className={`bg-base-300 ${
          disabled
            ? `${visibleBorder && "disabled:border-gray-200 border-opacity-10"}`
            : ""
        } input rounded-md input-bordered w-full ${fieldClassName} flex focus-within:outline-primary`}
      >
        <div className={`flex items-center`}>
          <input
            disabled={disabled}
            data-auto={`${dataAuto}-day`}
            value={day}
            onClick={handleClick}
            onChange={(e) => handleChangeDay(e, `${id}_month`)}
            id={`${id}_day`}
            type="text"
            className={`col-span-3 bg-transparent inline w-[1.5rem] text-center  h-full`}
          />
          <span className={`flex justify-center items-center bg`}>/</span>
          <input
            disabled={disabled}
            data-auto={`${dataAuto}-month`}
            value={month}
            onClick={handleClick}
            onChange={(e) => handleChangeMonth(e, `${id}_year`)}
            id={`${id}_month`}
            type="text"
            className={`col-span-3 bg-transparent inline w-7 text-center  h-full`}
          />
          <span className={`flex justify-center items-center bg`}>/</span>
          <input
            disabled={disabled}
            data-auto={`${dataAuto}-year`}
            value={year}
            onClick={handleClick}
            onChange={handleChangeYear}
            id={`${id}_year`}
            type="text"
            className={`col-span-3 bg-transparent inline w-10 text-center  h-full`}
          />
        </div>
      </div>
    </>
  );
}

DateTimeField.propTypes = {
  id: PropTypes.string,
  disabled: PropTypes.bool,
  visibleBorder: PropTypes.bool,
  fieldClassName: PropTypes.string,
  format: PropTypes.string,
  minDate: PropTypes.string,
  maxDate: PropTypes.string,
  value: PropTypes.string,
  onError: PropTypes.func,
  setSelectedDate: PropTypes.func.isRequired,
  dataAuto: PropTypes.string,
  selectMonth: PropTypes.func.isRequired,
  currentMonth: PropTypes.object.isRequired,
  handleMonthOrYearChange: PropTypes.func.isRequired,
  setSelectedYear: PropTypes.func.isRequired,
  setDatePickerActive: PropTypes.func.isRequired
};
