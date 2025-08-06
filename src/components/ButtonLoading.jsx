import PropTypes from "prop-types";

export default function ButtonLoading({
  classNames,
  color = "text-primary",
  size = "loading-sm"
}) {
  return (
    <span
      className={`loading loading-spinner ${size} ${classNames} ${color}`}
    ></span>
  );
}

ButtonLoading.propTypes = {
  classNames: PropTypes.string,
  color: PropTypes.string,
  size: PropTypes.string
};
