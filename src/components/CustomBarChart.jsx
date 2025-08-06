import PropTypes from "prop-types";

export default function CustomBarChart({
  title = "Today",
  color = "#ff5500",
  value = 0,
  FormateValue = {},
  barHide = false
}) {
  return (
    <div
      className={`border-[0.1px] rounded-md shadow-md flex flex-col lg:flex-col gap-y-1 lg:gap-x-3 items-start lg:items-center justify-center px-2 py-1`}
    >
      {/* TITLE AND VALUE  */}
      <div
        className={`flex items-center  justify-between w-full ${
          barHide ? "lg:w-full" : "lg:w-full"
        } px-2 gap-x-3 font-bold`}
      >
        <div className={`inline-block text-xs md:text-xs`}>{title}</div>
        <div className="inline-block text-[10px] md:text-sm text-primary">
          <FormateValue />
        </div>
      </div>

      {/* BAR  */}
      {!barHide && (
        <div
          title={`${value}%`}
          className={`flex-grow bg-base-100 w-full  h-[10px] rounded-full items-center justify-center`}
        >
          <div
            style={{
              width: `${value <= 100 ? value : 100}%`,
              height: "10px",
              backgroundColor: color,
              borderRadius: "5px"
            }}
          ></div>
        </div>
      )}
    </div>
  );
}

// PROPS TYPES
CustomBarChart.propTypes = {
  title: PropTypes.string,
  color: PropTypes.string,
  value: PropTypes.number,
  FormateValue: PropTypes.amu,
  barHide: PropTypes.bool
};
