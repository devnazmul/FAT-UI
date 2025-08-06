import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { BiReset } from "react-icons/bi";
import { FiMinus, FiPlus } from "react-icons/fi";
import { convertTo12HourFormat } from "../../utils/convertTo12HourFormat";
import { convertTo24HourFormat } from "../../utils/convertTo24HourFormat";
import { OutsideClickHandler } from "../OutsideClickHandler";

export default function CustomTimePicker({
  id,
  extraMessageClass = "",
  label,
  required = false,
  name,
  value = "",
  placeholder = "pick a time",
  onChange = (e) => e,
  error,
  minTime,
  maxTime,
  defaultValue,
  disable = false,
  wrapperClassName,
  fieldClassName,
  visibleBorder = false,
  right = false,
  minStep = 1,
  dataAuto,
  isSeparatelyEditable = false,
  extraError = "",
  isResetAble = true,
  extraMessage = "",
  resetTime
}) {
  const [selectedHour, setSelectedHour] = useState(
    value ? parseInt(convertTo12HourFormat(value, 30)?.split(":")[0]) : 0
  );
  const [selectedMin, setSelectedMin] = useState(
    value
      ? parseInt(convertTo12HourFormat(value, 34)?.split(":")[1]?.split(" ")[0])
      : 0
  );
  const [selectedAmOrPm, setSelectedAmOrPm] = useState(
    value
      ? convertTo12HourFormat(value, 38)?.split(":")[1]?.split(" ")[1]
      : "AM"
  );
  const [openTimeSelector, setOpenTimeSelector] = useState(false);
  const [isInitial, setIsInitial] = useState(true);

  // UPDATE STATE
  useEffect(() => {
    if (value) {
      setSelectedHour(
        parseInt(convertTo12HourFormat(value, 47)?.split(":")[0])
      );
      setSelectedMin(
        parseInt(convertTo12HourFormat(value, 49).split(":")[1]?.split(" ")[0])
      );
      setSelectedAmOrPm(
        convertTo12HourFormat(value, 52)?.split(":")[1]?.split(" ")[1]
      );
    }
  }, [value]);

  // HOUR CHANGE
  const increaseHour = () => {
    if (selectedHour < 12) {
      if (selectedHour === 11) {
        setSelectedAmOrPm(selectedAmOrPm === "AM" ? "PM" : "AM");
      }
      setSelectedHour(selectedHour + 1);
    } else {
      setSelectedHour(1);
    }
    setIsInitial(false);
  };

  const decreaseHour = () => {
    if (selectedHour > 1) {
      if (selectedHour === 12) {
        setSelectedAmOrPm(selectedAmOrPm === "AM" ? "PM" : "AM");
      }
      setSelectedHour(selectedHour - 1);
    } else {
      setSelectedHour(12);
    }
    setIsInitial(false);
  };

  // MIN CHANGE
  const increaseMin = () => {
    if (selectedMin < 59 && selectedMin + minStep <= 59) {
      setSelectedMin(selectedMin + minStep);
    } else {
      setSelectedMin(0);
    }
    setIsInitial(false);
  };

  const decreaseMin = () => {
    if (selectedMin > 0 && selectedMin - minStep >= 0) {
      setSelectedMin(selectedMin - minStep);
    } else {
      setSelectedMin(60 - minStep);
    }
    setIsInitial(false);
  };

  const reset = () => {
    setSelectedHour(0);
    setSelectedMin(0);
    setIsInitial(false);
  };

  useEffect(() => {
    if (resetTime) {
      reset();
    }
  }, [resetTime]);

  const [errorForRestrictions, setErrorForRestrictions] = useState("");

  // AFTER SELECT A NEW TIME
  useEffect(() => {
    setErrorForRestrictions("");
    if (!isInitial) {
      if (selectedHour === 0 && selectedMin === 0) {
        onChange("");
      } else {
        const newTime = convertTo24HourFormat(
          `${selectedHour < 10 ? `0${selectedHour}` : selectedHour}:${
            selectedMin < 10 ? `0${selectedMin}` : selectedMin
          } ${selectedAmOrPm}`
        );
        // IF HAVE MIN TIME AND MAX TIME
        if (minTime && maxTime) {
          if (newTime >= minTime && newTime <= maxTime) {
            onChange(
              `${selectedHour < 10 ? `0${selectedHour}` : selectedHour}:${
                selectedMin < 10 ? `0${selectedMin}` : selectedMin
              } ${selectedAmOrPm}`
            );
          } else {
            setErrorForRestrictions(
              "Selected time is outside the allowed range"
            );
            onChange("");
          }
        } else if (minTime && !maxTime) {
          // HAVE MIN TIME ONLY
          if (newTime >= minTime) {
            onChange(
              `${selectedHour < 10 ? `0${selectedHour}` : selectedHour}:${
                selectedMin < 10 ? `0${selectedMin}` : selectedMin
              } ${selectedAmOrPm}`
            );
          } else {
            setErrorForRestrictions(
              "Selected time is outside the allowed range"
            );
            onChange("");
          }
        } else if (!minTime && maxTime) {
          // ONLY HAVE MAX TIME
          if (newTime <= maxTime) {
            onChange(
              `${selectedHour < 10 ? `0${selectedHour}` : selectedHour}:${
                selectedMin < 10 ? `0${selectedMin}` : selectedMin
              } ${selectedAmOrPm}`
            );
          } else {
            setErrorForRestrictions(
              "Selected time is outside the allowed range"
            );
            onChange("");
          }
        } else {
          onChange(
            `${selectedHour < 10 ? `0${selectedHour}` : selectedHour}:${
              selectedMin < 10 ? `0${selectedMin}` : selectedMin
            } ${selectedAmOrPm}`
          );
        }
      }
    }
  }, [selectedAmOrPm, selectedHour, selectedMin]);

  // ON CLICK FULL TEXT SELECT
  const handleClick = (e) => {
    e.target.select(); // Auto-select the input day when clicked
  };

  return (
    <OutsideClickHandler
      onOutsideClick={() => {
        setOpenTimeSelector(false);
      }}
      className={`relative w-full ${wrapperClassName}`}
      dataAuto={`container-${dataAuto}`}
    >
      {/* LABEL */}
      {label ? (
        <label data-auto={`label-${dataAuto}`} htmlFor={id} className="label">
          {label && (
            <span className="label-text text-md font-bold">
              {label}{" "}
              {required && !disable && (
                <span className="text-error font-bold text-md">*</span>
              )}
              {extraMessage && (
                <span className={`${extraMessageClass}`}> {extraMessage}</span>
              )}
            </span>
          )}
        </label>
      ) : (
        ""
      )}

      {/* FIELD  */}
      <div data-auto={`field-container-${dataAuto}`} className={`relative`}>
        <input
          data-auto={`${dataAuto}`}
          onClick={() => {
            setOpenTimeSelector(!openTimeSelector);
          }}
          id={id}
          type="text"
          readOnly
          value={
            isInitial ||
            selectedHour === null ||
            selectedMin === null ||
            (selectedHour === 0 && selectedMin === 0)
              ? value && isInitial
                ? errorForRestrictions
                  ? ""
                  : convertTo12HourFormat(value, 156)
                : ""
              : errorForRestrictions
                ? ""
                : `${selectedHour < 10 ? `0${selectedHour}` : selectedHour}:${
                    selectedMin < 10 ? `0${selectedMin}` : selectedMin
                  } ${selectedAmOrPm}`
          }
          disabled={disable}
          name={name}
          defaultValue={defaultValue}
          placeholder={`${placeholder}${required ? "*" : ""}`}
          className={`focus:outline-primary cursor-pointer bg-base-300  input w-full rounded-md input-bordered ${
            !!errorForRestrictions && "border-red-500"
          } ${
            visibleBorder
              ? `disabled:border-gray-200  border-opacity-10 px-3`
              : ` ${disable ? "px-1" : "px-3"}`
          }  ${fieldClassName}
        `}
        />

        {/* RESET BUTTON  */}
        {!!(isInitial ||
        selectedHour === null ||
        selectedMin === null ||
        (selectedHour === 0 && selectedMin === 0)
          ? value && isInitial
            ? errorForRestrictions
              ? ""
              : convertTo12HourFormat(value, 156)
            : ""
          : errorForRestrictions
            ? ""
            : `${selectedHour < 10 ? `0${selectedHour}` : selectedHour}:${
                selectedMin < 10 ? `0${selectedMin}` : selectedMin
              } ${selectedAmOrPm}`) && (
          <>
            {!disable && isResetAble && (
              <button
                data-auto={`reset-${dataAuto}`}
                data-tip="reset"
                className={`tooltip tooltip-bottom absolute right-2 top-[14px] text-xl text-primary `}
                onClick={reset}
              >
                <BiReset />
              </button>
            )}
          </>
        )}
      </div>

      {/* VALIDATION MESSAGE  */}
      {error && (
        <label data-auto={`error-${dataAuto}`} className="label h-7">
          <span className="label-text-alt text-error">{error}</span>
        </label>
      )}

      {/* TIME PICKER  */}
      <div
        data-auto={`timePicker-container-${dataAuto}`}
        className={`px-2 py-3 mt-2 absolute  border flex flex-col border-primary-content z-50 top-full rounded-md shadow-xl duration-300 items-center bg-base-300  ${
          right ? "right-0" : ""
        }   ${
          openTimeSelector
            ? `h-auto w-[250px] md:w-[300px] opacity-100 flex`
            : `h-0 opacity-0 hidden`
        }`}
      >
        <div className={`flex items-center flex-row gap-4`}>
          {/* CLOCK  */}
          <div className={`flex items-center gap-x-2`}>
            {/* HOURS  */}
            <div
              data-auto={`hours-container-${dataAuto}`}
              className="flex flex-col text-3xl gap-2"
            >
              <button
                data-auto={`hour_plus-${dataAuto}`}
                onClick={increaseHour}
                className={`px-5 py-1 w-20 border bg-slate-100 text-slate-700 rounded-md flex justify-center items-center hover:bg-primary hover:text-base-300 duration-200`}
              >
                <FiPlus className="" />
              </button>
              <input
                data-auto={`hour-input-${dataAuto}`}
                disabled={!isSeparatelyEditable}
                onClick={handleClick}
                type="text"
                className={`px-5 py-1 text-center w-20 border rounded-md bg-transparent outline-none`}
                value={selectedHour < 10 ? `0${selectedHour}` : selectedHour}
              />

              <button
                data-auto={`hour_minus-${dataAuto}`}
                onClick={decreaseHour}
                className={`px-5 py-1 w-20 bg-slate-100 text-slate-700 border rounded-md flex justify-center items-center hover:bg-primary hover:text-base-300 duration-200`}
              >
                <FiMinus className="" />
              </button>
            </div>

            <div className="text-4xl mb-2 mr-0">:</div>

            {/* MINUTES  */}
            <div
              data-auto={`minutes-container-${dataAuto}`}
              className="flex flex-col text-3xl gap-2 items-center justify-center"
            >
              <button
                data-auto={`minute_plus-${dataAuto}`}
                onMouseDown={increaseMin}
                className={`px-5 py-1 bg-slate-100 w-20 text-slate-700 border rounded-md flex justify-center items-center hover:bg-primary hover:text-base-300 duration-200`}
              >
                <FiPlus className="" />
              </button>
              <input
                data-auto={`minute-${dataAuto}`}
                disabled={!isSeparatelyEditable}
                onClick={handleClick}
                type="text"
                className={`px-5 py-1 text-center w-20 border rounded-md bg-transparent outline-none`}
                value={selectedMin < 10 ? `0${selectedMin}` : selectedMin}
              />
              <button
                data-auto={`minute_minus-${dataAuto}`}
                onMouseDown={decreaseMin}
                className={`px-5 py-1 w-20 bg-slate-100 text-slate-700 border rounded-md flex justify-center items-center hover:bg-primary hover:text-base-300 duration-200`}
              >
                <FiMinus className="" />
              </button>
            </div>
          </div>

          {/* AM/PM  */}
          <div
            data-auto={`amPm-container-${dataAuto}`}
            className="grid grid-cols-2 md:grid-cols-1 text-md gap-x-5 md:gap-y-2  w-full md:w-auto relative font-bold"
          >
            {selectedAmOrPm}
          </div>
        </div>

        {extraError && (
          <span className="label-text-alt text-gray-400 text-center mt-2">
            {extraError}
          </span>
        )}

        {/* RANGE  */}
        {!!(
          (minTime && maxTime) ||
          (!minTime && maxTime) ||
          (minTime && !maxTime)
        ) && (
          <div
            data-auto={`error-${dataAuto}`}
            className={`text-xs ${
              errorForRestrictions
                ? "text-red-500 animate-bounce"
                : "text-primary"
            }  flex justify-center items-center mt-1 gap-x-1`}
          >
            {minTime && maxTime && (
              <>
                <span>Allowed from</span>
                <span className={`font-medium`}>
                  {convertTo12HourFormat(minTime)}
                </span>
                <span>to</span>
                <span className={`font-medium`}>
                  {convertTo12HourFormat(maxTime)}
                </span>
              </>
            )}
            {!minTime && maxTime && (
              <>
                Allowed until{" "}
                <span className={`font-medium`}>
                  {convertTo12HourFormat(maxTime)}
                </span>
              </>
            )}
            {minTime && !maxTime && (
              <>
                Allowed after{" "}
                <span className={`font-medium`}>
                  {convertTo12HourFormat(minTime)}
                </span>
              </>
            )}
          </div>
        )}
      </div>
    </OutsideClickHandler>
  );
}

CustomTimePicker.propTypes = {
  extraMessageClass: PropTypes.string,
  extraMessage: PropTypes.string,
  id: PropTypes.any,
  label: PropTypes.string,
  required: PropTypes.bool,
  name: PropTypes.string,
  value: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  error: PropTypes.string,
  minTime: PropTypes.string,
  maxTime: PropTypes.string,
  defaultValue: PropTypes.string,
  disable: PropTypes.bool,
  wrapperClassName: PropTypes.string,
  fieldClassName: PropTypes.string,
  visibleBorder: PropTypes.bool,
  right: PropTypes.bool,
  minStep: PropTypes.number,
  dataAuto: PropTypes.string,
  isSeparatelyEditable: PropTypes.bool,
  extraError: PropTypes.string,
  isResetAble: PropTypes.bool,
  resetTime: PropTypes.bool
};
