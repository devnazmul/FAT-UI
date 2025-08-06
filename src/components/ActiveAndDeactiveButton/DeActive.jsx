import PropTypes from "prop-types";

const DeActive = ({ data, loading, handler, disabled }) => (
  <div className={`md:flex justify-center items-center`}>
    <button
      onClick={() => handler(data?.id)}
      disabled={disabled}
      className={` border-2 ${
        loading ? "px-5" : "px-3"
      } py-1 rounded-full flex items-center`}
    >
      {loading ? (
        <span className="loading loading-spinner loading-xs"></span>
      ) : (
        <>
          <div
            className={`w-4 h-4 border-2 border-error rounded-full flex justify-center items-center mr-1`}
          >
            <div
              className={`w-2 h-2 border-2 border-error bg-error rounded-full`}
            ></div>
          </div>
          <p className={`font-medium`}>Deactive</p>
        </>
      )}
    </button>
  </div>
);

DeActive.propTypes = {
  data: PropTypes.object.isRequired,
  disabled: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
  handler: PropTypes.func.isRequired
};

export default DeActive;
