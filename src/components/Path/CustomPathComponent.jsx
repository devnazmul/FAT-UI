import PropTypes from "prop-types";

export default function CustomPathComponent({ values = [] }) {
  return (
    <div className="w-full">
      {values.length > 0 ? (
        <div className="relative wrap overflow-hidden h-full pl-2">
          {/* THIS IS THE VERTICAL LINE  */}
          <div className="border-2-2 absolute border-dashed border-primary mt-6 h-full border left-[30%] md:left-[29%] -translate-x-[50%]"></div>

          {/* SECTIONS  */}
          {values.map((item, index) => (
            <div
              key={index}
              className="flex justify-between items-start w-full mb-10 mt-2 "
            >
              {/* LEFT  */}
              <div
                data-auto={`custom-path-component-left-all-page`}
                className="order-1 overflow-hidden bg-base-300 border border-primary-content rounded-lg shadow-xl w-[24%]"
              >
                {item?.LeftSection}
              </div>

              {/* MIDDLE  */}
              <div className="z-20 absolute left-[30%] md:left-[29%] -translate-x-[50%]">
                <div
                  data-auto={`custom-path-component-middle-icon-all-page`}
                  className="rounded-full h-4 w-4 md:h-10 md:w-10 flex justify-center items-center bg-primary-content ring-4 ring-primary-content ring-opacity-50"
                >
                  <item.Icon className="text-primary text-md md:text-xl" />
                </div>
              </div>

              {/* RIGHT  */}
              <div
                data-auto={`custom-path-component-right-all-page`}
                className="order-1 overflow-hidden bg-base-300 border border-primary-content rounded-lg shadow-xl w-[67%]"
              >
                {item?.RightSection}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
}

CustomPathComponent.propTypes = {
  values: PropTypes.arrayOf(
    PropTypes.shape({
      LeftSection: PropTypes.node,
      Icon: PropTypes.elementType.isRequired,
      RightSection: PropTypes.node
    })
  )
};
