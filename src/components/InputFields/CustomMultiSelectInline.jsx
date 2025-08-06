import PropTypes from "prop-types";
import { Fragment, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { TiTick } from "react-icons/ti";
import truncateText from "../../utils/truncateText";
import ButtonLoading from "../ButtonLoading";
import CustomToaster from "../CustomToaster";
import { OutsideClickHandler } from "../OutsideClickHandler";
export default function CustomMultiSelectInline({
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
  CustomCheckIcon = TiTick,
  disable = false,
  error,
  top = false,
  addNewItemButton = false,
  onClickAddNewItemButton = () => {},
  max = null,
  dataAuto,
  optionsTitle = "Select Item"
}) {
  const [selectedValues, setSelectedValues] = useState([]);
  const [filteredOptions, setFilteredOptions] = useState([]);
  const [isOptionOpen, setIsOptionOpen] = useState(false);
  const [componentLoading, setComponentLoading] = useState(true);
  const [searchFieldValue, setSearchFieldValue] = useState("");

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
    <div className="w-full inline-flex relative">
      {/* FIELD  */}
      <span className={`relative z-10`} data-auto={dataAuto}>
        {/* SELECTED OPTIONS  */}
        {selectedValues?.map((opt, index) => (
          <span
            onClick={() => {
              !disable && setIsOptionOpen(true);
            }}
            title={opt?.label}
            key={index}
            className={`border-b-2 cursor-pointer border-black border-dotted font-bold`}
            data-auto={`${dataAuto}-values`}
          >
            {opt?.Icon && <opt.Icon />}{" "}
            {typeof opt?.label === "string" &&
              truncateText(opt?.label, 20)}{" "}
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
      </span>

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
        <div
          className={`overflow-y-auto px-0 py-0 overflow-x-hidden ${maxHeight}  scrollbar `}
          data-auto={`${dataAuto}-option-container`}
        >
          {componentLoading ? (
            <div className="flex justify-center items-center py-5">
              <ButtonLoading />
            </div>
          ) : filteredOptions.length > 0 ? (
            filteredOptions.map((opt, index) => (
              <Fragment key={index}>
                <button
                  data-auto={`${dataAuto}-${opt?.label}`}
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
            Add New
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

CustomMultiSelectInline.propTypes = {
  options: PropTypes.array.isRequired,
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
  CustomCheckIcon: PropTypes.func,
  disable: PropTypes.bool,
  error: PropTypes.string,
  top: PropTypes.bool,
  addNewItemButton: PropTypes.bool,
  onClickAddNewItemButton: PropTypes.func,
  max: PropTypes.number,
  dataAuto: PropTypes.string,
  optionsTitle: PropTypes.string
};
