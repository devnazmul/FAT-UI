import PropTypes from "prop-types";

export default function Headings({
  className,
  level,
  children,
  dataAuto,
  onClick = (e) => e
}) {
  if (level === 1) {
    return (
      <h1
        onClick={onClick}
        data-auto={dataAuto}
        id={`level_1_headings`}
        className={`text-2xl font-bold ${className}`}
      >
        {children}
      </h1>
    );
  }
  if (level === 2) {
    return (
      <h2
        onClick={onClick}
        data-auto={dataAuto}
        id={`level_2_headings`}
        className={`text-xl font-bold ${className}`}
      >
        {children}
      </h2>
    );
  }
  if (level === 3) {
    return (
      <h3
        onClick={onClick}
        data-auto={dataAuto}
        id={`level_3_headings`}
        className={`text-lg font-bold ${className}`}
      >
        {children}
      </h3>
    );
  }
  if (level === 4) {
    return (
      <h4
        onClick={onClick}
        data-auto={dataAuto}
        id={`level_4_headings`}
        className={`text-md font-bold ${className}`}
      >
        {children}
      </h4>
    );
  }
  if (level === 5) {
    return (
      <h5
        onClick={onClick}
        data-auto={dataAuto}
        id={`level_5_headings`}
        className={`text-sm font-bold ${className}`}
      >
        {children}
      </h5>
    );
  }
  if (level === 6) {
    return (
      <h6
        onClick={onClick}
        data-auto={dataAuto}
        id={`level_6_headings`}
        className={`text-xs font-bold ${className}`}
      >
        {children}
      </h6>
    );
  }
}

Headings.propTypes = {
  className: PropTypes.string,
  level: PropTypes.number.isRequired,
  children: PropTypes.node.isRequired,
  dataAuto: PropTypes.string,
  onClick: PropTypes.func
};
