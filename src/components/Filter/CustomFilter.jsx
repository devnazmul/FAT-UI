import PropTypes from "prop-types";
import { useEffect, useRef, useState } from "react";
import { arrayToObject } from "../../utils/arrayToObject";
import { formatText } from "../../utils/formatText";
import CustomLoading from "../CustomLoading";
import CustomDatePickerV2 from "../InputFields/CustomDatePickerV2.jsx";
import CustomField from "../InputFields/CustomField";
import CustomMultiSelect from "../InputFields/CustomMultiSelect";
import CustomNumberField from "../InputFields/CustomNumberField";
import CustomNumberFieldWithCurrency from "../InputFields/CustomNumberFieldWithCurrency";
import Footer from "./Footer";
import Header from "./Header";
import ToggleFilterButton from "./ToggleFilterButton";

// const allTypes = [
//   "text",
//   "email",
//   "number",
//   "currency",
//   "single-date",
//   "date-range",
//   "range",
//   "multi-select",
//   "single-select"
// ];

const CustomFilter = ({
  isLoading,
  onApplyChange,
  options,
  totalData,
  right,
  left,
  dataAuto,
}) => {
  const [isDropdownLoading, setIsDropdownLoading] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState({});
  const renderField = (option, index) => {
    switch (option.type) {
      case "text":
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
            type={"text"}
            wrapperClassName={"w-full"}
          />
        );
      case "email":
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
      case "currency":
        return (
          <CustomNumberFieldWithCurrency
            key={index}
            currency={option?.currency}
            value={selectedFilters[option?.id]}
            disable={option?.disable}
            fieldClassName={"w-full"}
            id={option?.id}
            name={option?.id}
            label={option?.label}
            onChange={(e) =>
              setSelectedFilters((prev) => ({
                ...prev,
                [option?.id]: e?.target?.value,
              }))
            }
            placeholder={option?.label}
            type={option?.type}
            wrapperClassName={"w-full"}
          />
        );
      case "single-date":
        return (
          <CustomDatePickerV2
            format="dd-LL-yyyy"
            value={
              Array.isArray(selectedFilters[option?.id])
                ? selectedFilters[option?.id]?.length === 0
                  ? ""
                  : selectedFilters[option?.id][0] || ""
                : selectedFilters[option?.id] || ""
            }
            from={option?.from}
            to={option?.to}
            error={""}
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
            wrapperClassName={"w-full"}
            dataAuto="custom-filter-single"
            key={index}
            top={index > 4}
            right
          />
        );

      case "multi-select":
        return (
          <CustomMultiSelect
            key={index}
            top={index > 4}
            label={option?.label}
            loading={isDropdownLoading || isLoading}
            singleSelect={false}
            options={option?.options}
            defaultSelectedValues={
              selectedFilters[option?.id]?.length > 0
                ? option?.options.filter((opt) =>
                    selectedFilters[option?.id].some(
                      (val) => val === opt?.value
                    )
                  )
                : []
            }
            onSelect={(e) =>
              setSelectedFilters((prev) => ({
                ...prev,
                [option?.id]: e?.map((opt) => opt?.value),
              }))
            }
          />
        );
      case "single-select":
        return (
          <CustomMultiSelect
            key={index}
            top={index > 4}
            label={option?.label}
            disable={option?.disable}
            loading={isDropdownLoading || isLoading}
            singleSelect
            options={option?.options}
            defaultSelectedValues={
              selectedFilters[option?.id]?.length > 0
                ? option?.options.filter(
                    (opt) => opt?.value === selectedFilters[option?.id][0]
                  )
                : []
            }
            onSelect={(e) => {
              setSelectedFilters((prev) => ({
                ...prev,
                [option?.id]: e?.map((opt) => opt?.value),
              }));
            }}
          />
        );
      case "date-range":
        return (
          <div key={index} className={`flex gap-2 flex-col lg:flex-row`}>
            {/* START  */}
            <CustomDatePickerV2
              format="dd-LL-yyyy"
              value={selectedFilters[option?.id][0] || ""}
              from={option?.from}
              to={selectedFilters[option?.id][1] || ""}
              left
              fieldClassName={"w-full"}
              id={option?.id}
              label={`${formatText(option?.label)} Start Date`}
              name={option?.id}
              top={index > 3}
              onChange={(e) => {
                let arr = [];
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
            <CustomDatePickerV2
              format="dd-LL-yyyy"
              value={selectedFilters[option?.id][1] || ""}
              from={selectedFilters[option?.id][0]}
              to={option?.to}
              right
              fieldClassName={"w-full"}
              id={option?.id}
              top={index > 3}
              label={`${formatText(option?.label)} End Date`}
              name={option?.id}
              onChange={(e) => {
                let arr = [];
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
        return (
          <div key={index} className={`flex gap-2`}>
            <CustomNumberField
              value={selectedFilters[option?.id][0] || ""}
              fieldClassName={"w-full"}
              label={`${option?.label} From`}
              max={selectedFilters[option?.id][1]}
              id={option?.id}
              name={option?.id}
              top={index > 3}
              onChange={(e) => {
                let arr = [];
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
              value={selectedFilters[option?.id][1] || ""}
              fieldClassName={"w-full"}
              label={`${option?.label} To`}
              min={selectedFilters[option?.id][0]}
              id={option?.id}
              name={option?.id}
              top={index > 3}
              onChange={(e) => {
                let arr = [];
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
        return <div key={index}>Invalid Type</div>;
    }
  };

  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState(options[0]?.groupName);

  const buttonRef = useRef(null);

  const handleButtonClick = () => {
    setIsFilterOpen((prev) => !prev);
  };

  useEffect(() => {
    setSelectedFilters(
      arrayToObject(
        options?.map((opt) => {
          if (opt?.defaultSelectedValues !== undefined) {
            return {
              [opt?.id]:
                opt?.defaultSelectedValues?.length > 0
                  ? opt?.defaultSelectedValues
                  : [],
            };
          } else {
            return { [opt?.id]: opt?.defaultValue || "" };
          }
        })
      )
    );
  }, [options]);

  const handleClear = () => {
    setSelectedFilters(
      arrayToObject(
        options?.map((opt) => {
          if (opt?.defaultSelectedValues !== undefined) {
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
          if (opt?.defaultSelectedValues?.length > 0) {
            return {
              [opt?.id]: [],
            };
          } else {
            return { [opt?.id]: "" };
          }
        })
      )
    );
    setIsFilterOpen(false);
  };
  const handleApplyAllFilters = () => {
    onApplyChange(selectedFilters);
    setIsFilterOpen(false);
  };

  return (
    <div
      data-auto={`custom-filter-container-${dataAuto}`}
      className={`relative`}
    >
      {/* TOGGLE BUTTON  */}
      <ToggleFilterButton
        options={options}
        buttonRef={buttonRef}
        isFilterOpen={isFilterOpen}
        setIsFilterOpen={setIsFilterOpen}
        handleButtonClick={handleButtonClick}
      />

      {/* MODAL  */}
      {isFilterOpen && (
        <div
          className={` absolute top-12 ${
            left ? (typeof left === "string" ? left : "right-0") : ""
          } ${
            right ? (typeof right === "string" ? right : "left-0") : ""
          } border z-10 bg-base-300 rounded-[5px] shadow-xl w-[calc(100vw-15px)]  sm:w-[calc(100vw-40px)] md:w-[470px] lg:w-[700px] xl:w-[800px]`}
        >
          {/* HEADER  */}
          <Header />

          {/* MAIN SECTION  */}
          {isLoading ? (
            <CustomLoading />
          ) : (
            <>
              <div
                className={`flex overflow-y-auto overflow-x-hidden scrollbar flex-col min-h-[400px] max-h-[500px]`}
              >
                <div className="join join-vertical w-full">
                  {[
                    ...new Set(options?.map((option) => option?.groupName)),
                  ]?.map((option, index) => (
                    <div
                      key={index}
                      data-auto={`custom-filter-selected-filter${
                        index + 1
                      }-all-page`}
                      className="collapse collapse-arrow join-item rounded-none border-base-300 border"
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
                          setIsDropdownLoading(true);
                          setSelectedFilter(option);
                          setTimeout(() => {
                            setIsDropdownLoading(false);
                          }, 10);
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
                      />
                      <div
                        className={`collapse-title text-sm border-b pb-0 pt-5 font-medium ${
                          selectedFilter === option
                            ? "bg-primary text-base-300"
                            : ""
                        }`}
                      >
                        {Array.isArray(selectedFilters[option?.id]) ? (
                          <>
                            {selectedFilters[option?.id]?.length !== 0 ? (
                              <span
                                className={`inline-block w-2 h-2 rounded-full  ${
                                  selectedFilter === option
                                    ? "bg-base-300 group-hover:bg-base-300"
                                    : "bg-primary group-hover:bg-primary"
                                } `}
                              ></span>
                            ) : (
                              ""
                            )}
                          </>
                        ) : (
                          <>
                            {selectedFilters[option?.id]?.length ? (
                              <span
                                className={`inline-block w-2 h-2 rounded-full  ${
                                  selectedFilter === option?.label
                                    ? "bg-base-300 group-hover:bg-base-300"
                                    : "bg-primary group-hover:bg-primary"
                                } `}
                              ></span>
                            ) : (
                              ""
                            )}
                          </>
                        )}
                        {[
                          ...new Set(
                            options?.map((option) => option?.groupName)
                          ),
                        ]?.length === 1 &&
                        [
                          ...new Set(
                            options?.map((option) => option?.groupName)
                          ),
                        ][0] === ""
                          ? "Available Filters"
                          : formatText(option)}{" "}
                      </div>
                      <div className="collapse-content bg-base-100">
                        <div
                          className={
                            options?.filter(
                              (opt) =>
                                option === opt?.groupName &&
                                (opt?.type === "single-date" ||
                                  opt?.type === "multi-select" ||
                                  opt?.type === "single-select" ||
                                  opt?.type === "date-range")
                            )?.length > 0
                              ? `min-h-[730px]`
                              : `h-auto`
                          }
                        >
                          {options
                            ?.filter((opt) => option === opt?.groupName)
                            ?.map((option, index) =>
                              renderField(option, index)
                            )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {/* FOOTER  */}
          <Footer
            handleClear={handleClear}
            handleApplyAllFilters={handleApplyAllFilters}
            totalResult={totalData}
          />
        </div>
      )}
    </div>
  );
};

CustomFilter.propTypes = {
  isLoading: PropTypes.bool,
  onApplyChange: PropTypes.func,
  options: PropTypes.array,
  totalData: PropTypes.number,
  right: PropTypes.bool,
  left: PropTypes.bool,
  dataAuto: PropTypes.string,
};

export default CustomFilter;
