import { AdvancedMarker, Map } from "@vis.gl/react-google-maps";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useAuth } from "../../context/AuthContext.jsx";
import CustomLoading from "../CustomLoading.jsx";
import { Circle } from "./CircleGeometry.jsx";

export default function GoogleMap({
  formData,
  draggable = true,
  wrapClass = "w-[100%] h-[200px] md:h-[400px]",
  title = "",
  optionalMarkers = [],
  setFormData
}) {
  const { location: currentLocation } = useAuth();
  const [center, setCenter] = useState({
    lat: formData?.latitude,
    lng: formData?.longitude
  });

  const [location, setLocation] = useState({ latitude: null, longitude: null });
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setIsLoading(true);

    if (formData?.latitude || formData?.longitude) {
      setLocation({
        latitude: formData?.latitude,
        longitude: formData?.longitude
      });
      setCenter({ lat: formData?.latitude, lng: formData?.longitude });
      setIsLoading(false);
    } else if (currentLocation?.latitude && currentLocation?.longitude) {
      setLocation({
        latitude: currentLocation?.latitude,
        longitude: currentLocation?.longitude
      });
      setCenter({
        lat: currentLocation?.latitude,
        lng: currentLocation?.longitude
      });
      setIsLoading(false);
    } else {
      console.error("Geolocation is not supported by this browser.");
      // CREATE A SWEET ALERT HERE
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Geolocation is not supported by this browser."
      });
      setLocation({ latitude: null, longitude: null });
      setIsLoading(false);
    }
  }, [formData?.latitude, formData?.longitude]);

  const renderCustomPin = (center) => (
    <div className={`relative`}>
      <div
        className={`absolute z-10 bg-base-300 p-2 w-[150px] rounded-md shadow-md -top-10 -translate-y-1/2 left-1/2 -translate-x-1/2`}
      >
        <h1 className={`text-primary font-bold`}>{center?.title}</h1>
        <p>Lng: {center?.lng}</p>
        <p>Lat: {center?.lat}</p>
      </div>
      <img
        className="animate-pulse z-20"
        src={center.markerImage || "/assets/locationMarker.png"}
        width={40}
      />
    </div>
  );

  if (isLoading) {
    return <CustomLoading />;
  }
  return (
    <>
      <Map
        data-auto={`home-map-googleMapForGarages`}
        mapId={"ed79aa93f40c730x"}
        defaultCenter={{
          lat: location?.latitude,
          lng: location?.longitude
        }}
        defaultZoom={16}
        gestureHandling={"greedy"}
        disableDefaultUI={true}
        disableDoubleClickZoom={true}
        scaleControl={true}
        className={wrapClass}
        defaultTilt={10}
      >
        <Circle
          radius={Number(formData?.max_radius)}
          center={center}
          onRadiusChanged={() => {}}
          onCenterChanged={() => {}}
          strokeColor={"green"}
          strokeOpacity={1}
          strokeWeight={1}
          fillColor={"green"}
          fillOpacity={0.2}
          // draggable
        />

        <AdvancedMarker
          position={center}
          draggable={draggable}
          onDrag={(e) => {
            setFormData({
              ...formData,
              latitude: e.latLng?.lat() ?? 0,
              longitude: e.latLng?.lng() ?? 0
            });
            setCenter({ lat: e.latLng?.lat() ?? 0, lng: e.latLng?.lng() ?? 0 });
          }}
        >
          {renderCustomPin({ ...center, title: title })}
        </AdvancedMarker>
        {optionalMarkers?.map((Marker, i) => (
          <>
            {Marker?.radius && (
              <Circle
                radius={Number(Marker?.radius)}
                center={{
                  lat: Marker?.latitude,
                  lng: Marker?.longitude
                }}
                onRadiusChanged={() => {}}
                onCenterChanged={() => {}}
                strokeColor={Marker?.radius_strokeColor || "green"}
                strokeOpacity={1}
                strokeWeight={1}
                fillColor={Marker?.fillColor || "green"}
                fillOpacity={0.2}
                // draggable
              />
            )}
            <AdvancedMarker
              key={i}
              position={{
                lat: Marker.latitude,
                lng: Marker.longitude
              }}
            >
              {renderCustomPin({
                title: Marker.title,
                lat: Marker.latitude,
                lng: Marker.longitude,
                markerImage: Marker.markerImage
              })}
            </AdvancedMarker>
          </>
        ))}
      </Map>
    </>
  );
}

GoogleMap.propTypes = {
  formData: PropTypes.shape({
    latitude: PropTypes.number,
    longitude: PropTypes.number,
    max_radius: PropTypes.number
  }).isRequired,
  draggable: PropTypes.bool,
  wrapClass: PropTypes.string,
  title: PropTypes.string,
  optionalMarkers: PropTypes.arrayOf(
    PropTypes.shape({
      latitude: PropTypes.number.isRequired,
      longitude: PropTypes.number.isRequired,
      title: PropTypes.string,
      radius: PropTypes.number,
      radius_strokeColor: PropTypes.string,
      fillColor: PropTypes.string,
      markerImage: PropTypes.string
    })
  ),
  setFormData: PropTypes.func.isRequired
};
