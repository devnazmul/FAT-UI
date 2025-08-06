import { convertFloatHoursToTime } from "@/utils/convertFloatHoursToTime.js";
import PropTypes from "prop-types";

export default function CustomBarChartV3({
  containerTitle = "",
  isLoading = false,
  scheduled = 0,
  values = []
}) {
  return (
    <div className={`p-2 rounded-lg shadow-lg h-[50px] border`}>
      {isLoading ? (
        <div className={`flex gap-x-5`}>
          <div>
            <div
              className={`bg-base-100 animate-pulse h-[10px] w-35 mb-1`}
            ></div>
            <div
              className={`bg-base-100 animate-pulse h-[10px] w-20 mb-1`}
            ></div>
          </div>

          <div className={`flex flex-col w-full`}>
            <div className={`flex justify-between items-center mb-1 w-full`}>
              <div className={`bg-base-100 animate-pulse h-[10px] w-20`}></div>
              <div className={`bg-base-100 animate-pulse h-[10px] w-20`}></div>
              <div className={`bg-base-100 animate-pulse h-[10px] w-20`}></div>
            </div>

            <div className={`bg-base-100 animate-pulse h-[10px] w-full`}></div>
          </div>
        </div>
      ) : (
        <>
          <div className={`flex gap-x-1`}>
            <div className={`w-52`}>
              <h3 className={`text-primary text-xs font-bold mb-1`}>
                {containerTitle}&apos;s
              </h3>
              <h3 className={`text-primary text-xs font-bold mb-1`}>
                Scheduled: {convertFloatHoursToTime(scheduled)}
              </h3>
            </div>
            <div className={`w-full `}>
              <div className={`flex  flex-row justify-between mb-1 gap-1`}>
                {values?.map((item, index) => (
                  <span
                    key={index}
                    className={`text-xs font-medium`}
                    style={{ color: item?.color }}
                  >
                    {item?.title}
                  </span>
                ))}
              </div>

              <div
                className={`flex flex-row bg-base-100 w-full h-[10px] items-center `}
              >
                {values?.map((item, index) => (
                  <div
                    key={index}
                    style={{
                      width: `${(item?.value / values?.reduce((acc, curr) => acc + curr?.value, 0)) * 100}%`,
                      height: "10px",
                      backgroundColor: item?.color
                    }}
                    className={`text-xs relative ${(item?.value / values?.reduce((acc, curr) => acc + curr?.value, 0)) * 100 !== 100 && "tooltip"}  ${index === 0 ? "tooltip-center" : "tooltip-left"} tooltip-primary cursor-pointer`}
                    data-tip={`${convertFloatHoursToTime(item?.value)} (${((item?.value / values?.reduce((acc, curr) => acc + curr?.value, 0)) * 100).toFixed(1)}%)`}
                  ></div>
                ))}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

// PROPS TYPES
CustomBarChartV3.propTypes = {
  containerTitle: PropTypes.string,
  isLoading: PropTypes.bool,
  scheduled: PropTypes.number,
  values: PropTypes.arrayOf(
    PropTypes.shape({
      color: PropTypes.string,
      value: PropTypes.number,
      title: PropTypes.string
    })
  )
};
