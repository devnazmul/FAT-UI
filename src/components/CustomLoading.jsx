// ===========================================
// #00137
// ===========================================
import PropTypes from "prop-types";

export default function CustomLoading({ h = "h-[80vh]" }) {
  return (
    <div
      className={`${h} w-full flex flex-col justify-center items-center  bg-transparent`}
    >
      <img
        className={`w-auto h-[80px]`}
        src="/assets/loadingAnimation.gif"
        alt="Loading Animation"
      />

      <h2 className={`text-sm block text-center sm:text-left`}>Loading...</h2>
    </div>
  );
}

CustomLoading.propTypes = {
  h: PropTypes.string
};
