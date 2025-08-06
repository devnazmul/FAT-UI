import { useEffect, useRef, useState } from "react";

export default function useFilterState(initialState) {
  const [filters, setFilters] = useState(initialState);

  // RESET PAGE ON FILTER CHANGE
  const prevFiltersRef = useRef(filters);
  useEffect(() => {
    const prev = prevFiltersRef.current;

    // Compare all keys except 'page'
    const hasChanged = Object.keys(filters).some((key) => {
      if (key === "page") return false;
      return filters[key] !== prev[key];
    });

    if (hasChanged) {
      setFilters((prevFilters) => ({ ...prevFilters, page: 1 }));
    }

    // Update ref for next comparison
    prevFiltersRef.current = filters;
  }, [filters]);
  return [filters, setFilters];
}
