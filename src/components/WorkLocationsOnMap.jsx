import useWorkLocations from "@/hooks/useWorkLocations.jsx";
import GoogleMapForWorkLocation from "./Map/GoogleMapForWorkLocation.jsx";

export default function WorkLocationsOnMap() {
  const { data, isLoading } = useWorkLocations({
    is_active: 1,
    show_my_data: 1
  });
  if (isLoading) {
    return (
      <div
        className={`shadow-md rounded-xl p-5 h-[30rem] screen1250:h-[22rem]`}
      >
        <div className={`flex items-center py-2 screen1250:pt-1`}>
          <div
            className={`bg-gray-200 animate-pulse w-32 h-6 rounded-md `}
          ></div>
        </div>

        <div
          className={`bg-gray-200 animate-pulse w-full h-[270px] mt-[10px] rounded-md `}
        ></div>
      </div>
    );
  }
  return (
    <div
      className={`shadow-md rounded-xl h-[30rem] screen1250:h-[22rem] overflow-hidden border relative`}
    >
      <div className={`absolute top-0 right-0 z-10 bg-white w-full shadow-lg`}>
        <div className={`p-5 gap-1 flex flex-col`}>
          <h5 className={`font-bold text-[0.9rem] uppercase`}>
            Work Locations
          </h5>
          <span className={` text-gray-400 text-sm`}>
            Your all work locations on one single map.
          </span>
        </div>
      </div>
      <GoogleMapForWorkLocation
        wrapClass="w-[100%] h-[100%]"
        optionalMarkers={data?.map((x) => ({
          title: x?.name,
          address: x?.address,
          latitude: Number(x?.latitude),
          longitude: Number(x?.longitude)
        }))}
        formData={{
          latitude: 51.475702,
          longitude: 0.002052
        }}
      />
    </div>
  );
}
