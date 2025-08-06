import { StandaloneSearchBox } from "@react-google-maps/api";
import React, { useRef } from "react";

const CustomAutoComplete = ({
  id,
  placeholder,
  className,
  name,
  value,
  style,
  setFormData,
  defaultValue,
  datatestid = "",
  setPlaceAutoComplete,
  isMeasureDistance = false,
  onChange,
  disable,
  visibleBorder = false,
  dataAuto
}) => {
  const inputRef = useRef();

  const handlePlaceChanged = () => {
    const [place] = inputRef.current.getPlaces();

    const { lat, lng } = place.geometry.location;
    if (isMeasureDistance) {
      setPlaceAutoComplete(place);
      // Extract latitude and longitude values
      setFormData((prev) => ({
        ...prev,
        address_line_1: place?.formatted_address
          ? place?.formatted_address
          : "",
        city: `${
          place?.address_components?.find(
            (i) =>
              i?.types?.includes("locality") ||
              i?.types?.includes("postal_town")
          )?.long_name
            ? place?.address_components?.find(
                (i) =>
                  i?.types?.includes("locality") ||
                  i?.types?.includes("postal_town")
              )?.long_name
            : ""
        }`,
        country: `${
          place?.address_components?.find((i) => i?.types?.includes("country"))
            ?.long_name
            ? place?.address_components?.find((i) =>
                i?.types?.includes("country")
              )?.long_name
            : ""
        }`,
        country_code: `${
          place?.address_components?.find((i) => i?.types.includes("country"))
            ?.short_name
            ? place?.address_components?.find((i) =>
                i?.types.includes("country")
              )?.short_name
            : ""
        }`,
        postcode: `${
          place?.address_components?.find((i) =>
            i?.types?.includes("postal_code")
          )?.long_name
            ? place?.address_components?.find((i) =>
                i?.types?.includes("postal_code")
              )?.long_name
            : ""
        }`,
        lat: `${lat()}`,
        long: `${lng()}`
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        address_line_1: place?.formatted_address
          ? place?.formatted_address
          : "",
        city: `${
          place?.address_components?.find(
            (i) =>
              i?.types?.includes("locality") ||
              i?.types?.includes("postal_town")
          )?.long_name
            ? place?.address_components?.find(
                (i) =>
                  i?.types?.includes("locality") ||
                  i?.types?.includes("postal_town")
              )?.long_name
            : ""
        }`,
        country: `${
          place?.address_components?.find((i) => i?.types?.includes("country"))
            ?.long_name
            ? place?.address_components?.find((i) =>
                i?.types?.includes("country")
              )?.long_name
            : ""
        }`,
        country_code: `${
          place?.address_components?.find((i) => i?.types.includes("country"))
            ?.short_name
            ? place?.address_components?.find((i) =>
                i?.types.includes("country")
              )?.short_name
            : ""
        }`,
        postcode: `${
          place?.address_components?.find((i) =>
            i?.types?.includes("postal_code")
          )?.long_name
            ? place?.address_components?.find((i) =>
                i?.types?.includes("postal_code")
              )?.long_name
            : ""
        }`,
        lat: `${lat()}`,
        long: `${lng()}`
      }));
    }
  };

  return (
    <StandaloneSearchBox
      onLoad={(ref) => (inputRef.current = ref)}
      onPlacesChanged={handlePlaceChanged}
    >
      <input
        data-auto={dataAuto}
        disabled={disable}
        id={id}
        type="text"
        placeholder={placeholder}
        autoComplete="off"
        name={name}
        value={value}
        data-testid={datatestid}
        style={style}
        onChange={onChange}
        className={`${className} ${
          disable &&
          `px-1 disabled:text-gray-700 ${
            visibleBorder && "disabled:border-gray-200 border-opacity-10 px-4"
          }`
        } focus:outline-primary bg-base-300`}
        defaultValue={defaultValue}
      />
    </StandaloneSearchBox>
  );
};

export default CustomAutoComplete;
