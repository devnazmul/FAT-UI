import PropTypes from "prop-types";
import { CgMenuMotion } from "react-icons/cg";

export default function CustomDataSet({
  cols,
  setCols,
  top = false,
  bottom = true,
  left = false,
  right = false,
  dataAuto
}) {
  const handleCheckChange = (event) => {
    const { name, checked } = event.target;

    setCols((prevCols) =>
      prevCols.map((col) =>
        col.name === name ? { ...col, show: checked } : col
      )
    );
  };
  return (
    <details
      data-tip="Dataset"
      className={`dropdown hidden md:block tooltip tooltip-primary ${
        bottom && "tooltip-bottom"
      } ${top && "tooltip-top"} ${right && "tooltip-right"} ${
        left && "tooltip-left"
      } w-10 mt-1`}
      data-auto={`dataset-container-${dataAuto}`}
    >
      <summary className="bg-primary px-2 py-1 rounded-lg  tooltip tooltip-primary tooltip-bottom">
        {" "}
        <CgMenuMotion className="text-2xl text-base-300" />
      </summary>
      <ul
        className="p-2 shadow menu dropdown-content z-[1] bg-base-200 rounded-box w-52"
        data-auto={`dataset-columns-list-${dataAuto}`}
      >
        {cols.map((col, i) => (
          <li key={i}>
            <div
              data-auto={`custom-dataset-label${col?.name}-${dataAuto}`}
              className="flex justify-between"
            >
              <span>{col.name.toUpperCase()}</span>
              <input
                data-auto={`custom-dataset-input${col?.name}-${dataAuto}`}
                onChange={handleCheckChange}
                type="checkbox"
                name={col?.name}
                disabled={
                  cols.filter((col) => col.show).length === 1 && col.show
                }
                className="toggle toggle-xs toggle-primary"
                defaultChecked={col?.show}
              />
            </div>
          </li>
        ))}
      </ul>
    </details>
  );
}

CustomDataSet.propTypes = {
  cols: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      show: PropTypes.bool.isRequired
    })
  ).isRequired,
  setCols: PropTypes.func.isRequired,
  top: PropTypes.bool,
  bottom: PropTypes.bool,
  left: PropTypes.bool,
  right: PropTypes.bool,
  dataAuto: PropTypes.string.isRequired
};
