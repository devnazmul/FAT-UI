import PropTypes from "prop-types";
import Popup from "reactjs-popup";

export default function CustomPopupModern({
  popupOption,
  Component,
  popupClasses
}) {
  return (
    <Popup
      open={popupOption?.open}
      onClose={popupOption.onClose}
      overlayStyle={{}}
      closeOnDocumentClick={popupOption?.closeOnDocumentClick}
      className="relative overflow-hidden w-1/2 rounded-xl pop"
    >
      <div
        className={`relative h-full bg-primary bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-10
       shadow-xl rounded-xl border-primary-content border-2 overflow-hidden w-[95vw] ${popupClasses} h-[90vh] `}
      >
        <div className="max-h-[90vh] overflow-y-auto overflow-x-hidden scrollbar-thin scrollbar-thumb-primary">
          {Component}
        </div>
      </div>
    </Popup>
  );
}

CustomPopupModern.propTypes = {
  popupOption: PropTypes.shape({
    open: PropTypes.bool,
    onClose: PropTypes.func,
    closeOnDocumentClick: PropTypes.bool
  }).isRequired,
  Component: PropTypes.node.isRequired,
  popupClasses: PropTypes.string.isRequired
};
