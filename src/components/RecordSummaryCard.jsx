import PropTypes from "prop-types";

export default function RecordSummaryCard({
  title,
  value,
  Icon,
  containerClass,
  textSize = "text-xl md:text-2xl"
}) {
  return (
    <div className={`border-2 p-2 rounded-lg ${containerClass}`}>
      {!!Icon && (
        <div>
          <Icon />
        </div>
      )}
      <h3 className={`font-medium text-gray-400`}>{title}</h3>
      <span className={`font-bold ${textSize}`}>{value}</span>
    </div>
  );
}

RecordSummaryCard.propTypes = {
  title: PropTypes.string,
  value: PropTypes.string,
  Icon: PropTypes.element,
  containerClass: PropTypes.string,
  textSize: PropTypes.string
};
