import { getOvertime } from "@/constant/getOvertime.js";
import EditSingleTiming from "@/pages/Attendance/EditSingleTiming.jsx";
import { clockInOutDateTimeFormatter } from "@/utils/clockInOutDateTimeFormatter.js";
import { convertFloatHoursToTime } from "@/utils/convertFloatHoursToTime.js";
import { getFullName } from "@/utils/getFullName.js";
import { getTotalTimeInString } from "@/utils/getTotalTime.js";
import moment from "moment";
import momentTZ from "moment-timezone";
import PropTypes from "prop-types";
import { useState } from "react";
import { FaClockRotateLeft } from "react-icons/fa6";
import { MdOutlineStickyNote2 } from "react-icons/md";
import { RiEdit2Fill } from "react-icons/ri";
import NoteViewV2 from "../pages/Attendance/NoteViewV2.jsx";
import { formatText } from "../utils/formatText.js";
import AttendanceRecordMobileComponent from "./AttendanceRecordMobileComponent.jsx";
import ButtonLoading from "./ButtonLoading.jsx";
import ClockOutFromManager from "./ClockOutFromManager.jsx";
import CustomPopup from "./CustomPopup.jsx";
import RecordsTable from "./RecordsTable.jsx";
import StatusButton from "./StatusButtons/StatusButton.jsx";

