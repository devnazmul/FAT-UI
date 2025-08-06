import { calculateBounds } from "@/utils/calculateBounds.js";
import { AdvancedMarker, Map } from "@vis.gl/react-google-maps";
import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";
import Swal from "sweetalert2";
import { useAuth } from "../../context/AuthContext.jsx";
import CustomLoading from "../CustomLoading.jsx";
import { Circle } from "./CircleGeometry.jsx";

export default function GoogleMapV2({
  formData,
  wrapClass = "w-[100%] h-[200px]",
  optionalMarkers = []
}) {
  const { location: currentLocation } = useAuth();
  const [, setCenter] = useState({
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
      // CREATE A SWEET ALERT HERE
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Geolocation is not supported by this browser."
      });
      setLocation({ latitude: null, longitude: null });
      setIsLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData?.latitude, formData?.longitude]);

  const renderCustomPin = (center) => (
    <div className={`group animate-bounce relative`}>
      <div
        className={` absolute z-10 bg-base-300 p-2 max-h-20  min-h-8 w-[150px] rounded-md shadow-md -top-5 -translate-y-1/2 left-1/2 -translate-x-1/2`}
      >
        <h1 className={`text-primary font-bold text-center`}>
          {center?.title}
        </h1>
        <div>
          {center?.description && (
            <p className={`text-sm text-center`}>{center?.description}</p>
          )}
        </div>
      </div>

      <img
        className=" z-20"
        src={center.markerImage || "/assets/locationMarker.png"}
        width={40}
      />
    </div>
  );

  const mapRef = useRef(null);

  useEffect(() => {
    if (mapRef.current && optionalMarkers.length > 0) {
      const bounds = new window.google.maps.LatLngBounds();

      optionalMarkers.forEach((location) => {
        bounds.extend(
          new window.google.maps.LatLng(location.latitude, location.longitude)
        );
      });

      mapRef.current.fitBounds(bounds);
    }
  }, [optionalMarkers]);

  if (isLoading) {
    return <CustomLoading />;
  }
  return (
    <>
      <Map
        ref={mapRef}
        data-auto={`home-map-googleMapForGarages`}
        mapId={"ed79aa93f40c730x"}
        defaultCenter={{
          lat: location?.latitude,
          lng: location?.longitude
        }}
        defaultZoom={16}
        defaultBounds={calculateBounds(optionalMarkers)}
        gestureHandling={"greedy"}
        disableDefaultUI={true}
        disableDoubleClickZoom={true}
        scaleControl={true}
        className={wrapClass}
        defaultTilt={10}
      >
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
                fillOpacity={0.1}
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

GoogleMapV2.propTypes = {
  formData: PropTypes.shape({
    latitude: PropTypes.number,
    longitude: PropTypes.number
  }).isRequired,
  wrapClass: PropTypes.string,
  optionalMarkers: PropTypes.arrayOf(
    PropTypes.shape({
      latitude: PropTypes.number,
      longitude: PropTypes.number,
      radius: PropTypes.number,
      radius_strokeColor: PropTypes.string,
      fillColor: PropTypes.string,
      title: PropTypes.string,
      markerImage: PropTypes.string
    })
  )
};
