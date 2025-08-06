import React from "react";
import PropTypes from "prop-types";
import ButtonLoading from "./ButtonLoading";

const CustomHeadingButton = React.memo(
  ({
    handler,
    dataAuto,
    text = "Create",
    isLoading = false,
    disabled = false,
    disabledToolTip = "",
    buttonSize = "default",
    Icon,
    width = "w-auto",
    isOutlined,
    bgColor = "bg-primary"
  }) => {
    return (
      <>
        <button
          data-tip={disabled ? disabledToolTip : ""}
          data-auto={dataAuto}
          disabled={disabled || isLoading}
          onClick={handler} // Directly pass handler
          className={`${disabledToolTip && "tooltip tooltip-bottom tooltip-error"} flex justify-center items-center gap-1 ${
            isLoading || disabled
              ? "bg-gray-400 cursor-not-allowed"
              : `${isOutlined ? "border border-primary bg-base-300 text-primary" : bgColor} active:scale-90`
          } ${buttonSize === "small" ? "px-4 py-[6px]" : "px-5 py-2"} rounded-lg transition-transform text-base-300 ${width}`}
        >
          {isLoading ? (
            <ButtonLoading />
          ) : (
            <span
              className={`flex items-center gap-x-1 ${buttonSize === "small" ? "text-sm" : ""}`}
            >
              {Icon && (
                <Icon
                  className={`${buttonSize === "small" ? "text-[18px]" : "text-[20px]"}`}
                />
              )}
              {text?.split(" ")?.map((word, index) => (
                <span key={index}>
                  {word}
                  {index < text.split(" ").length - 1 && " "}
                </span>
              ))}
            </span>
          )}
        </button>
      </>
    );
  }
);

CustomHeadingButton.propTypes = {
  handler: PropTypes.func.isRequired,
  dataAuto: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  isLoading: PropTypes.bool,
  disabled: PropTypes.bool,
  disabledToolTip: PropTypes.string,
  buttonSize: PropTypes.oneOf(["default", "small"]),
  Icon: PropTypes.elementType,
  width: PropTypes.string,
  isOutlined: PropTypes.bool,
  bgColor: PropTypes.string
};

export default CustomHeadingButton;
