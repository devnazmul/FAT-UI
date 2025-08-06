import PropTypes from "prop-types";
import GoBackButton from "./GoBackButton";
import Headings from "./Headings/Headings";

export default function NoDataFound({
  h = "h-[70vh]",
  text = "No data found",
  message = "",
  backButton = true,
  className = ""
}) {
  return (
    <div
      className={`${h}  w-full flex justify-center items-center ${className}`}
    >
      <div className="flex flex-col justify-center items-center gap-5">
        <img
          className="w-[250px]"
          src={`/assets/no_data_found.svg`}
          alt={text}
        />
        <Headings level={1} className="text-center">
          {text}
        </Headings>
        {message && <p className="text-center">{message}</p>}
        {backButton ? (
          <GoBackButton
            bgColorClass={`btn-primary`}
            textColorClass={`text-base-300`}
          />
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

NoDataFound.propTypes = {
  h: PropTypes.string,
  text: PropTypes.string,
  message: PropTypes.string,
  backButton: PropTypes.bool,
  className: PropTypes.string
};
