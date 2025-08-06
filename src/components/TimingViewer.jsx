import { convertFloatHoursToTime } from "@/utils/convertFloatHoursToTime.js";
import { getTotalTimeInString } from "@/utils/getTotalTime.js";
import { useQueryClient } from "@tanstack/react-query";
import moment from "moment";
import PropTypes from "prop-types";
import { useState } from "react";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import {
  approveOrRejectAttendance,
  approveOrRejectAttendanceSplit,
  deleteSingleAttendance,
} from "../apis/attendence/attendence.js";
import AttendanceArrearsConfirmation from "../pages/Attendance/AttendanceArrearsConfirmation.jsx";
import NoteViewV2 from "../pages/Attendance/NoteViewV2.jsx";
import { handleApiError } from "../utils/apiErrorHandler.jsx";
import { formatText } from "../utils/formatText.js";
import ButtonLoading from "./ButtonLoading.jsx";
import CustomPopup from "./CustomPopup.jsx";
import CustomToaster from "./CustomToaster.jsx";
import RecordsTable from "./RecordsTable.jsx";
import StatusButton from "./StatusButtons/StatusButton.jsx";

import { getOvertime } from "@/constant/getOvertime.js";
import { ATTENDANCE_UPDATE } from "@/constant/permissions.js";
import usePermissionAndModule from "@/hooks/modules/usePermissionAndModule.jsx";
import EditSingleTiming from "@/pages/Attendance/EditSingleTiming.jsx";
import { checkPermissions } from "@/utils/checkPermissions.js";
import { clockInOutDateTimeFormatter } from "@/utils/clockInOutDateTimeFormatter.js";
import { getFullName } from "@/utils/getFullName.js";
import momentTZ from "moment-timezone";
import { MdOutlineStickyNote2 } from "react-icons/md";
import { RiEdit2Fill } from "react-icons/ri";
import AttendanceRecordMobileComponent from "./AttendanceRecordMobileComponent.jsx";

