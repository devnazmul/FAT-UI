import PropTypes from "prop-types";

const Active = ({ data, disabled, loading, handler }) => (
  <div className={`md:flex justify-center items-center`}>
    <button
      onClick={() => handler(data?.id)}
      disabled={disabled}
      className="border-2  px-5 py-1 rounded-full flex items-center"
    >
      {loading ? (
        <span className="loading loading-spinner loading-xs"></span>
      ) : (
        <>
          <div
            className={`w-4 h-4 border-2 border-success rounded-full flex justify-center items-center mr-1`}
          >
            <div
              className={`w-2 h-2 border-2 border-success bg-success rounded-full`}
            ></div>
          </div>
          <p className={`font-medium`}>Active</p>
        </>
      )}
    </button>
  </div>
);

Active.propTypes = {
  data: PropTypes.object.isRequired,
  disabled: PropTypes.bool.isRequired,
  loading: PropTypes.bool.isRequired,
  handler: PropTypes.func.isRequired
};

export default Active;