export default function TimingViewerForActiveEmployee({
  handleClosePopup,
  data,
  workShift,
  fullData,
  editPermission = false,
  setIsUpdating,
}) {
  // POPUP OPTIONS
  const [popupOption, setPopupOption] = useState({
    open: false,
    type: "",
    onClose: () => {
      setPopupOption({ ...popupOption, open: false });
    },
    overlayStyle: { background: "red" },
    closeOnDocumentClick: false,
  });

  const [isApproving, setIsApproving] = useState(false);

  const handleClockOut = (data) => {
    setPopupOption({
      open: true,
      type: "clockOut",
      title: "Clock out",
      onClose: () => {
        setPopupOption({ ...popupOption, open: false });
      },
      closeOnDocumentClick: false,
      data: data,
    });
  };

  const handleViewNote = (note) => {
    setPopupOption({
      open: true,
      type: "viewNote",
      title: "Notes",
      onClose: () => {
        setPopupOption({ ...popupOption, open: false });
      },
      closeOnDocumentClick: false,
      note: note,
    });
  };

  return (
    <div className={`w-full`}>
      {/* POPUP  */}
      <CustomPopup
        popupClasses={`${popupOption?.type === "viewNote" && `lg:w-[95vw]`}`}
        popupOption={popupOption}
        setPopupOption={setPopupOption}
        Component={
          <>
            {/* CLOCK OUT  */}
            {popupOption?.type === "clockOut" && (
              <ClockOutFromManager
                popupOption={popupOption}
                setIsUpdating={setIsUpdating}
                handleClosePopup={() => {
                  setPopupOption({
                    open: false,
                    type: "",
                    id: null,
                    selfId: null,
                    note: "",
                    onClose: () => {
                      setPopupOption({ ...popupOption, open: false });
                    },
                    overlayStyle: { background: "red" },
                    closeOnDocumentClick: false,
                  });
                  setIsApproving(false);
                  handleClosePopup();
                }}
              />
            )}
            {popupOption?.type === "viewNote" && (
              <NoteViewV2
                popupOption={popupOption}
                handleClosePopup={() => {
                  setPopupOption({
                    open: false,
                    type: "",
                    id: null,
                    selfId: null,
                    note: "",
                    onClose: () => {
                      setPopupOption({ ...popupOption, open: false });
                    },
                    overlayStyle: { background: "red" },
                    closeOnDocumentClick: false,
                  });
                  handleClosePopup();
                }}
              />
            )}
            {popupOption?.type === "editRecord" && (
              <EditSingleTiming
                popupOption={popupOption}
                setIsUpdating={setIsUpdating}
                handleClosePopup={() => {
                  setPopupOption({
                    open: false,
                    type: "",
                    id: null,
                    selfId: null,
                    note: "",
                    onClose: () => {
                      setPopupOption({ ...popupOption, open: false });
                    },
                    overlayStyle: { background: "red" },
                    closeOnDocumentClick: false,
                  });
                }}
              />
            )}
          </>
        }
      />

      <div className={`pt-5`}>
        {/* EMPLOYEE NAME  */}
        <p className={`px-5 `}>
          <span className={`font-bold text-primary`}>Employee Name:</span>{" "}
          {getFullName(fullData?.employee)}
        </p>

        {/* DAY DETAILS  */}
        {!!workShift?.name && (
          <div className={`px-5`}>
            <p>
              <span className={`font-bold text-primary`}>Work Shift:</span>{" "}
              {formatText(workShift?.name)}
            </p>
            <p>
              <span className={`font-bold text-primary`}>Total Schedule:</span>{" "}
              {convertFloatHoursToTime(workShift?.detail?.schedule_hour)}
            </p>
          </div>
        )}

        {/* TOTAL WORKED  */}
        <div className={`px-5`}>
          <p>
            <span className={`font-bold text-primary`}>Total Worked:</span>{" "}
            {convertFloatHoursToTime(fullData?.total_paid_hours)}
          </p>
        </div>

        {/* OVERTIME */}
        {getOvertime({
          scheduledHour: workShift?.detail?.schedule_hour,
          workedHour: fullData?.total_paid_hours,
        }) > 0 && (
          <div className={`px-5`}>
            <p>
              <span className={`font-bold text-primary`}>Overtime:</span>{" "}
              {convertFloatHoursToTime(fullData?.overtime_hours)}
            </p>
          </div>
        )}

        {/* UNPAID BREAK  */}
        {!!fullData?.unpaid_break_hours && (
          <div className={`px-5`}>
            <p>
              <span className={`font-bold text-primary`}>Unpaid Break:</span>{" "}
              {convertFloatHoursToTime(fullData?.unpaid_break_hours)}
            </p>
          </div>
        )}

        {/* TOTAL ONGOING  */}
        <div className={`px-5`}>
          <p
            className={`${
              moment(
                data?.find((shift) =>
                  moment(shift?.in_time, "DD-MM-YYYY HH:mm:ss").isSame(
                    moment(shift?.out_time, "DD-MM-YYYY HH:mm:ss")
                  )
                )?.in_time,
                "DD-MM-YYYY HH:mm:ss"
              ).isSame(moment(), "day")
                ? `text-green-500`
                : `text-red-500`
            }`}
          >
            <span className={`font-bold text-primary`}>Total Ongoing:</span>{" "}
            {getTotalTimeInString(
              data
                ?.filter((shift) =>
                  moment(shift?.in_time, "DD-MM-YYYY HH:mm:ss").isSame(
                    moment(shift?.out_time, "DD-MM-YYYY HH:mm:ss")
                  )
                )
                ?.map((shift) => ({
                  start_at: momentTZ
                    .tz(shift?.in_time, "DD-MM-YYYY HH:mm:ss", shift?.time_zone)
                    .format("DD-MM-YYYY HH:mm:ss"),
                  end_at: shift?.out_time
                    ? momentTZ
                        .tz(
                          shift?.in_time,
                          "DD-MM-YYYY HH:mm:ss",
                          shift?.time_zone
                        )
                        .isSame(
                          momentTZ.tz(
                            shift?.out_time,
                            "DD-MM-YYYY HH:mm:ss",
                            shift?.time_zone
                          )
                        )
                      ? momentTZ()
                          .tz(shift?.time_zone)
                          .format("DD-MM-YYYY HH:mm:ss")
                      : momentTZ
                          .tz(
                            shift?.out_time,
                            "DD-MM-YYYY HH:mm:ss",
                            shift?.time_zone
                          )
                          .format("DD-MM-YYYY HH:mm:ss")
                    : momentTZ()
                        .tz(shift?.time_zone)
                        .format("DD-MM-YYYY HH:mm:ss"),
                }))
            )}
          </p>
        </div>

        {/* STATUS  */}
        {fullData?.status ? (
          <p className={`px-5 flex items-center gap-2`}>
            <span className={`font-bold text-primary`}>Status:</span>{" "}
            <div className={`flex items-center gap-2`}>
              <StatusButton d={fullData} />
            </div>
          </p>
        ) : (
          ""
        )}

        <RecordsTable
          data={data?.map((d) => {
            return {
              ...d,
              start_at_t: (
                <span>{clockInOutDateTimeFormatter(d?.in_time)} </span>
              ),
              end_at_t: (
                <span>
                  {moment(d?.in_time, "DD-MM-YYYY HH:mm:ss").isSame(
                    moment(d?.out_time, "DD-MM-YYYY HH:mm:ss")
                  ) ? (
                    <div className={`md:flex flex-col items-center space-y-2`}>
                      <span className={`text-green-500 font-medium`}>
                        Ongoing
                      </span>
                      {editPermission && (
                        <button
                          data-tip="Clock Out"
                          disabled={isApproving}
                          onClick={() => {
                            handleClockOut(fullData);
                          }}
                          className="flex justify-start items-center gap-2 btn btn-xs btn-success text-base-300 tooltip tooltip-success"
                        >
                          {isApproving ? (
                            <ButtonLoading />
                          ) : (
                            <div className={`flex items-center gap-2`}>
                              <FaClockRotateLeft />
                              <p className={`flex items-center gap-1`}>
                                <span>Clock</span>
                                <span>Out</span>{" "}
                              </p>
                            </div>
                          )}
                        </button>
                      )}
                    </div>
                  ) : (
                    <span>{clockInOutDateTimeFormatter(d?.out_time)} </span>
                  )}
                </span>
              ),
              timeZone: (
                <span className={`text-xs text-primary font-medium`}>{`${
                  d?.time_zone
                    ? `UTC${momentTZ.tz(d?.time_zone).format("Z")}`
                    : ""
                }`}</span>
              ),
              total: getTotalTimeInString([
                {
                  start_at: momentTZ
                    .tz(d?.in_time, "DD-MM-YYYY HH:mm:ss", d?.time_zone)
                    .format("DD-MM-YYYY HH:mm:ss"),
                  end_at: d?.out_time
                    ? momentTZ
                        .tz(d?.in_time, "DD-MM-YYYY HH:mm:ss", d?.time_zone)
                        .isSame(
                          momentTZ.tz(
                            d?.out_time,
                            "DD-MM-YYYY HH:mm:ss",
                            d?.time_zone
                          )
                        )
                      ? momentTZ()
                          .tz(d?.time_zone)
                          .format("DD-MM-YYYY HH:mm:ss")
                      : momentTZ
                          .tz(d?.out_time, "DD-MM-YYYY HH:mm:ss", d?.time_zone)
                          .format("DD-MM-YYYY HH:mm:ss")
                    : momentTZ().tz(d?.time_zone).format("DD-MM-YYYY HH:mm:ss"),
                },
              ]),
              break: (
                <span
                  className={`${
                    d?.is_paid_break ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {d?.break_hours
                    ? convertFloatHoursToTime(d?.break_hours)
                    : "N/A"}
                </span>
              ),
              break_type: d?.break_hours
                ? d?.is_paid_break
                  ? "Paid"
                  : "Unpaid"
                : "N/A",
              project:
                d?.projects?.length > 0 ? (
                  <ul
                    className={`${d?.projects?.length > 1 ? "list-disc" : ""}`}
                  >
                    {d?.projects?.map((project, i) => (
                      <li key={i}>{project?.name}</li>
                    ))}
                  </ul>
                ) : (
                  <p>N/A</p>
                ),
              work_site: d?.work_location?.name,
              notes: d?.note ? (
                <button
                  onClick={() => handleViewNote(d?.note)}
                  className={`flex items-center gap-x-2`}
                >
                  <MdOutlineStickyNote2
                    className={`text-xl text-primary cursor-pointer`}
                  />
                  <span className={`text-primary`}>View Note</span>
                </button>
              ) : (
                <p>N/A</p>
              ),
              actions: (
                <div>
                  {moment(d?.in_time, "DD-MM-YYYY HH:mm:ss").isSame(
                    moment(d?.out_time, "DD-MM-YYYY HH:mm:ss")
                  ) ? (
                    ""
                  ) : (
                    <RiEdit2Fill
                      onClick={() =>
                        setPopupOption({
                          open: true,
                          type: "editRecord",
                          title: "Update Record",
                          onClose: () => {
                            setPopupOption({ ...popupOption, open: false });
                          },
                          closeOnDocumentClick: false,
                          fullData,
                          d,
                        })
                      }
                      className={`text-xl text-primary cursor-pointer`}
                    />
                  )}
                </div>
              ),
            };
          })}
          columns={[
            {
              name: "Start At",
              attribute: "start_at_t",
              show: true,
              className: "min-w-[15%]",
            },
            {
              name: "End At",
              attribute: "end_at_t",
              show: true,
              className: "min-w-[15%]",
            },
            {
              name: "Time Zone",
              attribute: "timeZone",
              show: true,
              className: "min-w-[15%]",
            },
            {
              name: "Total",
              attribute: "total",
              show: true,
              className: "min-w-[10%]",
            },
            {
              name: "Break",
              attribute: "break",
              show: true,
              className: "min-w-[10%]",
            },
            {
              name: "Break Type",
              attribute: "break_type",
              show: true,
              className: "min-w-[10%]",
            },
            {
              name: "Project",
              attribute: "project",
              show: true,
              className: "min-w-[20%]",
            },
            {
              name: "Work Site",
              attribute: "work_site",
              show: true,
              className: "min-w-[20%]",
            },
            {
              name: "Notes",
              attribute: "notes",
              show: true,
              className: "min-w-[10%]",
            },
            {
              name: "Actions",
              attribute: "actions",
              show: true,
              className: "min-w-[10%]",
            },
          ]}
          MobileView={({ data, index }) => {
            return (
              <AttendanceRecordMobileComponent
                data={data}
                index={index}
                fullData={fullData}
                setPopupOption={setPopupOption}
              />
            );
          }}
        />
      </div>

      {/* SUBMIT BUTTON */}
      <div className="sticky bottom-0 bg-base-300 py-5 z-[40] flex flex-col md:flex-row w-full justify-center md:justify-end items-center mt-5 gap-2">
        <button
          disabled={isApproving}
          onClick={handleClosePopup}
          className="btn w-full md:w-32 btn-primary"
        >
          Close
        </button>
      </div>
    </div>
  );
}

// PROPS TYPE DEFINITION
TimingViewerForActiveEmployee.propTypes = {
  handleClosePopup: PropTypes.func,
  data: PropTypes.array,
  workShift: PropTypes.object,
  fullData: PropTypes.object,
  editPermission: PropTypes.bool,
  setIsUpdating: PropTypes.func,
};
