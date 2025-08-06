import PropTypes from "prop-types";
import { IoInformationCircleSharp } from "react-icons/io5";

const AnalyticsField = ({
  // LOADING
  isLoading,

  // BASIC DATA
  title,
  value,

  // VALUE COLOR IN 2 WAY
  textColor = "text-primary",
  customColor = "",

  // DIALOG ELEMENTS
  dialogComponent = "",
  dialogId = "dialog"
}) => {
  return (
    <div
      className={`w-full relative  h-[70px] rounded-xl border border-gray-500 p-5 flex flex-col items-start justify-center ${isLoading ? "space-y-2" : ""}`}
    >
      {isLoading ? (
        <span className="w-full h-10 bg-gray-200 animate-pulse rounded-[5px]"></span>
      ) : (
        <span className="font-medium text-sm">{title}</span>
      )}

      {isLoading ? (
        <span className="w-1/2 h-10 bg-gray-200 animate-pulse rounded-[5px]"></span>
      ) : (
        <span color={customColor} className={`text-xl font-bold ${textColor}`}>
          {value}
        </span>
      )}

      {dialogComponent ? (
        <>
          {isLoading ? (
            ""
          ) : (
            <IoInformationCircleSharp
              onClick={() => document.getElementById(dialogId).showModal()}
              className={`text-primary text-xl absolute top-1 right-1 cursor-pointer`}
            />
          )}

          <dialog id={dialogId} className="modal ">
            <div
              data-auto={`custom-date-picker-dialog-all-page`}
              className="modal-box "
            >
              {dialogComponent}
            </div>
          </dialog>
        </>
      ) : (
        ""
      )}
    </div>
  );
};

AnalyticsField.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  textColor: PropTypes.string,
  customColor: PropTypes.string,
  dialogComponent: PropTypes.node,
  dialogId: PropTypes.string
};

export default AnalyticsField;
