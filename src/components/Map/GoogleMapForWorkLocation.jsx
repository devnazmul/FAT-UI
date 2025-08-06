import { calculateBounds } from "@/utils/calculateBounds.js";
import { AdvancedMarker, Map } from "@vis.gl/react-google-maps";
import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";
import { HiOutlineOfficeBuilding } from "react-icons/hi";
import Swal from "sweetalert2";
import { useAuth } from "../../context/AuthContext.jsx";
import CustomLoading from "../CustomLoading.jsx";
import { OutsideClickHandler } from "../OutsideClickHandler.jsx";
import { Circle } from "./CircleGeometry.jsx";

export default function GoogleMapForWorkLocation({
  formData,
  wrapClass = "w-[100%] h-[200px]",
  optionalMarkers = []
}) {
  const { location: currentLocation } = useAuth();

  const [location, setLocation] = useState({ latitude: null, longitude: null });
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setIsLoading(true);

    if (formData?.latitude || formData?.longitude) {
      setLocation({
        latitude: formData?.latitude,
        longitude: formData?.longitude
      });

      setIsLoading(false);
    } else if (currentLocation?.latitude && currentLocation?.longitude) {
      setLocation({
        latitude: currentLocation?.latitude,
        longitude: currentLocation?.longitude
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
  }, [formData?.latitude, formData?.longitude]);

  const renderCustomPin = (data) => (
    <OutsideClickHandler className={`group relative`}>
      <OutsideClickHandler
        className={` w-[70px] h-[70px] transition-all border border-zinc-300 rounded-full self-center flex employee-map-pin before:bg-base-300 bg-base-300 bottom-0 shadow-xl  justify-center items-center relative`}
      >
        <div
          className={`absolute flex flex-col bottom-16 border left-1/2 -translate-x-1/2 bg-base-300 px-3 py-1 rounded-lg min-w-32 max-w-52 text-center`}
        >
          <span className={`text-primary font-bold`}>{data?.title}</span>
          <span className={`text-gray-400`}> {data?.address}</span>
        </div>
        <div
          className={`w-[60px] h-[60px] bg-primary rounded-full z-40 flex justify-center items-center`}
        >
          <HiOutlineOfficeBuilding className={`text-base-300 text-3xl`} />
        </div>
      </OutsideClickHandler>
    </OutsideClickHandler>
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
        // NEED ONLY ZOOM CONTOLL WITH THER CONTROLLER NOT USING MOSE WHEEL
        ref={mapRef}
        data-auto={`home-map-googleMapForGarages`}
        mapId={"ed79aa93f40c730x"}
        defaultCenter={
          optionalMarkers?.length
            ? undefined // Let `defaultBounds` handle it
            : { lat: location?.latitude, lng: location?.longitude }
        }
        defaultZoom={optionalMarkers?.length ? undefined : 10}
        gestureHandling="cooperative"
        scrollwheel={false}
        zoomControl={true}
        defaultBounds={
          optionalMarkers?.length ? calculateBounds(optionalMarkers) : undefined
        }
        // defaultBounds={
        //   optionalMarkers?.length
        //     ? calculateBounds(optionalMarkers)
        //     : calculateBounds([location])
        // }
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
                ...Marker,
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

GoogleMapForWorkLocation.propTypes = {
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
