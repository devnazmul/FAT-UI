import PropTypes from "prop-types";
import { FiX } from "react-icons/fi";
import Popup from "reactjs-popup";

export default function CustomPopup({
  popupOption,
  Component,
  popupClasses,
  closeButtonHidden = false,
  setIsOpen,
  buttonComponent
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
        className={`relative bg-base-300 shadow-xl rounded-xl  ${
          popupOption?.messageType
            ? `
            ${popupOption?.messageType === "success" && `border-success`}
            ${popupOption?.messageType === "error" && `border-error`}
            ${popupOption?.messageType === "warning" && `border-warning`}
            `
            : `border-primary-content`
        }  border-2 overflow-hidden w-[95vw] sm:w-[70vw] md:w-[70vw] lg:w-[50vw] ${popupClasses} max-h-[90vh] flex flex-col`}
      >
        {!closeButtonHidden ? (
          <button
            id="popup-close-btn"
            onClick={() => {
              popupOption.onClose();
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
            }  flex justify-center items-center`}
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
              }  text-xl`}
            />
          </button>
        ) : (
          ""
        )}

        {popupOption?.title && (
          <div
            className={`w-full px-5 py-5 ${
              popupOption?.messageType
                ? `
            ${popupOption?.messageType === "success" && `text-success`}
            ${popupOption?.messageType === "error" && `text-error`}
            ${popupOption?.messageType === "warning" && `text-warning`}
            `
                : `text-primary`
            } font-semibold text-2xl sticky top-0 z-50 bg-base-300`}
          >
            {popupOption?.title}
          </div>
        )}

        {/* CONTENT */}
        <div className="px-5 max-h-[90vh] overflow-y-auto overflow-x-hidden custom-scrollbar flex-1">
          {popupOption.open ? Component : null}
        </div>
        {!!buttonComponent && (
          <div className="block w-full px-8 text-primary font-semibold text-2xl absolute bottom-0 z-[1000] bg-base-300 shadow-md">
            {buttonComponent}
          </div>
        )}
      </div>
    </Popup>
  );
}

CustomPopup.propTypes = {
  popupOption: PropTypes.shape({
    open: PropTypes.bool,
    onClose: PropTypes.func,
    closeOnDocumentClick: PropTypes.bool,
    messageType: PropTypes.oneOf(["success", "error", "warning"]),
    title: PropTypes.string
  }).isRequired,
  Component: PropTypes.node,
  popupClasses: PropTypes.string,
  closeButtonHidden: PropTypes.bool,
  setIsOpen: PropTypes.func,
  buttonComponent: PropTypes.node
};
