import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

const NoDataFoundComponent = ({
  message,
  buttonText,
  redirectUrl,
  height = "h-[400px]"
}) => {
  const navigate = useNavigate(); // Initialize useNavigate hook

  const handleRedirect = (url) => {
    navigate(url); // Redirect to employee create form
  };
  return (
    <div className={`px-2 py-5 ${height}`}>
      <div className="flex h-full flex-col gap-4 w-full justify-center items-center">
        <p className={`text-center`}>{message}</p>
        {buttonText && redirectUrl && (
          <div
            className="flex justify-center items-center"
            role="button"
            onClick={() => {
              handleRedirect(redirectUrl);
            }}
          >
            <button
              onClick={() => {
                handleRedirect(redirectUrl);
              }}
              className="btn px-10 btn-primary"
            >
              {buttonText}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
NoDataFoundComponent.propTypes = {
  message: PropTypes.string.isRequired,
  buttonText: PropTypes.string,
  redirectUrl: PropTypes.string,
  height: PropTypes.string
};
export default NoDataFoundComponent;
