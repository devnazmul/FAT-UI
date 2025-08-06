import moment from "moment";
import PropTypes from "prop-types";
import { RiEdit2Fill } from "react-icons/ri";

export default function AttendanceRecordMobileComponent({
  data,
  index,
  fullData,
  setPopupOption
}) {
  return (
    <div
      className={` rounded-lg border p-5 shadow-md border-primary-content relative overflow-hidden  ${
        data?.note?.includes("Employee clock in at")
          ? "bg-red-200 "
          : index % 2
            ? "bg-base-200"
            : "bg-base-200"
      }`}
    >
      <div
        className={`absolute top-0 left-0 bg-primary w-6 h-6 flex items-center justify-center rounded-br-lg   text-base-100`}
      >
        {index + 1}
      </div>

      {moment(data?.in_time, "DD-MM-YYYY HH:mm:ss").isSame(
        moment(data?.out_time, "DD-MM-YYYY HH:mm:ss")
      ) ? (
        ""
      ) : (
        <div
          className={`absolute top-0 right-0 bg-primary w-6 h-6 flex items-center justify-center rounded-bl-lg   text-base-100`}
        >
          <RiEdit2Fill
            onClick={() =>
              setPopupOption({
                open: true,
                type: "editRecord",
                title: "Update Record",
                onClose: () => {
                  setPopupOption((prev) => ({ ...prev, open: false }));
                },
                closeOnDocumentClick: false,
                fullData,
                d: data
              })
            }
            className={`text-xl text-base-300 cursor-pointer`}
          />
        </div>
      )}

      {/* START AT - END AT */}
      <span className={`my-2 block`}>
        <span className={`font-bold text-primary`}>{data?.start_at_t} </span>
        <span className={``}>To</span>
        <span className={`font-bold text-primary`}> {data?.end_at_t}</span>{" "}
        <div>{data?.timeZone}</div>
      </span>

      <div className={`flex items-center gap-x-2`}>
        <span className={`font-bold`}>Total:</span> {data?.total}
      </div>

      <div className={`flex items-center gap-x-2`}>
        <span className={`font-bold`}>Break:</span> {data?.break}
      </div>
      <div className={`flex items-center gap-x-2`}>
        <span className={`font-bold`}>Break Type:</span> {data?.break_type}
      </div>
      <div className={`flex items-center gap-x-2`}>
        <span className={`font-bold`}>Project:</span> {data?.project}
      </div>
      <div className={`flex items-center gap-x-2`}>
        <span className={`font-bold`}>Work Site:</span> {data?.work_site}
      </div>
      <div className={`flex items-center gap-x-2`}>
        <span className={`font-bold`}>Notes:</span> {data?.notes}
      </div>
    </div>
  );
}

AttendanceRecordMobileComponent.propTypes = {
  data: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  fullData: PropTypes.any.isRequired,
  setPopupOption: PropTypes.func.isRequired
};
