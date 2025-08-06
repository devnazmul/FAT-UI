import PropTypes from "prop-types";

const PreviewButton = ({ d }) => (
  <div className={`md:flex justify-center`}>
    <span
      className={`px-3 py-1 rounded-full text-center font-medium flex justify-center items-center border-2 w-fit`}
    >
      <div
        style={{
          borderColor: d?.color
        }}
        className={`w-4 h-4 border-2  rounded-full flex justify-center items-center mr-1`}
      >
        <div
          style={{
            backgroundColor: d?.color,
            borderColor: d?.color
          }}
          className={`w-2 h-2 border-2  rounded-full`}
        ></div>
      </div>
      <div className={`flex items-center gap-x-1`}>
        {d?.name?.split(" ")?.map((name, index) => (
          <span key={index}>{name}</span>
        ))}
      </div>
    </span>
  </div>
);

export default PreviewButton;

PreviewButton.propTypes = {
  d: PropTypes.shape({
    name: PropTypes.string.isRequired,
    color: PropTypes.string
  })
};
