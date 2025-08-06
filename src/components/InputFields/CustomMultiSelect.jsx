import PropTypes from "prop-types";
import { Fragment, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { IoInformationCircleSharp } from "react-icons/io5";
import { MdCheck } from "react-icons/md";
import { RxCrossCircled } from "react-icons/rx";
import { TiTick } from "react-icons/ti";
import truncateText from "../../utils/truncateText";
import ButtonLoading from "../ButtonLoading";
import CustomToaster from "../CustomToaster";
import { OutsideClickHandler } from "../OutsideClickHandler";

export default function CustomMultiSelect({
  ExtraInformation, // optional
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
  CustomCheckIcon = TiTick,
  disable = false,
  required = false,
  show = true,
  label,
  error,
  id,
  top = false,
  right = false,
  bottom = true,
  selectAllOption = false,
  addNewItemButton = false,
  onClickAddNewItemButton = () => {},
  hint = "",
  hintLeft = "-left-16",
  visibleBorder = false,
  max = null,
  dataAuto,
  optionsTitle = "Select Option",
  optionClassName = "",
  addNewItemButtonText = ""
}) {
  const [selectedValues, setSelectedValues] = useState([]);
  const [filteredOptions, setFilteredOptions] = useState([]);
  const [isOptionOpen, setIsOptionOpen] = useState(false);
  const [componentLoading, setComponentLoading] = useState(true);
  const [searchFieldValue, setSearchFieldValue] = useState("");

  const [isAllSelected, setIsAllSelected] = useState(
    options.length === selectedValues?.length
  );

  useEffect(() => {
    setComponentLoading(true);
    if (!loading) {
      setComponentLoading(true);
      setSelectedValues(defaultSelectedValues);
      setFilteredOptions(options);
      setComponentLoading(false);
    }
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
  }, [isOptionOpen]);

  useEffect(() => {
    if (searchFieldValue !== "") {
      !disable && setIsOptionOpen(true);
    }
  }, [searchFieldValue]);

  return (
    <div
      data-auto={`container-${dataAuto}`}
      className={`w-full relative ${show ? "" : "hidden"}`}
    >
      {!!ExtraInformation && (
        <dialog id={`multiselect-dialog`} className="modal ">
          <div
            data-auto={`custom-date-picker-dialog-all-page`}
            className="modal-box "
          >
            <div>
              <ExtraInformation />
            </div>
            <div className="modal-action">
              <form method="dialog">
                <button
                  data-auto={`custom-date-picker-close-dialog-button-all-page`}
                  className="btn btn-primary"
                >
                  Close
                </button>
              </form>
            </div>
          </div>
        </dialog>
      )}

      {/* LABEL */}
      <div className="flex gap-5 items-center justify-between">
        <div className={`flex items-center gap-2`}>
          {label ? (
            <label
              data-auto={`label-${dataAuto}`}
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
                className={`card compact dropdown-content z-[100] shadow-lg border border-primary-content shadow-primary-content bg-base-300 rounded-xl w-64 absolute ${hintLeft}`}
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
        }  flex-wrap rounded-md bg-base-300 input-bordered outline-none focus:outline-none items-center px-1 ${
          disable && "bg-transparent border-base-100"
        }`}
      >
        {/* SELECTED OPTIONS  */}
        {selectedValues?.slice(0, 2)?.map((opt, index) => (
          <span
            onClick={() => {
              !disable && setIsOptionOpen(true);
            }}
            title={opt?.label}
            key={index}
            className={` ${!disable && "cursor-pointer"} z-10 px-5 ${
              singleSelect ? " py-[0.3rem]" : " py-[0.25rem]"
            } rounded-md my-1 mx-1 inline-flex gap-2 items-center ${
              disable
                ? " border border-primary bg-primary text-base-300"
                : "bg-primary-content"
            } ${optionClassName}`}
            data-auto={`selected_values-${dataAuto}`}
          >
            {opt?.Icon && <opt.Icon />}{" "}
            {typeof opt?.label === "string" && truncateText(opt?.label, 4)}{" "}
            {!(disable || (required && selectedValues?.length <= 1)) &&
              !(required && singleSelect) && (
                <button
                  data-auto={`selected_values_remove-${dataAuto}`}
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
                    className={`text-red-500 hover:bg-red-500 rounded-full hover:text-base-300`}
                  />
                </button>
              )}
          </span>
        ))}
        {selectedValues?.length > 2 && (
          <span
            onClick={() => {
              !disable && setIsOptionOpen(true);
            }}
            className={`z-10 text-xs px-2`}
            data-auto={`selected_values-${dataAuto}`}
          >
            +{selectedValues?.length - 2}
          </span>
        )}

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
            data-auto={`${dataAuto}-open`}
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
                    placeholder={`${disable && (placeholder || "Search")}`}
                    disabled
                    className={`w-full input-bordered outline-none bg-transparent px-2 h-full ${optionClassName}`}
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
            data-auto={`${dataAuto}-open`}
            onClick={(event) => {
              event.preventDefault();
              event.stopPropagation();
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
                    // data-auto={`${dataAuto}-open`}
                    onClick={() => {
                      setIsOptionOpen(!isOptionOpen);
                    }}
                    type="text"
                    value={searchFieldValue}
                    onChange={handleSearch}
                    placeholder={placeholder || "Search"}
                    className={`w-full input-bordered outline-none bg-transparent px-2 h-full ${optionClassName}`}
                  />
                )}
              </>
            ) : (
              <input
                // data-auto={`${dataAuto}-open`}
                onClick={(event) => {
                  event.stopPropagation();
                  setIsOptionOpen(!isOptionOpen);
                }}
                type="text"
                value={searchFieldValue}
                onChange={handleSearch}
                placeholder={placeholder || "Search"}
                className={`w-full input-bordered outline-none bg-transparent px-2 h-full ${optionClassName}`}
              />
            )}
          </div>
        )}
      </div>

      {/* OPTIONS  */}
      <OutsideClickHandler
        className={`absolute ${
          top ? "bottom-full -mb-7" : "top-full mt-2"
        } z-50 bg-base-300 duration-200 transition-all overflow-hidden  ${
          isOptionOpen ? "opacity-100 h-auto block" : "opacity-0 h-0 hidden"
        }  shadow-lg border-2 border-primary rounded-md w-full left-0 ${optionClassName}`}
        onOutsideClick={() => {
          setIsOptionOpen(false);
        }}
        dataAuto={`${dataAuto}-option_wrapper`}
      >
        <div className={` font-medium shadow-md w-full `}>
          <h3 className={`text-center py-2`}>{optionsTitle}</h3>
          {!!ExtraInformation && (
            <IoInformationCircleSharp
              onClick={() =>
                document.getElementById(`multiselect-dialog`).showModal()
              }
              className="text-primary absolute top-2 text-xl right-2 cursor-pointer"
            />
          )}
          <label
            htmlFor={`select-all-${id}`}
            className={`flex  items-center gap-x-1 cursor-pointer w-full py-2 px-5 border-t ${selectedValues?.length === options?.length ? "bg-primary-content text-primary" : ""} ${selectAllOption ? "" : "hidden"} hover:bg-primary-content hover:text-primary`}
          >
            {selectedValues?.length === options?.length && <MdCheck />}
            <span>
              {selectedValues?.length === options?.length
                ? "Deselect All"
                : "Select All"}
            </span>
          </label>
          <div>
            {/* SELECT ALL BUTTON  */}
            {!!selectAllOption && (
              <div className=" flex items-center gap-2">
                <input
                  data-auto={`custom-multi-select-select-all-input-all-page`}
                  id={`select-all-${id}`}
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
                  className="hidden"
                />
              </div>
            )}
          </div>
        </div>

        <div
          className={`overflow-y-auto px-0 py-0 overflow-x-hidden ${maxHeight}  scrollbar `}
          data-auto={`${dataAuto}-option_container`}
        >
          {componentLoading ? (
            <div className="flex justify-center items-center py-5">
              <ButtonLoading />
            </div>
          ) : filteredOptions.length > 0 ? (
            filteredOptions.map((opt, index) => (
              <Fragment key={index}>
                <button
                  data-auto={`${dataAuto}-${opt?.id}`}
                  onClick={(event) => {
                    event.preventDefault();
                    event.stopPropagation();

                    if (
                      selectedValues?.some((s_opt) => s_opt?.id === opt?.id)
                    ) {
                      // IF ALREADY SELECTED
                      if (!(required && singleSelect)) {
                        onSelect(
                          selectedValues?.filter(
                            (s_opt) => s_opt?.id !== opt?.id
                          )
                        );
                        onRemove(
                          selectedValues?.filter(
                            (s_opt) => s_opt?.id !== opt?.id
                          )
                        );
                        selectedValues?.filter((s_opt) => s_opt?.id !== opt?.id)
                          ?.length > 0 &&
                          closeOnSelect &&
                          singleSelect &&
                          setIsOptionOpen(false);
                        setFilteredOptions(options);
                        setSearchFieldValue("");

                        setSelectedValues(
                          selectedValues?.filter(
                            (s_opt) => s_opt?.id !== opt?.id
                          )
                        );
                      } else {
                        onSelect([opt]);
                        onRemove([opt]);
                        [opt]?.length > 0 &&
                          closeOnSelect &&
                          singleSelect &&
                          setIsOptionOpen(false);
                        setFilteredOptions(options);
                        setSearchFieldValue("");

                        setSelectedValues([opt]);
                      }
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
                  className={`px-5 py-1   justify-between w-full flex gap-2 items-center   ${
                    showCheckbox &&
                    selectedValues?.some((s_opt) => s_opt?.id === opt?.id)
                      ? "bg-primary text-base-300"
                      : "hover:bg-primary-content"
                  }`}
                >
                  <span className="inline-flex  gap-2 items-center text-left w-full">
                    {opt?.Icon && <opt.Icon />} {opt?.label}
                  </span>

                  {selectedValues?.some((s_opt) => s_opt?.id === opt?.id) &&
                    showCheckbox && (
                      <CustomCheckIcon
                        className={`${
                          selectedValues?.some((s_opt) => s_opt?.id === opt?.id)
                            ? "text-base-300"
                            : ""
                        }`}
                      />
                    )}
                </button>
                {index + 1 < filteredOptions.length ? <hr /> : ""}
              </Fragment>
            ))
          ) : (
            <div className="flex justify-center items-center py-5">
              <span className={`font-bold text-red-500`}>{emptyRecordMsg}</span>
            </div>
          )}
        </div>
        {addNewItemButton && (
          <button
            data-auto={`custom-multi-select-add-new-button-all-page`}
            onClick={() => onClickAddNewItemButton()}
            className={`w-full border-t border-base-100 text-center bg-primary text-base-300 py-2 hover:bg-primary-focus`}
          >
            Add New {addNewItemButtonText}
          </button>
        )}
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

CustomMultiSelect.propTypes = {
  ExtraInformation: PropTypes.elementType,
  options: PropTypes.array,
  defaultSelectedValues: PropTypes.array,
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
  CustomCheckIcon: PropTypes.elementType,
  disable: PropTypes.bool,
  required: PropTypes.bool,
  label: PropTypes.string,
  error: PropTypes.string,
  id: PropTypes.string,
  top: PropTypes.bool,
  right: PropTypes.bool,
  bottom: PropTypes.bool,
  selectAllOption: PropTypes.bool,
  addNewItemButton: PropTypes.bool,
  onClickAddNewItemButton: PropTypes.func,
  hint: PropTypes.string,
  visibleBorder: PropTypes.bool,
  max: PropTypes.number,
  dataAuto: PropTypes.string,
  optionsTitle: PropTypes.string,
  optionClassName: PropTypes.string,
  addNewItemButtonText: PropTypes.string,
  hintLeft: PropTypes.string,
  show: PropTypes.bool
};
