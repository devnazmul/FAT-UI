import PropTypes from "prop-types";
import CustomButton from "./CustomButton";

export default function FormAction({
  submitHandler,
  cancelHandler,
  dataAuto,
  disabled,
  isLoading,
  confirmButtonLabel = "Submit",
  dismissButtonLabel = "Cancel",
  htmlType = "button"
}) {
  return (
    <div
      data-auto={`form_action-${dataAuto}`}
      className="sticky bottom-0 bg-base-300 py-5 z-[30] flex flex-col md:flex-row w-full justify-center md:justify-end items-center mt-5 gap-2"
    >
      <CustomButton
        dataAuto={`${dataAuto}-cancel_button`}
        htmlType={`button`}
        // isLoading={isLoading}
        disabled={disabled}
        buttonLabel={dismissButtonLabel}
        variant="outlined"
        clickHandler={cancelHandler}
        className={`btn w-full md:btn-wide btn-outline btn-primary`}
      />
      <CustomButton
        dataAuto={`${dataAuto}-submit_button`}
        htmlType={htmlType}
        isLoading={isLoading}
        disabled={disabled}
        buttonLabel={confirmButtonLabel}
        variant="filled"
        clickHandler={submitHandler}
        className={`btn w-full md:btn-wide btn-primary`}
      />
    </div>
  );
}

FormAction.propTypes = {
  submitHandler: PropTypes.func.isRequired,
  cancelHandler: PropTypes.func.isRequired,
  dataAuto: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  isLoading: PropTypes.bool,
  confirmButtonLabel: PropTypes.string.isRequired,
  dismissButtonLabel: PropTypes.string,
  htmlType: PropTypes.oneOf(["button", "submit"])
};
