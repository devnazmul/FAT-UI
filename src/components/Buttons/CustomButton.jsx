import PropTypes from "prop-types";

export default function CustomButton({
  clickHandler,
  dataAuto,
  buttonLabel = "Create",
  isLoading = false,
  disabled = false,
  htmlType = "button",
  className,
  variant
}) {
  return (
    <button
      type={htmlType}
      data-auto={dataAuto}
      disabled={isLoading || disabled}
      onClick={clickHandler}
      className={`font-semibold  px-5 py-2 rounded-lg transition-transform active:scale-90 text-base-300 disabled:bg-primary-content ${className} ${
        variant === "outlined"
          ? "border border-primary bg-white text-primary"
          : variant === "filled"
            ? "bg-primary text-white"
            : variant === "text"
              ? "bg-transparent text-primary"
              : ""
      }`}
    >
      {isLoading ? <Loading /> : buttonLabel}
    </button>
  );
}

CustomButton.propTypes = {
  clickHandler: PropTypes.func.isRequired,
  dataAuto: PropTypes.string.isRequired,
  buttonLabel: PropTypes.string.isRequired,
  isLoading: PropTypes.bool,
  disabled: PropTypes.bool,
  htmlType: PropTypes.oneOf(["button", "submit"]),
  className: PropTypes.string,
  variant: PropTypes.oneOf(["outlined", "filled", "text"])
};

function Loading({ classNames, color = "text-white", size = "loading-sm" }) {
  return (
    <div className="flex flex-row justify-center items-center gap-2">
      <span
        className={`loading loading-spinner bg-primary ${size} ${classNames} ${color}`}
      ></span>
      <p>loading..</p>
    </div>
  );
}

Loading.propTypes = {
  classNames: PropTypes.string,
  color: PropTypes.string,
  size: PropTypes.string
};
