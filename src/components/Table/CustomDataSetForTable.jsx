import PropTypes from "prop-types";

export default function CustomDataSetForTable({
  columns = [],
  setColumns = () => {},
  top = false,
  bottom = true,
  left = false,
  right = false,
  dataAuto = ""
}) {
  const handleCheckChange = (event) => {
    const { name, checked } = event.target;

    setColumns((prevCols) =>
      prevCols.map((col) =>
        col.name === name ? { ...col, show: checked } : col
      )
    );
  };

  if (columns.length === 0) return null;

  return (
    <details
      className={`dropdown hidden md:block tooltip tooltip-primary ${
        bottom && "tooltip-bottom"
      } ${top && "tooltip-top"} ${right && "tooltip-right"} ${
        left && "tooltip-left"
      } w-auto z-40`}
      data-auto={`dataset-container-${dataAuto}`}
    >
      <summary className="relative flex justify-center items-center gap-1 py-2 rounded-lg w-28 transition-transform active:scale-90 text-base-300 bg-primary cursor-pointer">
        Columns
      </summary>
      <ul
        className="p-2 shadow menu dropdown-content z-[1] bg-base-200 rounded-box w-52"
        data-auto={`dataset-columns-list-${dataAuto}`}
      >
        {columns.map((col, i) => (
          <li key={i}>
            <label
              htmlFor={`${col?.name}-${i}`}
              data-auto={`custom-dataset-label${col?.name}-${dataAuto}`}
              className="flex justify-start gap-x-2 items-center"
            >
              <input
                data-auto={`custom-dataset-input${col?.name}-${dataAuto}`}
                onChange={handleCheckChange}
                type="checkbox"
                name={col?.name}
                id={`${col?.name}-${i}`}
                disabled={
                  columns.filter((col) => col.show).length === 3 && col.show
                }
                className="toggle toggle-xs toggle-primary"
                defaultChecked={col?.show}
              />
              <span>{col.name.toUpperCase()}</span>
            </label>
          </li>
        ))}
      </ul>
    </details>
  );
}

CustomDataSetForTable.propTypes = {
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      show: PropTypes.bool.isRequired
    })
  ).isRequired,
  setColumns: PropTypes.func.isRequired,
  top: PropTypes.bool,
  bottom: PropTypes.bool,
  left: PropTypes.bool,
  right: PropTypes.bool,
  dataAuto: PropTypes.string.isRequired
};
