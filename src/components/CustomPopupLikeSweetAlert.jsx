import PropTypes from "prop-types";
import { FiX } from "react-icons/fi";
import Popup from "reactjs-popup";
export default function CustomPopupLikeSweetAlert({
  popupOption,
  setPopupOption,
  Component,
  popupClasses,
  closeButtonHidden = false,
  setIsOpen
}) {
  return (
    <Popup
      open={popupOption?.open}
      onClose={popupOption.onClose}
      overlayStyle={{
        background: "rgba(0,0,0,0.5)",
        backdropFilter: "blur(2px)"
      }}
      closeOnDocumentClick={popupOption?.closeOnDocumentClick}
      className="relative overflow-y-hidden w-1/2 rounded-xl pop"
    >
      <div
        className={`relative bg-base-300 shadow-xl rounded-xl ${
          popupOption?.messageType
            ? `
            ${popupOption?.messageType === "success" && `border-success`}
            ${popupOption?.messageType === "error" && `border-error`}
            ${popupOption?.messageType === "warning" && `border-warning`}
            `
            : `border-primary-content`
        } border-2 overflow-hidden w-full md:w-[500px] ${popupClasses} max-h-[700px]`}
      >
        {!closeButtonHidden ? (
          <button
            id="popup-close-btn"
            onClick={() => {
              setPopupOption({
                ...popupOption,
                open: false
              });
              setIsOpen && setIsOpen(false);
            }}
            className={`absolute high-z-index top-3 right-3 w-9 h-9 rounded-full ${
              popupOption?.messageType
                ? `
            ${popupOption?.messageType === "success" && `bg-success/5`}
            ${popupOption?.messageType === "error" && `bg-error/5`}
            ${popupOption?.messageType === "warning" && `bg-warning/5`}
            `
                : `bg-primary-content`
            } flex justify-center items-center`}
          >
            <FiX
              className={`${
                popupOption?.messageType
                  ? `
            ${popupOption?.messageType === "success" && `text-success`}
            ${popupOption?.messageType === "error" && `text-error`}
            ${popupOption?.messageType === "warning" && `text-warning`}
            `
                  : `text-primary`
              } text-xl`}
            />
          </button>
        ) : (
          ""
        )}
        {popupOption?.title && (
          <div
            className={`w-full px-8 py-5  font-semibold text-2xl absolute top-0 z-50 bg-base-300 ${
              popupOption?.messageType
                ? `
            ${popupOption?.messageType === "success" && `text-success`}
            ${popupOption?.messageType === "error" && `text-error`}
            ${popupOption?.messageType === "warning" && `text-warning`}
            `
                : `text-primary`
            } `}
          >
            {popupOption?.title}
          </div>
        )}
        <div className="px-5 max-h-[90vh] overflow-y-auto overflow-x-hidden custom-scrollbar pt-14">
          {Component}
        </div>
      </div>
    </Popup>
  );
}
CustomPopupLikeSweetAlert.propTypes = {
  popupOption: PropTypes.object,
  setPopupOption: PropTypes.func,
  Component: PropTypes.any,
  popupClasses: PropTypes.string,
  closeButtonHidden: PropTypes.bool,
  setIsOpen: PropTypes.func
};
