import { formatText } from "@/utils/formatText";
import PropTypes from "prop-types";
import { RxCrossCircled } from "react-icons/rx";

const FiltersResult = ({ filters, setFilters }) => {
  // Display the filters that are currently applied
  const activeFilters = filters.filter(
    (filter) => filter?.defaultSelectedValues?.length > 0
  );

  // Remove a filter
  const handleRemoveFilter = (filterId) => {
    setFilters((prev) => ({
      ...prev,
      [filterId]: [],
    }));
  };

  // Render the selected values for a filter
  const renderFilterValues = (filter) => {
    if (filter?.defaultSelectedValues) {
      return Array.isArray(filter.defaultSelectedValues)
        ? filter.defaultSelectedValues
            .map(
              (value) =>
                filter?.options?.find((opt) => opt?.id === value)?.label ||
                value
            )
            .join(", ")
        : filter.defaultSelectedValues;
    }
    return "";
  };

  // Return the applied filters
  return (
    <section className="applied-filters">
      {/* // Check if there are any active filters */}
      {activeFilters.length > 0 && (
        <>
          {/* Display a label for the filters */}
          <span className="text-lg font-semibold">Filters: </span>
          <br />
        </>
      )}
      {/* Iterate over each active filter and display it */}
      {activeFilters.map((filter, index) => (
        <span
          key={index}
          className="bg-primary-content cursor-pointer z-10 px-5 py-[0.25rem] border-2 border-primary text-primary rounded-lg my-1 mx-1 inline-flex gap-2 items-center"
        >
          {/* Format and display the filter label */}
          {formatText(filter?.label)}: {renderFilterValues(filter)}
          {/* Button to remove the filter */}
          <button
            data-auto="applied-filters-delete-button-all-page"
            onClick={() => handleRemoveFilter(filter?.id)}
          >
            <RxCrossCircled className="text-primary text-xl hover:bg-red-500 rounded-full hover:text-base-300" />
          </button>
        </span>
      ))}
    </section>
  );
};

FiltersResult.propTypes = {
  filters: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      label: PropTypes.string,
      defaultSelectedValues: PropTypes.oneOfType([
        PropTypes.array,
        PropTypes.string,
        PropTypes.number,
      ]),
      options: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
          label: PropTypes.string,
        })
      ),
    })
  ).isRequired,
  setFilters: PropTypes.func.isRequired,
};

export default FiltersResult;
