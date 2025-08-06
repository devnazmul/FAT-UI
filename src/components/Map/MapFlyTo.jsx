import { useMap } from "@vis.gl/react-google-maps";
import { useEffect } from "react";

const MapFlyTo = ({ formData }) => {
  const { map } = useMap("my-map");

  useEffect(() => {
    console.warn("Map in effect:", map);
    const timer = setTimeout(() => {
      if (map && formData?.latitude && formData?.longitude) {
        console.warn({ loaded: "map is loaded" });
        map.setCenter({
          lat: formData.latitude,
          lng: formData.longitude
        });
      }
    }, 1000); // Adjust the delay as necessary (1000ms = 1s)

    return () => clearTimeout(timer); // Clean up timer on unmount
  }, [map, formData?.latitude, formData?.longitude]);

  return null;
};

export default MapFlyTo;
