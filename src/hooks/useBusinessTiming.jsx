// ============================
// #00302
// ============================
import apiClient from "@/utils/apiClient.js";
import { useQuery } from "@tanstack/react-query";
import { handleApiError } from "../utils/apiErrorHandler";

export default function useBusinessTiming({ isBusinessId }) {
  // FETCH BUSINESS TIMING DATA
  const { data, isError, error, isLoading } = useQuery({
    queryKey: ["businessTiming"],
    queryFn: async ({ signal }) => {
      const { data } = await apiClient.get(`/v1.0/business-times`, { signal });
      return data;
    },
    // The query will not execute until the BusinessId exists
    enabled: !!isBusinessId,
    // ✅ Prevent refetching when tab regains focus
    refetchOnWindowFocus: false
  });

  if (isError) {
    if (error.response && error.response.status === 422) {
      const tempErrors = {};
      const responseData = error.response.data;
      if (responseData && responseData.errors) {
        const errors = responseData.errors;
        // Iterate through error keys and map them
        Object.keys(errors).forEach((key) => {
          const errorMessage = errors[key][0]; // Assuming there's only one error message per field
          tempErrors[key] = errorMessage;
        });
      }
      // setErrors(tempErrors);
    }

    handleApiError(error, "#00302");
  }

  return { data, error, isPending: isLoading };
}
