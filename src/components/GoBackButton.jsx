import PropTypes from "prop-types";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";

export default function GoBackButton({
  bgColorClass = "btn-primary",
  textColorClass = "text-base-300",
  dataAuto,
  handler
}) {
  const navigate = useNavigate();
  return (
    <button
      data-auto={dataAuto}
      data-tip="Go Back"
      className={`z-[20] ${bgColorClass} btn btn-primary tooltip tooltip-bottom flex items-center gap-x-2 tooltip-primary`}
      onClick={
        handler
          ? handler
          : () => {
              navigate(-1);
            }
      }
    >
      <IoIosArrowBack className={`text-2xl md:text-md ${textColorClass}`} />
      <span className={`hidden md:block ${textColorClass}`}>Go Back</span>
    </button>
  );
}

GoBackButton.propTypes = {
  bgColorClass: PropTypes.string,
  textColorClass: PropTypes.string,
  dataAuto: PropTypes.string,
  handler: PropTypes.func
};
