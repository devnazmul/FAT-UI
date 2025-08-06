import PropTypes from "prop-types";
import { FiX } from "react-icons/fi";
import { formatText } from "../../utils/formatText";

export default function AppliedFilters({ filters, setFilters }) {
  return (
    <div className={`flex-wrap`}>
      {filters.filter(
        (f) =>
          (f?.defaultValue !== undefined && f.defaultValue !== "") ||
          (f?.defaultSelectedValues !== undefined &&
            f?.defaultSelectedValues?.length > 0)
      )?.length > 0 ? (
        <span className={`text-sm font-semibold`}>Filters: </span>
      ) : (
        ""
      )}
      <br />
      {filters
        .filter(
          (f) =>
            (f?.defaultValue !== undefined && f.defaultValue !== "") ||
            (f?.defaultSelectedValues !== undefined &&
              f?.defaultSelectedValues?.length > 0)
        )
        .map((f, i) => (
          <span
            key={i}
            className={`bg-primary cursor-pointer z-10 px-2 text-xs py-1 shadow-md border border-primary text-base-300 rounded-[5px] my-1 mx-1 inline-flex gap-2 items-center`}
          >
            <span className={`font-bold`}>{formatText(f?.label)}: </span>
            {f?.defaultValue !== undefined
              ? f?.defaultValue
              : f?.options
              ? f?.options
                  ?.filter((opt) =>
                    f?.defaultSelectedValues.some((dv) => opt?.value === dv)
                  )
                  ?.map((opt) => opt?.label)
                  ?.join(", ")
              : f?.defaultSelectedValues?.map((opt) => opt)?.join(", ")}
            <button
              data-auto={`applied-filters-delete-button-all-page`}
              onClick={() => {
                setFilters((prev) => ({
                  ...prev,
                  [f?.id]: "",
                }));
              }}
            >
              <FiX
                className={`text-base-300 text-md hover:bg-red-500 rounded-full hover:text-base-300`}
              />
            </button>
          </span>
        ))}
    </div>
  );
}

AppliedFilters.propTypes = {
  filters: PropTypes.array.isRequired,
  setFilters: PropTypes.func.isRequired,
};