export default function TimingViewer({
  handleClosePopup,
  data,
  workShift,
  fullData,
  editPermission = false,
  setIsUpdated,
  user,
  isPublic,
}) {
  const queryClient = useQueryClient();
  const { permissions } = usePermissionAndModule();

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

  const handlePayrollConfirmation = (id) => {
    setPopupOption({
      open: true,
      type: "payrollConfirmation",
      title: "Attendance Arrears",
      onClose: () => {
        setPopupOption({ ...popupOption, open: false });
      },
      id: id,
      userId: null,
      selfId: user?.id,
      closeOnDocumentClick: false,
    });
  };

  const [isApproving, setIsApproving] = useState(false);
  const approveFunction = (data) => {
    setIsApproving(true);
    approveOrRejectAttendance({
      attendance_id: data?.id,
      is_approved: 1,
      add_in_next_payroll: 0,
    })
      .then(() => {
        queryClient.invalidateQueries({
          queryKey: ["all-attendance"],
        });
        toast.custom((t) => (
          <CustomToaster
            t={t}
            type={"success"}
            text={`Attendance has been approved successfully.`}
          />
        ));
        if (setIsUpdated) {
          setIsUpdated(Math.random());
        }
        setIsApproving(false);
        handleClosePopup();
      })
      .catch((error) => {
        setIsApproving(false);
        handleApiError(error, "#00121");
      });
  };

  const approveWithSplitDayFunction = (data) => {
    setIsApproving(true);
    approveOrRejectAttendanceSplit({
      attendance_id: data?.id,
      is_approved: 1,
      add_in_next_payroll: 0,
    })
      .then(() => {
        queryClient.invalidateQueries({
          queryKey: ["all-attendance"],
        });
        toast.custom((t) => (
          <CustomToaster
            t={t}
            type={"success"}
            text={`Attendance has been approved successfully.`}
          />
        ));
        if (setIsUpdated) {
          setIsUpdated(Math.random());
        }
        setIsApproving(false);
        handleClosePopup();
      })
      .catch((error) => {
        setIsApproving(false);
        handleApiError(error, "#00121");
      });
  };

  // REJECT FUNCTION
  const [isRejecting, setIsRejecting] = useState(false);
  const rejectFunction = (data) => {
    Swal.fire({
      title: "Are you sure?",
      text: `Attendance rejection for ${getFullName(data?.employee)}, ${
        data?.in_date
      }`,
      icon: "error",
      showCancelButton: true,
      confirmButtonText: "Yes, reject it!",
      customClass: {
        title: "text-primary",
        container: "",
        popup: "bg-base-300 shadow-xl rounded-xl border border-primary",
        icon: "text-red-500",
        cancelButton: "bg-green-500",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        setIsRejecting(true);
        approveOrRejectAttendance({
          attendance_id: data?.id,
          is_approved: 0,
          add_in_next_payroll: 0,
        })
          .then(() => {
            setIsRejecting(false);
            queryClient.invalidateQueries({
              queryKey: ["all-attendance"],
            });
            toast.custom((t) => (
              <CustomToaster
                t={t}
                type={"success"}
                text={`Attendance has been rejected successfully.`}
              />
            ));
            if (setIsUpdated) {
              setIsUpdated(Math.random());
            }
            handleClosePopup();
          })
          .catch((error) => {
            setIsRejecting(false);
            handleApiError(error, "#00121");
          });
      }
    });
  };

  // DELETE FUNCTION
  const [isDeleting, setIsDeleting] = useState(false);
  const deleteFunction = (data) => {
    Swal.fire({
      title: "Are you sure?",
      text: `Attendance delete for ${getFullName(data?.employee)}, ${
        data?.in_date
      }`,
      icon: "error",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      customClass: {
        title: "text-primary",
        container: "",
        popup: "bg-base-300 shadow-xl rounded-xl border border-primary",
        icon: "text-red-500",
        cancelButton: "bg-green-500",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        setIsDeleting(true);
        deleteSingleAttendance(data?.id)
          .then(() => {
            setIsDeleting(false);
            queryClient.invalidateQueries({
              queryKey: ["all-attendance"],
            });
            toast.custom((t) => (
              <CustomToaster
                t={t}
                type={"success"}
                text={`Attendance has been deleted successfully.`}
              />
            ));
            if (setIsUpdated) {
              setIsUpdated(Math.random());
            }
            handleClosePopup();
          })
          .catch((error) => {
            setIsDeleting(false);
            handleApiError(error, "#00121");
          });
      }
    });
  };

  // HANDLE APPROVE
  const handleApprove = (data) => {
    if (data?.is_in_arrears) {
      handlePayrollConfirmation(data?.id);
    } else {
      if (fullData?.has_multiday_presence) {
        Swal.fire({
          title: "Approve Attendance: Single Day or Multi-Day Split?",
          html: `
          <div style="text-align: left;">
            <p style="font-weight: bold;">Choose how to approve this attendance record</p>
            <br>
            <ul style="list-style-type: disc; padding-left: 20px;">
              <li>
                <span style="font-weight:600;">Single Day: </span>
                Keeps the entire shift under the original date, even if it extends past midnight.
              </li>
              <br />
              <li>
                <span style="font-weight:600;">Multi-Day Split: </span>
                Splits attendance at 11:59 PM, assigning post-midnight hours to the next day for accurate reporting.
              </li>
            </ul>
          </div>
          `,
          icon: "question",
          showCancelButton: true,
          showDenyButton: true,
          confirmButtonText: "Single Day",
          cancelButtonText: "Cancel",
          denyButtonText: "Multi-Day Split",
          customClass: {
            title: "text-primary",
            container: "",
            popup: "bg-base-300 shadow-xl rounded-xl border border-primary",
            icon: "text-red-500",
            confirmButton: "bg-success",
            cancelButton: "bg-danger",
            denyButton: "bg-primary",
          },
        }).then((result) => {
          if (result.isConfirmed) {
            // IS SINGLE DAY
            approveFunction(data);
          } else if (result.isDenied) {
            // IF SPLIT
            approveWithSplitDayFunction(data);
          }
        });
      } else {
        approveFunction(data);
      }
    }
  };

  // HANDLE Reject
  const handleReject = (data) => {
    rejectFunction(data);
  };

  // HANDLE Delete
  const handleDelete = (data) => {
    deleteFunction(data);
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
    <div className={`w-full py-5`}>
      {/* POPUP  */}
      <CustomPopup
        popupClasses={`${
          popupOption?.type === "createMultiAttendance" ||
          popupOption?.type === "changeLog" ||
          popupOption?.type === "payrollConfirmation"
            ? ` ${
                popupOption?.type === "payrollConfirmation"
                  ? "lg:w-[400px]"
                  : "lg:w-[60vw]"
              }`
            : `${"lg:w-[95vw]"}`
        }`}
        popupOption={popupOption}
        setPopupOption={setPopupOption}
        Component={
          <>
            {/* VIEW NOTES */}
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
                }}
              />
            )}

            {/* ATTENDANCE ARREARS */}
            {popupOption?.type === "payrollConfirmation" && (
              <AttendanceArrearsConfirmation
                setPopupOption={setPopupOption}
                handleClosePopup={() => {
                  setPopupOption({
                    open: false,
                    type: "",
                    id: null,
                    selfId: null,
                    onClose: () => {
                      setPopupOption({ ...popupOption, open: false });
                    },
                    overlayStyle: { background: "red" },
                    closeOnDocumentClick: false,
                  });

                  handleClosePopup();
                }}
                popupOption={popupOption}
              />
            )}

            {popupOption?.type === "editRecord" && (
              <EditSingleTiming
                popupOption={popupOption}
                setIsUpdating={setIsUpdated}
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

      {/* EMPLOYEE NAME  */}
      <p className={`px-2`}>
        <span className={`font-bold text-primary`}>Employee Name:</span>{" "}
        {getFullName(fullData?.employee)}
      </p>

      {/* DAY DETAILS  */}
      {!!workShift?.detail?.id && (
        <div className={`px-2`}>
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
      <div className={`px-2`}>
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
        <div className={`px-2`}>
          <p>
            <span className={`font-bold text-primary`}>Overtime:</span>{" "}
            {convertFloatHoursToTime(fullData?.overtime_hours)}
          </p>
        </div>
      )}

      {/* UNPAID BREAK  */}
      {!!fullData?.unpaid_break_hours && (
        <div className={`px-2`}>
          <p>
            <span className={`font-bold text-primary`}>Unpaid Break:</span>{" "}
            {convertFloatHoursToTime(fullData?.unpaid_break_hours)}
          </p>
        </div>
      )}

      {/* TOTAL ONGOING  */}
      {!!data?.find((shift) =>
        moment(shift?.in_time, "DD-MM-YYYY HH:mm:ss").isSame(
          moment(shift?.out_time, "DD-MM-YYYY HH:mm:ss")
        )
      )?.in_time && (
        <div
          className={`px-2 flex flex-col md:flex-row items-start md:items-center gap-x-2`}
        >
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
                ?.map((shift) => {
                  const timeZone = shift?.time_zone || "Asia/Dhaka";
                  const inTime = momentTZ.tz(
                    shift?.in_time,
                    "DD-MM-YYYY HH:mm:ss",
                    timeZone
                  );
                  const outTime = momentTZ.tz(
                    shift?.out_time,
                    "DD-MM-YYYY HH:mm:ss",
                    timeZone
                  );

                  return {
                    start_at: inTime.format("DD-MM-YYYY HH:mm:ss"),
                    end_at: shift?.out_time
                      ? inTime.isSame(outTime)
                        ? momentTZ().tz(timeZone).format("DD-MM-YYYY HH:mm:ss")
                        : outTime.format("DD-MM-YYYY HH:mm:ss")
                      : momentTZ().tz(timeZone).format("DD-MM-YYYY HH:mm:ss"),
                  };
                })
            )}
          </p>
          {!moment(
            data?.find((shift) =>
              moment(shift?.in_time, "DD-MM-YYYY HH:mm:ss").isSame(
                moment(shift?.out_time, "DD-MM-YYYY HH:mm:ss")
              )
            )?.in_time,
            "DD-MM-YYYY HH:mm:ss"
          ).isSame(moment(), "day") && (
            <span className={`text-red-500`}>
              <span className={`font-bold`}>Note: </span>
              {`[This Attendance ongoing from ${moment(
                data?.find((shift) =>
                  moment(shift?.in_time, "DD-MM-YYYY HH:mm:ss").isSame(
                    moment(shift?.out_time, "DD-MM-YYYY HH:mm:ss")
                  )
                )?.in_time,
                "DD-MM-YYYY HH:mm A"
              ).format("DD-MM-YYYY")}
            ]`}
            </span>
          )}
        </div>
      )}

      {/* STATUS  */}
      {fullData?.status ? (
        <p className={`px-2 flex items-center gap-2`}>
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
          const timeZone = d?.time_zone || "Asia/Dhaka";
          const inTime = momentTZ.tz(
            d?.in_time,
            "DD-MM-YYYY HH:mm:ss",
            timeZone
          );
          const outTime = momentTZ.tz(
            d?.out_time,
            "DD-MM-YYYY HH:mm:ss",
            timeZone
          );

          return {
            ...d,
            start_at_t: <span>{clockInOutDateTimeFormatter(d?.in_time)}</span>,
            end_at_t: moment(d?.in_time, "DD-MM-YYYY HH:mm:ss").isSame(
              moment(d?.out_time, "DD-MM-YYYY HH:mm:ss")
            ) ? (
              <span className={`text-green-500 font-bold md:font-medium`}>
                Ongoing
              </span>
            ) : (
              <span>{clockInOutDateTimeFormatter(d?.out_time)} </span>
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
                start_at: inTime.format("DD-MM-YYYY HH:mm:ss"),
                end_at: d?.out_time
                  ? inTime.isSame(outTime)
                    ? momentTZ().tz(timeZone).format("DD-MM-YYYY HH:mm:ss")
                    : outTime.format("DD-MM-YYYY HH:mm:ss")
                  : momentTZ().tz(timeZone).format("DD-MM-YYYY HH:mm:ss"),
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
                <ul className={`${d?.projects?.length > 1 ? "list-disc" : ""}`}>
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
            actions: checkPermissions([ATTENDANCE_UPDATE], permissions) ? (
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
            ) : (
              ""
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
            className: "min-w-[10%]",
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
            show:
              checkPermissions([ATTENDANCE_UPDATE], permissions) && !isPublic,
            className: "min-w-[10%]",
          },
        ]}
        MobileView={({ data, index }) => {
          return <AttendanceRecordMobileComponent data={data} index={index} />;
        }}
      />

      {/* SUBMIT BUTTON */}
      <div className="sticky bottom-0 bg-base-300 py-5 z-[40] flex flex-col md:flex-row w-full justify-center md:justify-end items-center mt-5 gap-2">
        {/* CLOSE  */}
        <button
          disabled={isApproving || isRejecting || isDeleting}
          onClick={handleClosePopup}
          className="btn w-full md:w-32 btn-primary"
        >
          Close
        </button>

        {editPermission && !isPublic && (
          <>
            {/* DELETE  */}
            <button
              disabled={isApproving || isRejecting || isDeleting}
              onClick={() => {
                handleDelete(fullData);
              }}
              className="btn w-full md:w-32 btn-error text-base-300"
            >
              {isDeleting ? <ButtonLoading /> : "Delete"}
            </button>

            {/* REJECT OR APPROVE  */}
            {fullData?.status !== "approved" && !isPublic ? (
              <button
                disabled={isApproving || isRejecting || isDeleting}
                onClick={() => {
                  handleApprove(fullData);
                }}
                className="btn w-full md:w-32 btn-success text-base-300"
              >
                {isApproving ? <ButtonLoading /> : "Approve"}
              </button>
            ) : (
              ""
            )}

            {fullData?.status !== "rejected" && !isPublic ? (
              <button
                disabled={isApproving || isRejecting || isDeleting}
                onClick={() => {
                  handleReject(fullData);
                }}
                className="btn w-full md:w-32 bg-rose-500 text-base-300"
              >
                {isRejecting ? <ButtonLoading /> : "Reject"}
              </button>
            ) : (
              ""
            )}
          </>
        )}
      </div>
    </div>
  );
}

// PROPS TYPE DEFINITION
TimingViewer.propTypes = {
  handleClosePopup: PropTypes.func,
  user: PropTypes.object,
  data: PropTypes.array,
  workShift: PropTypes.object,
  fullData: PropTypes.object,
  editPermission: PropTypes.bool,
  isPublic: PropTypes.bool,
  setIsUpdated: PropTypes.func,
};
