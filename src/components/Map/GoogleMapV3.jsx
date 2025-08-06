import { calculateBounds } from "@/utils/calculateBounds.js";
import { encryptID } from "@/utils/encryptAndDecryptID.js";
import { getFullImageLink } from "@/utils/getFullImageLink.js";
import { getFullName } from "@/utils/getFullName.js";
import { getRoundedImageLikeProfile } from "@/utils/getRoundedImageLikeProfile.jsx";
import { AdvancedMarker, Map } from "@vis.gl/react-google-maps";
import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";
import Swal from "sweetalert2";
import { useAuth } from "../../context/AuthContext.jsx";
import CustomLoading from "../CustomLoading.jsx";
import { OutsideClickHandler } from "../OutsideClickHandler.jsx";
import { Circle } from "./CircleGeometry.jsx";

export default function GoogleMapV3({
  formData,
  wrapClass = "w-[100%] h-[200px]",
  optionalMarkers = []
}) {
  const [isActive, setIsActive] = useState(false);
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
    <OutsideClickHandler
      onClick={() => {
        setIsActive(data?.id);
      }}
      className={`group relative`}
      onOutsideClick={() => {
        setIsActive(null);
      }}
    >
      <OutsideClickHandler
        onClick={() => {
          setIsActive(data?.id);
        }}
        className={`${isActive === data?.id ? "w-[350px] h-[200px] rounded-xl" : "w-[70px] h-[70px]"}  transition-all border border-zinc-300 rounded-full self-center flex employee-map-pin before:bg-base-300 bg-base-300 bottom-0 p-5 shadow-xl  `}
      >
        {data?.employee_wise_records?.length > 1 ? (
          <div
            className={`${isActive === data?.id ? "hidden" : "grid"}  grid-cols-2 z-20 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full w-[60px] h-[60px] object-cover gap-0 text-base-300 text-xs overflow-hidden`}
          >
            {data?.employee_wise_records
              ?.slice(0, 4)
              ?.map((employee, index) => {
                if (index === 3) {
                  return (
                    <div
                      key={index}
                      className={`w-[30px] h-[30px] object-cover border-[1px] flex justify-center items-center border-zinc-200 text-primary text-xs font-bold`}
                    >
                      <span>+{data?.employee_wise_records?.length - 3}</span>
                    </div>
                  );
                } else {
                  return employee?.image ? (
                    <img
                      key={index}
                      className={`w-[30px] h-[30px] object-cover border-[1px] border-zinc-200`}
                      src={
                        employee?.image
                          ? getFullImageLink(employee?.image)
                          : "/assets/locationMarker.png"
                      }
                      alt={getFullName(employee)}
                    />
                  ) : (
                    <div
                      className={`w-[30px] h-[30px] object-cover bg-primary border-[1px] border-zinc-200 uppercase flex justify-center items-center`}
                    >
                      <span>{`${employee?.first_Name?.slice(0, 1)}${
                        employee?.middle_Name
                          ? employee?.middle_Name?.slice(0, 1)
                          : ""
                      }${employee?.last_Name?.slice(0, 1)}`}</span>
                    </div>
                  );
                }
              })}
          </div>
        ) : data?.employee_wise_records[0].image ? (
          <img
            className={`${isActive === data?.id ? "hidden" : "flex"}  z-20 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full w-[60px] h-[60px] object-cover`}
            src={
              data?.employee_wise_records[0].image
                ? getFullImageLink(data?.employee_wise_records[0].image)
                : "/assets/locationMarker.png"
            }
          />
        ) : (
          <div
            className={`${isActive === data?.id ? "hidden" : "flex"}  z-20 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full w-[60px] h-[60px] object-cover bg-primary text-base-300 flex justify-center items-center text-lg uppercase`}
          >
            <span>{`${data?.employee_wise_records[0]?.first_Name?.slice(0, 1)}${
              data?.employee_wise_records[0]?.middle_Name
                ? data?.employee_wise_records[0]?.middle_Name?.slice(0, 1)
                : ""
            }${data?.employee_wise_records[0]?.last_Name?.slice(0, 1)}`}</span>
          </div>
        )}
        {isActive === data?.id && (
          <OutsideClickHandler
            onClick={() => {
              setIsActive(data?.id);
            }}
            className={` w-full delay-500 overflow-y-auto space-y-5`}
          >
            {data?.employee_wise_records?.map((employee, index) => (
              <div key={index} className={`space-y-3`}>
                <div className={`flex items-center gap-2`}>
                  {getRoundedImageLikeProfile(employee)}
                  <div className="flex flex-col">
                    <div
                      className={`text-primary font-medium link link-hover`}
                      to={`/employee/view/${encryptID(
                        employee?.id
                      )}?tab=personal_details`}
                    >
                      {getFullName(employee)}
                    </div>
                  </div>
                </div>
                <div className={`space-y-2`}>
                  {employee?.array_of_records?.map((record, index) => (
                    <div
                      key={index}
                      className={` rounded-lg border p-5 shadow-md border-primary-content relative overflow-hidden bg-base-200`}
                    >
                      <div
                        className={`absolute top-0 left-0 bg-primary w-6 h-6 flex items-center justify-center rounded-br-lg text-base-100`}
                      >
                        {index + 1}
                      </div>
                      {/* START AT - END AT */}
                      <span className={`my-2 block`}>
                        <span className={`font-bold text-primary`}>
                          {record?.in_time}{" "}
                        </span>
                        <span className={``}>To</span>
                        <span className={`font-bold text-primary`}>
                          {" "}
                          {record?.out_time}
                        </span>
                      </span>

                      <div className={`flex items-center gap-x-2`}>
                        <span className={`font-bold`}>Total:</span>{" "}
                        {record?.total}
                      </div>

                      <div className={`flex items-center gap-x-2`}>
                        <span className={`font-bold `}>Break:</span>{" "}
                        <span
                          className={`${record?.is_paid_break ? "text-green-500" : "text-red-500"}`}
                        >
                          {record?.break_hours}
                        </span>
                      </div>
                      <div className={`flex items-center gap-x-2`}>
                        <span className={`font-bold`}>Project:</span>{" "}
                        {record?.projects?.map((p) => p?.name)?.join(", ")}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </OutsideClickHandler>
        )}
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

GoogleMapV3.propTypes = {
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
