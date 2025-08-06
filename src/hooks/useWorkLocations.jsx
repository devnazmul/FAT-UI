// ============================
// #00323
// ============================

import apiClient from "@/utils/apiClient.js";
import { useQuery } from "@tanstack/react-query";
import { handleApiError } from "../utils/apiErrorHandler";

export default function useWorkLocations({
  is_active = "",
  user_id = "",
  enabled = true,
  show_my_data = ""
}) {
  // database query key
  const queryParams = new URLSearchParams({
    is_active,
    user_id,
    show_my_data
  });
  const { data, error, isError, isLoading, isPending, isRefetching } = useQuery(
    {
      queryKey: ["work-sites"],
      queryFn: async ({ signal }) => {
        const { data } = await apiClient.get(
          `/v1.0/work-locations?${queryParams}`,
          { signal }
        );
        return data;
      },
      select: (data) =>
        data.map((workSite) => ({
          ...workSite,
          id: workSite?.id,
          label: workSite?.name,
          is_default: workSite?.is_default,
          business_id: workSite?.business_id
        })),
      enabled: enabled,
      // ✅ Prevent refetching when tab regains focus
      refetchOnWindowFocus: false
    }
  );

  if (isError) {
    handleApiError(error, "#00323");
  }

  return { data, error, isError, isLoading, isPending, isRefetching };
}
