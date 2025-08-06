import PropTypes from "prop-types";

export default function CustomPathComponentV2({ values = [] }) {
  return (
    <div className="w-full">
      {values.length > 0 ? (
        <div className="relative wrap overflow-hidden h-full pl-2">
          {/* THIS IS THE VERTICAL LINE  */}
          <div className="border-2-2 absolute border-dashed border-primary mt-9 h-[65%] border left-[3%] -translate-x-[50%]"></div>

          {/* SECTIONS  */}
          {values?.map((item, index) => (
            <div
              key={index}
              className="flex mb-10 justify-between items-start w-full gap-5 mt-8"
            >
              {/* MIDDLE  */}
              <div className="z-20 absolute left-[3%]  -translate-x-[50%]">
                <div className="rounded-full h-4 w-4  flex justify-center items-center bg-primary ring-4 ring-primary ring-opacity-50">
                  {item.Icon ? (
                    <item.Icon className="text-primary text-md md:text-xl" />
                  ) : (
                    ""
                  )}
                </div>
              </div>

              {/* RIGHT  */}
              <div className="order-1 ml-10 -mt-[0.8rem] overflow-hidden bg-base-300 rounded-lg shadow-xl w-[95%]">
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

CustomPathComponentV2.propTypes = {
  values: PropTypes.arrayOf(
    PropTypes.shape({
      Icon: PropTypes.elementType,
      RightSection: PropTypes.node
    })
  )
};
