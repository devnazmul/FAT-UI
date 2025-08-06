import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { IoInformationCircleSharp } from "react-icons/io5";
import { RxCrossCircled } from "react-icons/rx";
import { createLabel } from "../../apis/task/task";
import { colors } from "../../constant/colors";
import { handleApiError } from "../../utils/apiErrorHandler";
import { truncateString } from "../../utils/trancate";
import truncateText from "../../utils/truncateText";
import ButtonLoading from "../ButtonLoading";
import CustomToaster from "../CustomToaster";
import { OutsideClickHandler } from "../OutsideClickHandler";
import CustomFieldV2 from "./CustomFieldV2";

export default function CustomMultiSelectWithColorLabel({
  options = [], // required []
  defaultSelectedValues = [], // []
  showCheckbox = true,
  loading = false,
  maxHeight = "max-h-[200px]",
  emptyRecordMsg = "No option found!",
  placeholder = "Search",
  onSelect = (e) => e,
  onRemove = (e) => e,
  singleSelect = false,
  closeOnSelect = true,
  CustomCloseIcon = RxCrossCircled,
  disable = false,
  required = false,
  label,
  error,
  id,
  top = false,
  right = false,
  bottom = true,

  selectAllOption = false,

  hint = "",
  visibleBorder = false,
  max = null,
  dataAuto,
  optionsTitle = "Select Option",
  projectId = null,
  setAllLabels,
  setIsLoadingLabels
}) {
  const [tab, setTab] = useState("list");
  const onClickAddNewItemButton = () => {
    tab === "list" ? setTab("add_new") : setTab("list");
  };

  const [labelFormData, setLabelFormData] = useState({
    name: "",
    color: "#264B35",
    project_id: projectId
  });

  const [selectedValues, setSelectedValues] = useState([]);
  const [filteredOptions, setFilteredOptions] = useState([]);
  const [isOptionOpen, setIsOptionOpen] = useState(false);
  const [componentLoading, setComponentLoading] = useState(true);
  const [searchFieldValue, setSearchFieldValue] = useState("");

  const [isAllSelected, setIsAllSelected] = useState(
    options.length === selectedValues?.length
  );

  // CREATE LABEL
  const [isCreatingLabel, setIsCreatingLabel] = useState(false);
  const onCreateLabel = () => {
    setIsCreatingLabel(true);
    setIsLoadingLabels(true);
    createLabel(labelFormData)
      .then((res) => {
        setLabelFormData({
          name: "",
          color: "#264B35",
          project_id: projectId
        });
        setTab("list");
        onSelect([
          ...selectedValues,
          {
            id: res?.id,
            display: res?.name,
            label: res?.name,
            color: res?.color
          }
        ]);
        setAllLabels((prev) => [
          {
            id: res?.id,
            display: res?.name,
            label: res?.name,
            color: res?.color
          },
          ...prev
        ]);

        setIsLoadingLabels(false);
        setIsCreatingLabel(false);
      })
      .catch((error) => {
        setIsLoadingLabels(false);
        setIsCreatingLabel(false);
        handleApiError(error);
      });
  };

  useEffect(() => {
    setComponentLoading(true);
    if (!loading) {
      setComponentLoading(true);
      setSelectedValues(defaultSelectedValues);
      setFilteredOptions(options);
      setComponentLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading]);

  useEffect(() => {
    if (options.length > 0) {
      if (options.length === selectedValues?.length) {
        setIsAllSelected(true);
      } else {
        setIsAllSelected(false);
      }
    } else {
      setIsAllSelected(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedValues]);

  //  SEARCH
  const handleSearch = (e) => {
    const searchTerm = e.target.value;
    setSearchFieldValue(searchTerm);
    setFilteredOptions(
      options.filter(
        (option) =>
          option.label &&
          option.label.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  };

  useEffect(() => {
    if (!isOptionOpen) {
      setSearchFieldValue("");
      setFilteredOptions(
        options.filter(
          (option) =>
            option.label && option.label.toString().toLowerCase().includes("")
        )
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOptionOpen]);

  useEffect(() => {
    if (searchFieldValue !== "") {
      !disable && setIsOptionOpen(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchFieldValue]);

  return (
    <div className="w-full relative">
      {/* LABEL */}
      <div className="flex gap-5 items-center justify-between">
        <div className={`flex items-center gap-2`}>
          {label ? (
            <label
              data-auto={`custom-multi-select-label-all-page`}
              htmlFor={id}
              className={`label`}
            >
              <span className="label-text  text-md font-bold">
                {label}{" "}
                {required && !disable && (
                  <span className="text-error font-bold text-md">*</span>
                )}
              </span>
            </label>
          ) : (
            <></>
          )}

          {hint && (
            <div
              className={`dropdown ${right && "dropdown-start"} ${
                top && "dropdown-top"
              } ${bottom && "dropdown-bottom"}`}
            >
              <div
                data-auto={`custom-multi-select-hint-button-all-page`}
                tabIndex={0}
                role="button"
                title="info"
                className=" btn btn-circle btn-ghost btn-xs mt-1"
              >
                <IoInformationCircleSharp className={`text-primary text-xl `} />
              </div>
              <div
                tabIndex={0}
                className="card compact dropdown-content z-[1] shadow-lg border border-primary-content shadow-primary-content bg-base-300 rounded-xl w-64"
              >
                <div tabIndex={0} className="card-body">
                  <h2
                    data-auto={`custom-multi-select-hint-label-all-page`}
                    className="card-title text-primary"
                  >
                    {label}
                  </h2>
                  <p data-auto={`custom-multi-select-hint-all-page`}> {hint}</p>
                </div>
              </div>
            </div>
          )}
        </div>
        {selectAllOption ? (
          <div className="mt-2 flex items-center gap-2">
            <label role="button" htmlFor="">
              Select all
            </label>
            <input
              data-auto={`custom-multi-select-select-all-input-all-page`}
              id=""
              name=""
              onChange={(e) => {
                if (e.target.checked) {
                  setSelectedValues(options);
                } else {
                  setSelectedValues([]);
                }
              }}
              checked={isAllSelected}
              type="checkbox"
              className="checkbox checkbox-xs checkbox-primary mr-2"
            />
          </div>
        ) : (
          ""
        )}
      </div>

      {/* FIELD  */}
      <div
        style={{ display: "flex" }}
        className={`relative z-10
        ${
          disable
            ? `h-auto cursor-not-allowed ${
                visibleBorder && "disabled:border-gray-200 border-opacity-10"
              }`
            : `h-auto `
        }
        w-full input ${
          isOptionOpen ? "border-2 border-primary" : ""
        }  flex-wrap rounded-md bg-base-300 input-bordered outline-none focus:outline-none items-center px-1`}
        data-auto={dataAuto}
      >
        {/* SELECTED OPTIONS  */}
        {selectedValues?.map((opt, index) => (
          <span
            onClick={() => {
              !disable && setIsOptionOpen(true);
            }}
            title={opt?.label}
            key={index}
            style={{
              backgroundColor: opt?.color,
              color: colors?.find((color) => color?.bg === opt?.color)?.text
            }}
            className={`bg-primary-content ${
              !disable && "cursor-pointer"
            } z-10 px-5 ${
              singleSelect ? " py-[0.3rem]" : " py-[0.25rem]"
            } rounded-md my-1 mx-1 inline-flex gap-2 items-center`}
            data-auto={`${dataAuto}-values`}
          >
            {opt?.Icon && <opt.Icon />}{" "}
            {typeof opt?.label === "string" && truncateText(opt?.label, 20)}{" "}
            {!disable && (
              <button
                data-auto={`custom-multi-select-close-button-all-page`}
                onClick={() => {
                  onSelect(
                    selectedValues?.filter((s_opt) => s_opt?.id !== opt?.id)
                  );
                  onRemove(
                    selectedValues?.filter((s_opt) => s_opt?.id !== opt?.id)
                  );
                  selectedValues?.filter((s_opt) => s_opt?.id !== opt?.id)
                    ?.length > 0 &&
                    closeOnSelect &&
                    singleSelect &&
                    setIsOptionOpen(false);
                  setFilteredOptions(options);
                  setSearchFieldValue("");

                  setSelectedValues(
                    selectedValues?.filter((s_opt) => s_opt?.id !== opt?.id)
                  );
                }}
              >
                <CustomCloseIcon
                  style={{
                    color: colors?.find((color) => color?.bg === opt?.color)
                      ?.text
                  }}
                  className={` rounded-full hover:text-base-300`}
                />
              </button>
            )}
          </span>
        ))}

        {disable ? (
          <div
            onClick={() => {
              !disable && setIsOptionOpen(!isOptionOpen);
            }}
            className={`relative flex-1 min-w-[100px!important] ${
              singleSelect && selectedValues?.length > 0
                ? "h-[0.26rem]"
                : "h-11"
            } items-center text-gray-600`}
          >
            {singleSelect ? (
              <>
                {selectedValues?.length > 0 ? (
                  ""
                ) : (
                  <input
                    data-auto={`custom-multi-select-single-select-input-all-page`}
                    type="text"
                    value={searchFieldValue}
                    onChange={handleSearch}
                    placeholder=""
                    disabled
                    className={`w-full input-bordered outline-none bg-transparent px-2 h-full`}
                  />
                )}
              </>
            ) : (
              <input
                data-auto={`custom-multi-select-multi-select-input-all-page`}
                disabled
                type="text"
                value={searchFieldValue}
                onChange={handleSearch}
                placeholder=""
                className={`w-full input-bordered outline-none bg-transparent px-2 h-full`}
              />
            )}
          </div>
        ) : (
          <div
            data-auto={`custom-multi-select-option-open-toggle-all-page`}
            onClick={() => {
              setIsOptionOpen(!isOptionOpen);
            }}
            className={`relative flex-1 min-w-[100px!important] ${
              singleSelect && selectedValues?.length > 0
                ? "h-[0.26rem]"
                : "h-11"
            } items-center text-gray-600`}
          >
            {singleSelect ? (
              <>
                {selectedValues?.length > 0 ? (
                  ""
                ) : (
                  <input
                    data-auto={`custom-multi-select-input-if-value->1-all-page`}
                    onClick={() => {
                      setIsOptionOpen(!isOptionOpen);
                    }}
                    type="text"
                    value={searchFieldValue}
                    onChange={handleSearch}
                    placeholder={placeholder}
                    className={`w-full input-bordered outline-none bg-transparent px-2 h-full`}
                  />
                )}
              </>
            ) : (
              <input
                data-auto={`custom-multi-select-input-if-not-single-select-all-page`}
                onClick={() => {
                  setIsOptionOpen(!isOptionOpen);
                }}
                type="text"
                value={searchFieldValue}
                onChange={handleSearch}
                placeholder="Search"
                className={`w-full input-bordered outline-none bg-transparent px-2 h-full`}
              />
            )}
          </div>
        )}
      </div>

      {/* OPTIONS  */}
      <OutsideClickHandler
        className={`absolute ${
          top ? "bottom-full -mb-7" : "top-full mt-2"
        } z-30 bg-base-300 duration-200 transition-all overflow-hidden  ${
          isOptionOpen ? "opacity-100 h-auto block" : "opacity-0 h-0 hidden"
        }  shadow-lg border-2 border-primary rounded-md w-full left-0`}
        onOutsideClick={() => {
          setIsOptionOpen(false);
        }}
        dataAuto={`${dataAuto}-option-wrapper`}
      >
        <h3 className={`text-center py-2 font-medium shadow-md`}>
          {optionsTitle}
        </h3>
        {/* LABEL LIST  */}
        {tab === "list" && (
          <div
            className={`overflow-y-auto px-0 py-0 overflow-x-hidden ${maxHeight}  scrollbar flex flex-col gap-y-1 px-1 py-1`}
            data-auto={`${dataAuto}-option-container`}
          >
            {componentLoading ? (
              <div className="flex justify-center items-center py-5">
                <ButtonLoading />
              </div>
            ) : filteredOptions.length > 0 ? (
              filteredOptions.map((opt, index) => (
                <div
                  onClick={() => {
                    if (
                      selectedValues?.some((s_opt) => s_opt?.id === opt?.id)
                    ) {
                      // IF ALREADY SELECTED
                      onSelect(
                        selectedValues?.filter((s_opt) => s_opt?.id !== opt?.id)
                      );
                      onRemove(
                        selectedValues?.filter((s_opt) => s_opt?.id !== opt?.id)
                      );
                      selectedValues?.filter((s_opt) => s_opt?.id !== opt?.id)
                        ?.length > 0 &&
                        closeOnSelect &&
                        singleSelect &&
                        setIsOptionOpen(false);
                      setFilteredOptions(options);
                      setSearchFieldValue("");

                      setSelectedValues(
                        selectedValues?.filter((s_opt) => s_opt?.id !== opt?.id)
                      );
                    } else {
                      // IF NOT SELECTED
                      if (!max) {
                        if (singleSelect) {
                          onSelect([opt]);
                          onRemove([opt]);
                          [opt]?.length > 0 &&
                            closeOnSelect &&
                            singleSelect &&
                            setIsOptionOpen(false);
                          setFilteredOptions(options);
                          setSearchFieldValue("");

                          setSelectedValues([opt]);
                        } else {
                          onSelect([...selectedValues, opt]);
                          onRemove([...selectedValues, opt]);
                          [...selectedValues, opt]?.length > 0 &&
                            closeOnSelect &&
                            singleSelect &&
                            setIsOptionOpen(false);
                          setFilteredOptions(options);
                          setSearchFieldValue("");

                          setSelectedValues([...selectedValues, opt]);
                        }
                      } else {
                        if (selectedValues?.length + 1 >= max) {
                          setIsOptionOpen(false);
                        }

                        if (selectedValues?.length < max) {
                          if (singleSelect) {
                            onSelect([opt]);
                            onRemove([opt]);
                            [opt]?.length > 0 &&
                              closeOnSelect &&
                              singleSelect &&
                              setIsOptionOpen(false);
                            setFilteredOptions(options);
                            setSearchFieldValue("");

                            setSelectedValues([opt]);
                          } else {
                            onSelect([...selectedValues, opt]);
                            onRemove([...selectedValues, opt]);
                            [...selectedValues, opt]?.length > 0 &&
                              closeOnSelect &&
                              singleSelect &&
                              setIsOptionOpen(false);
                            setFilteredOptions(options);
                            setSearchFieldValue("");

                            setSelectedValues([...selectedValues, opt]);
                          }
                        } else {
                          toast.custom((t) => (
                            <CustomToaster
                              t={t}
                              type={"error"}
                              text={`Maximum items exceeded!`}
                            />
                          ));
                        }
                      }
                    }
                  }}
                  className={`flex items-center justify-between gap-x-1`}
                  key={index}
                >
                  <input
                    type="checkbox"
                    className={`checkbox checkbox-primary`}
                    checked={
                      selectedValues?.some((s_opt) => s_opt?.id === opt?.id) &&
                      showCheckbox
                    }
                  />
                  <button
                    style={{
                      backgroundColor: opt?.color,
                      color: colors?.find((color) => color?.bg === opt?.color)
                        ?.text
                    }}
                    data-auto={`${dataAuto}-${opt?.label}`}
                    className={`px-5 rounded-md py-[0.5rem] justify-between w-full flex gap-2 items-center   ${
                      showCheckbox &&
                      selectedValues?.some((s_opt) => s_opt?.id === opt?.id)
                        ? "bg-primary text-base-300"
                        : "hover:bg-primary-content"
                    }`}
                  >
                    <span className="inline-flex  gap-2 items-center text-left w-full">
                      {opt?.Icon && <opt.Icon />} {opt?.label}
                    </span>
                  </button>
                </div>
              ))
            ) : (
              <div className="flex justify-center items-center py-5 my-1 flex-col gap-y-1">
                <span className={`font-bold text-red-500`}>
                  {emptyRecordMsg}
                </span>
                <button
                  onClick={() => onClickAddNewItemButton()}
                  className={`btn btn-sm btn-primary`}
                >
                  Add New
                </button>
              </div>
            )}
          </div>
        )}

        {/* CREATE NEW LABEL */}
        {tab === "add_new" && (
          <div
            className={`overflow-y-auto overflow-x-hidden px-2 py-2 ${maxHeight} w-full min-h-[350px] scrollbar flex flex-col gap-y-1 px-1 py-1`}
            data-auto={`${dataAuto}-option-container`}
          >
            {/* PREVIEW  */}
            <div
              className={`preview bg-gray-200 w-full py-3 flex justify-center items-center`}
            >
              <div
                style={{
                  backgroundColor: labelFormData?.color,
                  color: colors?.find(
                    (color) => color?.bg === labelFormData?.color
                  )?.text
                }}
                className={`min-w-[200px] font-medium flex items-center justify-start px-5 h-10 rounded-md bg-white text-red-300`}
              >
                {truncateString(labelFormData?.name, 20)}
              </div>
            </div>

            {/* DIVIDER  */}
            <div className={`divider my-1`} />

            {/* LABEL NAME  */}
            <CustomFieldV2
              onChange={(e) => {
                setLabelFormData({ ...labelFormData, name: e.target.value });
              }}
              placeholder={"Label Name"}
              wrapperClassName={"w-full"}
              fieldClassName={`w-full`}
              value={labelFormData?.name}
            />

            {/* DIVIDER  */}
            <div className={`divider my-1`} />

            {/* COLORS  */}
            <div className={`grid grid-cols-5 gap-1`}>
              {colors?.map((color, index) => (
                <button
                  key={index}
                  style={{
                    backgroundColor: color?.bg,
                    color: color?.text
                  }}
                  onClick={() => {
                    setLabelFormData({ ...labelFormData, color: color?.bg });
                  }}
                  className={`${
                    color === labelFormData?.color
                      ? "outline outline-primary"
                      : ""
                  } w-full cursor-pointer h-10 rounded-md`}
                />
              ))}
            </div>
          </div>
        )}

        {/* CREATE BUTTON  */}
        {tab === "add_new" && (
          <button
            data-auto={`custom-multi-select-add-new-button-all-page`}
            onClick={onCreateLabel}
            disabled={isCreatingLabel}
            className={`w-full border-t border-base-100 text-center
            bg-primary text-base-300 py-2 hover:bg-primary-focus
           `}
          >
            {isCreatingLabel ? (
              <ButtonLoading color="text-base-300" />
            ) : (
              "Create"
            )}
          </button>
        )}
        {/* BACK BUTTON AND CREATE NEW BUTTON  */}
        <button
          data-auto={`custom-multi-select-add-new-button-all-page`}
          onClick={onClickAddNewItemButton}
          className={`w-full border-t border-base-100 text-center ${
            tab === "add_new"
              ? "bg-red-500 text-base-300 py-2 hover:bg-red-600"
              : "bg-primary text-base-300 py-2 hover:bg-primary-focus"
          } `}
        >
          {tab === "add_new" ? "Back" : "Create New"}
        </button>
      </OutsideClickHandler>

      {/* VALIDATION MESSAGE  */}
      {error && (
        <label
          data-auto={`custom-multi-select-error-message-all-page`}
          className="label h-7"
        >
          <span className="label-text-alt text-error">{error}</span>
        </label>
      )}
    </div>
  );
}

CustomMultiSelectWithColorLabel.propTypes = {
  options: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      color: PropTypes.string.isRequired
    })
  ),
  defaultSelectedValues: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      color: PropTypes.string.isRequired
    })
  ),
  showCheckbox: PropTypes.bool,
  loading: PropTypes.bool,
  maxHeight: PropTypes.string,
  emptyRecordMsg: PropTypes.string,
  placeholder: PropTypes.string,
  onSelect: PropTypes.func,
  onRemove: PropTypes.func,
  singleSelect: PropTypes.bool,
  closeOnSelect: PropTypes.bool,
  CustomCloseIcon: PropTypes.elementType,
  disable: PropTypes.bool,
  required: PropTypes.bool,
  label: PropTypes.string.isRequired,
  error: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  top: PropTypes.bool,
  right: PropTypes.bool,
  bottom: PropTypes.bool,
  selectAllOption: PropTypes.bool,
  hint: PropTypes.string,
  visibleBorder: PropTypes.bool,
  max: PropTypes.number,
  dataAuto: PropTypes.string.isRequired,
  optionsTitle: PropTypes.string,
  projectId: PropTypes.string,
  setAllLabels: PropTypes.func.isRequired,
  setIsLoadingLabels: PropTypes.func.isRequired
};
