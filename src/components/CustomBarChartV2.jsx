import PropTypes from "prop-types";

export default function CustomBarChartV2({ title = "Today", data }) {
  return (
    <div
      className={`border-[0.1px] rounded-md shadow-md flex flex-col lg:flex-col gap-y-1 lg:gap-x-3 items-start lg:items-center justify-center px-2 py-1`}
    >
      {/* TITLE AND VALUE  */}
      <div
        className={`flex items-center  justify-between w-full ${
          data?.barHide ? "lg:w-full" : "lg:w-full"
        } px-2 gap-x-3 font-bold`}
      >
        <div className={`inline-block text-xs md:text-xs`}>{title}</div>
        <div className="inline-block text-[10px] md:text-sm text-primary">
          <data.FormateValue />
        </div>
      </div>

      {/* BAR  */}
      {!data?.barHide && (
        <div
          title={`${data?.value}%`}
          className={`flex-grow bg-base-100 w-full  h-[10px] rounded-full items-center justify-center`}
        >
          <div
            style={{
              width: `${data?.value <= 100 ? data?.value : 100}%`,
              height: "10px",
              backgroundColor: data?.color,
              borderRadius: "5px"
            }}
          ></div>
        </div>
      )}
    </div>
  );
}

// PROPS TYPES
CustomBarChartV2.propTypes = {
  title: PropTypes.string,
  data: PropTypes.arrayOf(
    PropTypes.shape({
      color: PropTypes.string,
      value: PropTypes.number,
      FormateValue: PropTypes.amu,
      barHide: PropTypes.bool
    })
  )
};
