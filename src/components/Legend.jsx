import { formatText } from "@/utils/formatText.js";
import PropTypes from "prop-types";

export default function Legend({ data }) {
  return (
    <div
      className={`md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-8 grid-cols-1 grid gap-2 mb-5`}
    >
      {data?.map(({ bgClassNames, text, textClassNames }, index) => (
        <div key={index} className={`flex items-center gap-x-1`}>
          <div className={`w-5 h-5 rounded-md ${bgClassNames}`} />{" "}
          <span className={`text-xs ${textClassNames}`}>
            {formatText(text)}
          </span>
        </div>
      ))}
    </div>
  );
}

Legend.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      bgClassNames: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,
      textClassNames: PropTypes.string.isRequired,
    })
  ),
};
