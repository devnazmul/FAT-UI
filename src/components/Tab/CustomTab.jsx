import { motion } from "framer-motion";
import PropTypes from "prop-types";

const CustomTab = ({
  tabs,
  activeTab,
  setActiveTab,
  gridCol = "grid-cols-1",
  layoutId = "active-order-pil",
  dataAuto,
  width = "w-full sm:w-[370px]",
  roundness = "rounded-[5px]"
}) => (
  <div data-auto={`container-${dataAuto}`} className={``}>
    <div className={`py-3`}>
      <div
        className={`bg-gray-100 border border-primary text-sm transition-all duration-200 ${width} grid ${roundness} ${gridCol}  p-1 h-12`}
      >
        {tabs.map((ot, index) => (
          <button
            data-auto={`tab-${dataAuto}-${ot?.title}`}
            key={index}
            onClick={() => {
              setActiveTab(ot?.id);
            }}
            className={`${
              activeTab === ot?.id ? "" : ""
            } relative  ${roundness} `}
          >
            {activeTab === ot?.id && (
              <motion.div
                layoutId={layoutId}
                className={`${roundness} bg-gradient-to-tl to-primary shadow-md from-blue-900 absolute inset-0`}
              />
            )}

            <span
              className={`relative justify-center flex items-center gap-x-1 text-xs md:text-sm ${
                activeTab === ot?.id ? " text-white" : ""
              }`}
            >
              {ot.Icon ? <ot.Icon className={`text-lg`} /> : ""}
              {ot?.title}
            </span>
          </button>
        ))}
      </div>
    </div>
  </div>
);

export default CustomTab;

// PROPS TYPES
CustomTab.propTypes = {
  tabs: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.any,
      title: PropTypes.string,
      Icon: PropTypes.element
    })
  ).isRequired,
  activeTab: PropTypes.string,
  setActiveTab: PropTypes.func,
  gridCol: PropTypes.string,
  layoutId: PropTypes.any,
  dataAuto: PropTypes.string,
  width: PropTypes.string,
  roundness: PropTypes.string
};
