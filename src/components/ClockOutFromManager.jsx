import {
  clockOutByEmployee,
  clockOutByOwner
} from "@/apis/attendence/attendence.js";
import { handleApiError } from "@/utils/apiErrorHandler.jsx";
import { convertTo24HourFormat } from "@/utils/convertTo24HourFormat.js";
import moment from "moment";
import PropTypes from "prop-types";
import { useState } from "react";
import toast from "react-hot-toast";
import CustomToaster from "./CustomToaster.jsx";
import CustomDatePicker from "./InputFields/CustomDatePicker.jsx";
import CustomTextareaField from "./InputFields/CustomTextareaField.jsx";
import CustomTimePicker from "./InputFields/CustomTimePicker.jsx";
import ButtonSpinner from "./Loaders/ButtonSpinner.jsx";

export default function ClockOutFromManager({
  popupOption,
  handleClosePopup,
  setIsUpdating,
  isEmployee = false
}) {
  const [isApproving, setIsApproving] = useState(false);
  const [resetTime, setResetTime] = useState();
  const [formData, setFormData] = useState({
    id: popupOption?.data?.id,
    user_id: popupOption?.data?.user_id,
    out_time: moment(
      popupOption?.data?.attendance_records?.at(-1)?.in_time,
      "DD-MM-YYYY HH:mm:ss"
    ).format("HH:mm:ss"),
    note: ""
  });

  const [dateAndTime, setDateAndTime] = useState({
    date: moment().format("DD-MM-YYYY"),
    time: moment().format("HH:mm:ss"),
    clockInDate: moment(
      popupOption?.data?.attendance_records?.at(-1)?.in_time,
      "DD-MM-YYYY HH:mm:ss"
    ).format("DD-MM-YYYY")
  });

  const [errors, setErrors] = useState();

  const validateForm = () => {
    const newErrors = {};
    if (!dateAndTime.date) {
      newErrors.date = "Date is required";
    }

    if (!dateAndTime.time) {
      newErrors.time = "Time is required";
    }

    if (!formData.note) {
      newErrors.note = "Note is required";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      setIsApproving(true);
      if (isEmployee) {
        clockOutByEmployee({
          ...formData,
          out_time: `${dateAndTime?.date} ${dateAndTime?.time}`,
          note: `Reason: ${formData?.note}`,
          attendance_id: popupOption?.data?.id,
          attendance_record_id:
            popupOption?.data?.attendance_records?.at(-1)?.id
        })
          .then(() => {
            setIsApproving(false);
            toast.custom((t) => (
              <CustomToaster
                t={t}
                type={"success"}
                text={`Clocked out successfully.`}
              />
            ));
            setIsUpdating(Math.random());
            handleClosePopup();
          })
          .catch((error) => {
            handleApiError(error);
            setIsApproving(false);
          });
      } else {
        clockOutByOwner({
          ...formData,
          out_time: `${dateAndTime?.date} ${dateAndTime?.time}`,
          note: `Reason: ${formData?.note}`,
          is_clocked_out_by_manager: 1
        })
          .then(() => {
            setIsApproving(false);
            toast.custom((t) => (
              <CustomToaster
                t={t}
                type={"success"}
                text={`Clocked out successfully.`}
              />
            ));
            setIsUpdating(Math.random());
            handleClosePopup();
          })
          .catch((error) => {
            handleApiError(error);
            setIsApproving(false);
          });
      }
    }
  };

  const lastInTime = popupOption?.data?.attendance_records?.at(-1)?.in_time;
  const parsedTime = moment(lastInTime, "DD-MM-YYYY HH:mm:ss");

  return (
    <div className={`w-full`}>
      <div className={`overflow-x-hidden overflow-y-auto p-1`}>
        <div className={`grid grid-cols-1 md:grid-cols-2 gap-5`}>
          <CustomDatePicker
            required
            id="out_date"
            name="out_date"
            label="Clock Out Date"
            placeholder="Clock Out date"
            from={moment(lastInTime, "DD-MM-YYYY HH:mm:ss").format(
              "DD-MM-YYYY"
            )}
            to={
              moment().isSame(parsedTime, "day")
                ? moment(lastInTime, "DD-MM-YYYY HH:mm:ss")?.format(
                    "DD-MM-YYYY"
                  )
                : moment(lastInTime, "DD-MM-YYYY HH:mm:ss")
                    .add(1, "day")
                    .format("DD-MM-YYYY")
            }
            value={dateAndTime?.date}
            onChange={(e) => {
              setErrors({
                ...errors,
                date: ""
              });
              setDateAndTime({
                ...dateAndTime,
                date: e,
                time: ""
              });
              setResetTime(Math.random());
            }}
            error={errors?.date}
          />

          <CustomTimePicker
            right
            error={errors?.time}
            required
            id="out_time"
            name="out_time"
            resetTime={resetTime}
            minTime={
              moment(dateAndTime?.clockInDate, "DD-MM-YYYY")?.isSame(
                moment(dateAndTime?.date, "DD-MM-YYYY")
              )
                ? moment(
                    popupOption?.data?.attendance_records?.at(-1)?.in_time,
                    "DD-MM-YYYY HH:mm:ss"
                  ).format("HH:mm:ss")
                : ""
            }
            label="Clock Out Time"
            value={dateAndTime?.time}
            onChange={(e) => {
              setErrors({
                ...errors,
                time: ""
              });
              setDateAndTime({
                ...dateAndTime,
                time: convertTo24HourFormat(e)
              });
            }}
          />
        </div>
        <CustomTextareaField
          required
          value={formData?.note}
          disable={false}
          error={errors?.note}
          fieldClassName={"w-full"}
          id={"note"}
          label={"Note"}
          name={"note"}
          onChange={(e) => {
            setErrors({
              ...errors,
              note: ""
            });
            setFormData({
              ...formData,
              note: e?.target?.value
            });
          }}
          placeholder={"Enter note"}
          type={"text"}
          wrapperClassName={"w-full"}
          maxLength={500}
          dataAuto={`note-clock-out-by-manager`}
        />
      </div>
      {/* SUBMIT BUTTON  */}
      <div className="sticky bottom-0 bg-base-300 py-5 z-[1000] flex flex-col md:flex-row w-full justify-center md:justify-end items-center mt-5 gap-2">
        <button
          data-auto={`note-view-close-button-view-employee`}
          onClick={handleClosePopup}
          className="btn w-full md:w-32 btn-outline btn-primary"
        >
          Cancel
        </button>
        <button
          disabled={isApproving}
          data-auto={`note-view-close-button-view-employee`}
          onClick={handleSubmit}
          className="btn w-full md:w-32 btn-primary"
        >
          {isApproving ? (
            <ButtonSpinner />
          ) : isEmployee ? (
            "Request Clock Out"
          ) : (
            "Clock Out"
          )}
        </button>
      </div>
    </div>
  );
}

ClockOutFromManager.propTypes = {
  popupOption: PropTypes.object,
  handleClosePopup: PropTypes.func,
  setIsUpdating: PropTypes.func,
  isEmployee: PropTypes.bool
};
