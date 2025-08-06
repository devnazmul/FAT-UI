// ============================
// #00325
// ============================

import apiClient from "@/utils/apiClient.js";
import { useQuery } from "@tanstack/react-query";
import { handleApiError } from "../utils/apiErrorHandler";

export default function useWorkSites({
  is_active = "",
  user_id = "",
  enabled = true
} = {}) {
  // database query key
  const queryParams = new URLSearchParams({
    is_active,
    user_id
  });

  const { data, error, isError, isLoading, isPending, refetch, isRefetching } =
    useQuery({
      queryKey: ["work-sites"],
      queryFn: async ({ signal }) => {
        const { data } = await apiClient.get(
          `/v1.0/work-locations?${queryParams}`,
          { signal }
        );
        return data;
      },
      enabled: enabled,
      select: (data) =>
        data?.length > 0
          ? data?.map((workSite) => ({
              ...workSite,
              id: workSite?.id,
              label: workSite?.name,
              is_default: workSite?.is_default,
              business_id: workSite?.business_id,
              latitude: workSite?.latitude,
              longitude: workSite?.longitude,
              max_radius: workSite?.max_radius,
              is_location_enabled: workSite?.is_location_enabled,
              is_geo_location_enabled: workSite?.is_geo_location_enabled,
              ip_address: workSite?.ip_address
            }))
          : [],
      // ✅ Prevent refetching when tab regains focus
      refetchOnWindowFocus: false
    });

  if (isError) {
    handleApiError(error, "#00325");
  }

  return { data, error, isError, isLoading, isPending, refetch, isRefetching };
}
