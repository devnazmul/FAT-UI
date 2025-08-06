import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { FiX } from "react-icons/fi";
import Popup from "reactjs-popup";
import CustomField from "../InputFields/CustomField";
import CustomNumberField from "../InputFields/CustomNumberField";
import CustomDatePicker from "../InputFields/CustomDatePicker";
import CustomDatePickerV2 from "../InputFields/CustomDatePickerV2";
import CustomMultiSelect from "../InputFields/CustomMultiSelect";
import { formatText } from "@/utils/formatText";
import { arrayToObject } from "@/utils/arrayToObject";
import CustomLoading from "../CustomLoading";

export default function FilterButton({
  isLoading,
  onApplyChange,
  options,
  closeButtonHidden = false,
  setFilterOptions,
  dataAuto,
}) {
  // State to store selected filters
  const [selectedFilters, setSelectedFilters] = useState({});

  // State to store popup options
  const [popupOptions, setPopupOptions] = useState({
    open: false,
    type: "",
    onClose: () => {
      setPopupOptions({
        open: false,
        type: "",
        onClose: popupOptions.onClose,
        overlayStyle: { background: "red" },
        closeOnDocumentClick: false,
      });
    },
    overlayStyle: { background: "red" },
    closeOnDocumentClick: false,
  });

  // State to store the selected filter
  const [isMobile, setIsMobile] = useState(window.innerWidth < 640);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 640);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Custom popup style
  const customPopupStyle = isMobile
    ? {
        margin: "0px",
        width: "100%",
      }
    : {
        position: "absolute",
        right: 0,
        top: 0,
        height: "100vh",
        width: "500px",
      };

  // Function to render the selected filter
  const renderField = (option, index) => {
    switch (option.type) {
      case "text":
        // if case is text then return text field
        return (
          <CustomField
            key={index}
            value={selectedFilters[option?.id]}
            fieldClassName={"w-full"}
            label={option?.label}
            id={option?.id}
            name={option?.id}
            onChange={(e) =>
              setSelectedFilters((prev) => ({
                ...prev,
                [option?.id]: [e?.target?.value],
              }))
            }
            placeholder={option?.label}
            type={"text"}
            wrapperClassName={"w-full"}
          />
        );
      case "email":
        // if case is email then return email field
        return (
          <CustomField
            key={index}
            value={selectedFilters[option?.id]}
            fieldClassName={"w-full"}
            label={option?.label}
            id={option?.id}
            name={option?.id}
            onChange={(e) =>
              setSelectedFilters((prev) => ({
                ...prev,
                [option?.id]: e?.target?.value,
              }))
            }
            placeholder={option?.label}
            type={"email"}
            wrapperClassName={"w-full"}
          />
        );
      case "number":
        // if case is number then return number field
        return (
          <CustomNumberField
            key={index}
            value={selectedFilters[option?.id]}
            fieldClassName={"w-full"}
            label={option?.label}
            id={option?.id}
            name={option?.id}
            onChange={(e) =>
              setSelectedFilters((prev) => ({
                ...prev,
                [option?.id]: e?.target?.value,
              }))
            }
            placeholder={option?.label}
            type={"number"}
            wrapperClassName={"w-full"}
          />
        );

      case "single-date":
        // if case is single date then return single date field
        return (
          <CustomDatePickerV2
            key={index}
            top={index > 4}
            format="dd-LL-yyyy"
            defaultDate={
              Array.isArray(selectedFilters[option?.id])
                ? selectedFilters[option?.id]?.length === 0
                  ? ""
                  : selectedFilters[option?.id][0] || ""
                : selectedFilters[option?.id] || ""
            }
            from={option?.from}
            to={option?.to}
            right
            fieldClassName={"w-full"}
            id={option?.id}
            label={option?.label}
            name={option?.id}
            onChange={(e) => {
              setSelectedFilters((prev) => ({
                ...prev,
                [option?.id]: e,
              }));
            }}
            placeholder={option?.label}
            type={option?.type}
            wrapperClassName={"w-full"}
            dataAuto="custom-filter-single"
          />
        );

      case "multi-select":
        // if case is multi select then return multi select field
        return (
          <CustomMultiSelect
            key={index}
            top={index > 4}
            label={option?.label}
            singleSelect={false}
            options={option?.options}
            defaultValue={
              selectedFilters[option?.id]?.length > 0
                ? selectedFilters[option?.id]
                : []
            }
            onChange={(e) =>
              setSelectedFilters((prev) => ({
                ...prev,
                [option?.id]: e?.map((opt) => opt?.id),
              }))
            }
          />
        );
      case "single-select":
        // if case is single select then return single select field
        return (
          <CustomMultiSelect
            key={index}
            top={index > 4}
            label={option?.label}
            disable={option?.disable}
            singleSelect
            options={option?.options}
            defaultValue={
              selectedFilters[option?.id]?.length > 0
                ? selectedFilters[option?.id]
                : []
            }
            onChange={(e) => {
              setSelectedFilters((prev) => ({
                ...prev,
                [option?.id]: e?.map((opt) => opt?.id),
              }));
            }}
          />
        );
      case "date-range":
        // if case is date range then return date range field
        return (
          <div key={index} className={`flex gap-2`}>
            {/* START  */}
            <CustomDatePicker
              defaultDate={
                selectedFilters[option?.id]?.length > 0
                  ? selectedFilters[option?.id][0]
                  : ""
              }
              disableBeforeDate={option?.from}
              disableAfterDate={
                selectedFilters[option?.id]?.length > 0
                  ? selectedFilters[option?.id][1]
                  : ""
              }
              fieldClassName={"w-full"}
              id={option?.id}
              label={`${formatText(option?.label)} Start Date`}
              name={option?.id}
              onChange={(e) => {
                const arr = [];
                if (selectedFilters[option?.id][1] === undefined) {
                  arr[1] = "";
                } else {
                  arr[1] = selectedFilters[option?.id][1];
                }
                arr[0] = e;

                if (arr.every((element) => element === "")) {
                  setSelectedFilters((prev) => ({
                    ...prev,
                    [option?.id]: [],
                  }));
                } else {
                  setSelectedFilters((prev) => ({
                    ...prev,
                    [option?.id]: arr,
                  }));
                }
              }}
              placeholder={`${formatText(option?.label)} Start Date`}
              type={option?.type}
              wrapperClassName={"w-full"}
              dataAuto="custom-filter-start"
            />

            {/* END  */}
            <CustomDatePicker
              // format="dd-LL-yyyy"
              defaultDate={
                selectedFilters[option?.id]?.length > 0
                  ? selectedFilters[option?.id][1]
                  : ""
              }
              disableBeforeDate={
                selectedFilters[option?.id]?.length > 0
                  ? selectedFilters[option?.id][0]
                  : ""
              }
              disableAfterDate={option?.to}
              right
              fieldClassName={"w-full"}
              id={option?.id}
              // top={index > 3}
              label={`${formatText(option?.label)} End Date`}
              name={option?.id}
              onChange={(e) => {
                const arr = [];
                if (selectedFilters[option?.id][0] === undefined) {
                  arr[0] = "";
                } else {
                  arr[0] = selectedFilters[option?.id][0];
                }
                arr[1] = e;

                if (arr.every((element) => element === "")) {
                  setSelectedFilters((prev) => ({
                    ...prev,
                    [option?.id]: [],
                  }));
                } else {
                  setSelectedFilters((prev) => ({
                    ...prev,
                    [option?.id]: arr,
                  }));
                }
              }}
              placeholder={`${formatText(option?.label)} End Date`}
              type={option?.type}
              wrapperClassName={"w-full"}
              dataAuto="custom-filter-end"
            />
          </div>
        );
      case "range":
        // if case is range then return range field
        return (
          <div key={index} className={`flex gap-2`}>
            <CustomNumberField
              value={
                Array.isArray(selectedFilters[option?.id])
                  ? selectedFilters[option?.id].length > 0
                    ? selectedFilters[option?.id][0]
                    : ""
                  : ""
              }
              fieldClassName={"w-full"}
              label={`${option?.label} From`}
              max={
                Array.isArray(selectedFilters[option?.id])
                  ? selectedFilters[option?.id].length > 0
                    ? selectedFilters[option?.id][1]
                    : 0
                  : 0
              }
              id={option?.id}
              name={option?.id}
              top={index > 3}
              onChange={(e) => {
                const arr = [];
                if (selectedFilters[option?.id][1] === undefined) {
                  arr[1] = "";
                } else {
                  arr[1] = selectedFilters[option?.id][1];
                }
                arr[0] = e?.target?.value;
                setSelectedFilters((prev) => ({
                  ...prev,
                  [option?.id]: arr,
                }));
              }}
              placeholder={`${option?.label} From`}
              type={"number"}
              wrapperClassName={"w-full"}
            />
            <CustomNumberField
              value={
                Array.isArray(selectedFilters[option?.id])
                  ? selectedFilters[option?.id].length > 0
                    ? selectedFilters[option?.id][1]
                    : ""
                  : ""
              }
              fieldClassName={"w-full"}
              label={`${option?.label} To`}
              min={
                Array.isArray(selectedFilters[option?.id])
                  ? selectedFilters[option?.id].length > 0
                    ? selectedFilters[option?.id][0]
                    : ""
                  : ""
              }
              id={option?.id}
              name={option?.id}
              top={index > 3}
              onChange={(e) => {
                const arr = [];
                if (selectedFilters[option?.id][0] === undefined) {
                  arr[0] = "";
                } else {
                  arr[0] = selectedFilters[option?.id][0];
                }

                arr[1] = e?.target?.value;

                if (arr.every((element) => element === "")) {
                  setSelectedFilters((prev) => ({
                    ...prev,
                    [option?.id]: [],
                  }));
                } else {
                  setSelectedFilters((prev) => ({
                    ...prev,
                    [option?.id]: arr,
                  }));
                }
              }}
              placeholder={`${option?.label} To`}
              type={"number"}
              wrapperClassName={"w-full"}
            />
          </div>
        );
      default:
        // if case is not matched then return invalid type
        return <div key={index}>Invalid Type</div>;
    }
  };

  // State to store selected filters
  const [selectedFilter, setSelectedFilter] = useState(options[0]?.groupName);

  // Set default selected filters
  useEffect(() => {
    setSelectedFilters(
      arrayToObject(
        options?.map((opt) => {
          if (opt?.defaultValue !== undefined) {
            return {
              [opt?.id]: opt?.defaultValue?.length > 0 ? opt?.defaultValue : [],
            };
          } else {
            return { [opt?.id]: opt?.defaultValue || "" };
          }
        })
      )
    );
  }, [options]);

  // Handle clear and apply all filters
  const handleClear = () => {
    setSelectedFilters(
      arrayToObject(
        options?.map((opt) => {
          if (opt?.defaultValue !== undefined) {
            return {
              [opt?.id]: [],
            };
          } else {
            return { [opt?.id]: "" };
          }
        })
      )
    );
    onApplyChange(
      arrayToObject(
        options?.map((opt) => {
          if (opt?.defaultValue?.length > 0) {
            return {
              [opt?.id]: [],
            };
          } else {
            return { [opt?.id]: "" };
          }
        })
      )
    );
  };

  // Handle apply all filters
  const handleApplyAllFilters = () => {
    onApplyChange(selectedFilters);
    setFilterOptions((prev) =>
      prev?.map((pr) => ({
        ...pr,
        defaultSelectedValues: selectedFilters?.[pr.id] || [],
      }))
    );

    setPopupOptions((prev) => ({ ...prev, open: false }));
  };

  //  ---------------------------- -- -- -- -- -- ------------------------
  //  ------------------------------ UI RENDER ---------------------------
  //  ---------------------------- -- -- -- -- -- ------------------------
  return (
    <div className={`relative py-5`}>
      {/* Filters Button */}
      <button
        type="button"
        data-auto={`${dataAuto}_button`}
        onClick={() => {
          setPopupOptions((prev) => ({ ...prev, open: true }));
        }}
        className="bg-primary px-4 py-1 text-base-300 rounded-md btn btn-md hover:bg-primary hover:text-base-300"
      >
        Filters
      </button>

      {/* Popup */}
      <Popup
        open={popupOptions?.open}
        onClose={popupOptions.onClose}
        overlayStyle={{
          background: "rgba(0,0,0,0.5)",
          backdropFilter: "blur(2px)",
        }}
        closeOnDocumentClick={popupOptions?.closeOnDocumentClick}
        className="relative overflow-hidden rounded-xl popupV2"
        contentStyle={customPopupStyle}
      >
        <div
          className={`flex flex-col bg-base-300 shadow-xl sm:rounded-l-xl border-primary-content sm:border-2 h-screen max-h-screen w-full`}
        >
          {/* Close Button */}
          {!closeButtonHidden ? (
            <button
              onClick={() => {
                console.warn("first");
                handleApplyAllFilters();
                setPopupOptions({
                  ...popupOptions,
                  open: false,
                });
              }}
              className="absolute high-zindex top-3 right-2 sm:-left-12 w-9 h-9 rounded-full bg-primary-content sm:bg-base-300 flex justify-center items-center"
            >
              <FiX className="text-primary text-xl" />
            </button>
          ) : null}

          {/* MAIN SECTION */}
          <>
            {isLoading ? (
              <CustomLoading />
            ) : (
              <>
                {/* Options Mapping */}
                {[...new Set(options?.map((option) => option?.groupName))]?.map(
                  (option, index) => (
                    <div
                      key={index}
                      data-auto={`custom-filter-selected-filter${
                        index + 1
                      }-all-page`}
                      className="flex-grow max-h-[calc(100vh-100px)] overflow-y-auto overflow-x-hidden scrollbar sm:rounded-l-xl collapse collapse-arrow rounded-none border-base-300 border"
                    >
                      <input
                        defaultChecked={
                          [
                            ...new Set(
                              options?.map((option) => option?.groupName)
                            ),
                          ]?.length === 1 &&
                          [
                            ...new Set(
                              options?.map((option) => option?.groupName)
                            ),
                          ][0] === ""
                            ? true
                            : false
                        }
                        onClick={() => {
                          setSelectedFilter(option);
                          setTimeout(() => {}, 10);
                        }}
                        type={
                          [
                            ...new Set(
                              options?.map((option) => option?.groupName)
                            ),
                          ]?.length === 1 &&
                          [
                            ...new Set(
                              options?.map((option) => option?.groupName)
                            ),
                          ][0] === ""
                            ? "radio"
                            : "checkbox"
                        }
                        name="my-accordion-4"
                        value={"Available Filters"}
                        className="text-base-300"
                      />
                      <div
                        className={`collapse-title text-sm border-b pb-0 pt-5 font-medium ${
                          selectedFilter === option
                            ? "bg-primary text-base-300"
                            : ""
                        }`}
                      >
                        {Array.isArray(selectedFilters[option?.id])
                          ? selectedFilters[option?.id]?.length !== 0 && (
                              <span
                                className={`inline-block w-2 h-2 rounded-full ${
                                  selectedFilter === option
                                    ? "bg-base-300 group-hover:bg-base-300"
                                    : "bg-primary group-hover:bg-primary"
                                }`}
                              ></span>
                            )
                          : selectedFilters[option?.id]?.length && (
                              <span
                                className={`inline-block w-2 h-2 rounded-full ${
                                  selectedFilter === option?.label
                                    ? "bg-base-300 group-hover:bg-base-300"
                                    : "bg-primary group-hover:bg-primary"
                                }`}
                              ></span>
                            )}
                        {formatText(option)}
                        Available Filters
                      </div>
                      <div className="collapse-content bg-base-100 ">
                        <div className="">
                          {options
                            ?.filter((opt) => option === opt?.groupName)
                            ?.map((option, index) =>
                              renderField(option, index)
                            )}
                        </div>
                      </div>
                    </div>
                  )
                )}
              </>
            )}

            {/* FOOTER */}
            <div
              style={{
                boxShadow: "0px -2px 10px #eee",
              }}
              className="flex-none w-full px-3 md:px-8 py-5 bg-base-300 shadow-md flex justify-between items-center z-20"
            >
              <button
                data-auto={`footer-clear-all-button-all-page`}
                onClick={handleClear}
                className={`btn btn-sm md:btn-md btn-error`}
              >
                Clear All
              </button>
              <button
                data-auto={`footer-apply-all-button-all-page`}
                onClick={handleApplyAllFilters}
                className={`btn btn-sm md:btn-md btn-primary`}
              >
                Apply Filters
              </button>
            </div>
          </>
        </div>
      </Popup>
    </div>
  );
}

//
FilterButton.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      type: PropTypes.oneOf([
        "text",
        "email",
        "number",
        "currency",
        "single-date",
        "date-range",
        "range",
        "multi-select",
        "single-select",
      ]).isRequired,
      min: PropTypes.number,
      max: PropTypes.number,
      minLength: PropTypes.number,
      maxLength: PropTypes.number,
      id: PropTypes.string.isRequired,
      onChange: PropTypes.func,
      disable: PropTypes.bool,
      currency: PropTypes.string,
      defaultValue: PropTypes.any,
      value: PropTypes.any,
      from: PropTypes.string,
      to: PropTypes.string,
      loading: PropTypes.bool,
      options: PropTypes.array,
      defaultSelectedValues: PropTypes.array,
      onSelect: PropTypes.func,
    })
  ).isRequired,
  handleClear: PropTypes.func.isRequired,
  handleApplyAllFilters: PropTypes.func.isRequired,
};
