import PropTypes from "prop-types";
export default function CustomMultiStepper({ steps = [], currentStep = 1 }) {
  return (
    <ul className="steps w-full  md:w-1/2">
      {steps.map((step, index) => (
        <li
          onClick={() => step?.onCLickHandler()}
          role="button"
          key={index}
          data-content={currentStep > step?.serial ? "✓" : null}
          className={`step  ${
            currentStep >= step?.serial ? "step-primary" : "step-custom"
          } `}
        >
          {step?.title}
        </li>
      ))}
    </ul>
  );
}

CustomMultiStepper.propTypes = {
  steps: PropTypes.arrayOf(
    PropTypes.shape({
      serial: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      onCLickHandler: PropTypes.func
    })
  ),
  currentStep: PropTypes.number
};
