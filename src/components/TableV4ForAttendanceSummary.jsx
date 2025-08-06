// ===========================================
// #00122
// ===========================================

import HolidayViewForPopup from "@/pages/Administration/Holiday/HolidayViewForPopup.jsx";
import CreateLeave from "@/pages/Leave/CreateLeave.jsx";
import { ArrowDownIcon, ArrowUpIcon } from "lucide-react";
import PropTypes from "prop-types";
import React, { Fragment, useEffect, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { checkPermissions } from "../utils/checkPermissions";
import CustomDropDownForTable from "./CustomDropDownForTable";
import CustomDropDownForTableWithFullData from "./CustomDropDownForTableWithFullData";
import CustomLoading from "./CustomLoading";
import CustomPopup from "./CustomPopup.jsx";

export default function TableV4ForAttendanceSummary({
  getFullDataToActionHandler = false,
  rows,
  cols,
  isLoading,
  actions = [],
  isFullActionList = true,
  selectedIds,
  header = true,
  topCol,
  col1Width = "35%",
  col2Width = "65%",
  dataAuto,
  childCols = [],
  childActions = [],
  specialClasses = [],
  setIsUpdated,
  defaultExpandedRows = [],
  MobileCardComponent = ({
    actions = [],
    isFullActionList,
    data,
    selectedIds,
    rows,
    index,
    isLoading,
    permissions,
    getFullDataToActionHandler,
    cols = [],
    topCol,
    col1Width,
    col2Width,
    dataAuto,
    expandedRows,
    toggleRow,
    childCols = [],
    handleViewHoliday,
    handleViewLeave
  }) => (
    <div className=" p-5 my-2 rounded-xl bg-base-300 border border-primary-content shadow-md shadow-primary-content relative flex flex-col  overflow-auto scrollbar-none ">
      <div className={`w-full flex justify-center pt-1 pb-5`}>
        {actions?.length > 0 ? (
          <td className="text-right p-0">
            {!isFullActionList ? (
              <CustomDropDownForTable
                isDeleteDisabled={data?.is_system_default}
                disabled={selectedIds.length > 1}
                fullData={rows}
                index={index}
                isDataLoading={isLoading}
                isShareDataLoading={isLoading}
                data={data}
                actions={actions}
                getFullDataToActionHandler={getFullDataToActionHandler}
              />
            ) : (
              <div className="flex gap-2 justify-end items-center">
                {actions
                  ?.filter((action) => {
                    return !action.disabledOn.some((disable) => {
                      const conditionValue = data[disable.attribute_name];
                      return conditionValue === disable.value;
                    });
                  })
                  .map((action, index) => (
                    <React.Fragment key={index}>
                      {checkPermissions(action.permissions, permissions) ? (
                        <button
                          data-auto={`table-v3-action-${action.name}-${dataAuto}`}
                          onClick={() =>
                            action.handler(
                              getFullDataToActionHandler ? data : data?.id
                            )
                          }
                          data-tip={action.name}
                          className={`tooltip tooltip-bottom tooltip-primary`}
                          key={index}
                        >
                          <action.Icon
                            className={`text-xl ${
                              action.name === "delete"
                                ? " text-red-500"
                                : "text-primary"
                            }`}
                          />
                        </button>
                      ) : (
                        ""
                      )}
                    </React.Fragment>
                  ))}
              </div>
            )}
          </td>
        ) : (
          ""
        )}
      </div>
      {/* DATA  */}
      <table className="table  w-full " data-auto={`table-${dataAuto}`}>
        <tbody className={``}>
          {topCol
            ? topCol?.map((col, i) =>
                col?.show ? (
                  <tr
                    key={i}
                    className={`px-5 border-y border-primary-content w-auto`}
                  >
                    <td
                      data-auto={`table-v3-top-col${i + 1}-${dataAuto}`}
                      colSpan={2}
                      className={`font-bold border border-primary-content overflow-wrap-anywhere text-primary`}
                    >
                      {data[col?.attribute_name]}
                    </td>
                  </tr>
                ) : (
                  ""
                )
              )
            : ""}
          {cols?.map((col, j) => (
            <Fragment key={j}>
              {col?.show ? (
                <>
                  {data[col?.attribute_name] ? (
                    <tr
                      key={j}
                      className={` px-5 border-y border-primary-content w-auto ${
                        topCol?.length > 0 &&
                        col?.attribute_name === topCol[0]?.attribute_name
                          ? "hidden"
                          : ""
                      }`}
                    >
                      <td
                        data-auto={`table-v3-col-name${j + 1}-${dataAuto}`}
                        className={`font-bold border border-primary-content text-primary ${col1Width}`}
                      >
                        {col.name}:
                      </td>
                      <td
                        data-auto={`table-v3-col-value${j + 1}-${dataAuto}`}
                        className={`border border-primary-content ${col2Width}`}
                      >
                        {data[col?.attribute_name]}
                      </td>
                    </tr>
                  ) : (
                    ""
                  )}
                </>
              ) : (
                ""
              )}{" "}
            </Fragment>
          ))}{" "}
          <tr
            className={`px-5 border-x border-b  border-primary-content w-auto cursor-pointer`}
            onClick={() => toggleRow(data.id)}
          >
            <td colSpan={2} className={`text-center font-bold text-primary`}>
              {expandedRows.includes(data.id) ? (
                <span className={`flex items-center justify-center gap-x-2`}>
                  <span>Hide Details</span> <ArrowUpIcon size={20} />
                </span>
              ) : (
                <span className={`flex items-center justify-center gap-x-2`}>
                  <span>View Details</span> <ArrowDownIcon size={20} />
                </span>
              )}
            </td>
          </tr>
        </tbody>
      </table>

      {/* CHILDREN DATA  */}
      <div className={`overflow-x-auto`}>
        {expandedRows.includes(data.id) && (
          <table className="table table-compact w-full ">
            <thead>
              <tr className={`bg-primary text-base-300`}>
                <th
                  style={{
                    width: `1%`
                  }}
                  className="px-5"
                >
                  <div className="flex flex-col items-start justify-start gap-2"></div>
                </th>
                {childCols.map((th, i) => (
                  <Fragment key={i}>
                    {th?.show ? (
                      <th
                        className={`px-5 table-cell`}
                        style={{
                          width: `${th?.minWidth}%`,
                          textAlign: th?.align ? th?.align : `left`
                        }}
                      >
                        <div
                          className={`flex flex-col text-center  ${
                            th?.align === "center"
                              ? "items-center"
                              : "items-start"
                          }  justify-start gap-2 font-semibold  text-sm`}
                        >
                          {" "}
                          {th?.name.slice(0, 1).toUpperCase() +
                            th?.name.slice(1)}{" "}
                        </div>
                      </th>
                    ) : (
                      ""
                    )}
                  </Fragment>
                ))}

                {childActions.length > 0 ? (
                  <th
                    style={{
                      minWidth: "1%",
                      paddingRight: "20px"
                    }}
                  >
                    <div className="flex items-center justify-end text-sm">
                      <span>Actions</span>
                    </div>
                  </th>
                ) : (
                  ""
                )}
              </tr>
            </thead>
            <tbody className={`w-full`}>
              {data?.children?.length > 0 ? (
                data?.children?.map((data2, i) => (
                  <Fragment key={i}>
                    <tr
                      className={`border border-b ${
                        i % 2 === 1 ? "bg-base-100" : "bg-base-300"
                      } border-primary-content ${
                        !data2?.is_present ? " " : ""
                      } h-16 text-neutral group tableRowAdmin hover:overflow-x-hidden`}
                      id={`child-row-${i + 1}`}
                    >
                      <td
                        data-auto={`table-v4-number-${dataAuto}`}
                        key={i}
                        style={{
                          minWidth: "1%"
                        }}
                        className={`${
                          data2?.is_on_holiday
                            ? "text-green-500 font-bold"
                            : `${
                                data2?.is_present
                                  ? ""
                                  : `text-red-500 ${
                                      data2?.is_on_leave || data2?.is_on_holiday
                                        ? "font-bold"
                                        : ""
                                    } `
                              }`
                        } px-5`}
                      >
                        <span>{i + 1}</span>
                      </td>

                      {childCols?.map((col, j) => (
                        <Fragment key={j}>
                          {col?.show ? (
                            <>
                              {col?.attribute_name === "date" &&
                              (!data2?.is_present || data2?.is_holiday) ? (
                                <td
                                  data-auto={`table-v3-col-data${
                                    j + 1
                                  }-${dataAuto}`}
                                  style={{
                                    width: `${col?.minWidth}%`
                                  }}
                                  key={j}
                                  className={`px-5 text-start table-cell ${
                                    col?.wrap ? "overflow-wrap-anywhere" : ""
                                  } ${
                                    data2?.is_on_holiday
                                      ? "text-green-500 font-bold"
                                      : `${
                                          data2?.is_present
                                            ? ""
                                            : `text-red-500 ${
                                                data2?.is_on_leave ||
                                                data2?.is_on_holiday
                                                  ? "font-bold"
                                                  : ""
                                              } `
                                        }`
                                  }`}
                                >
                                  {data2[col?.attribute_name]}
                                </td>
                              ) : (
                                <>
                                  {!(
                                    data2?.is_on_leave || data2?.is_on_holiday
                                  ) ? (
                                    <td
                                      data-auto={`table-v3-col-data${
                                        j + 1
                                      }-${dataAuto}`}
                                      style={{
                                        width: `${col?.minWidth}%`
                                      }}
                                      key={j}
                                      className={`px-5 ${
                                        col?.align === "center" && "text-center"
                                      } table-cell ${
                                        col?.wrap
                                          ? "overflow-wrap-anywhere"
                                          : ""
                                      } ${
                                        data2?.is_on_holiday
                                          ? "text-green-500 font-bold"
                                          : `${
                                              data2?.is_present
                                                ? ""
                                                : `text-red-500 ${
                                                    data2?.is_on_leave ||
                                                    data2?.is_on_holiday
                                                      ? "font-bold"
                                                      : ""
                                                  } `
                                            }`
                                      }`}
                                    >
                                      {data2?.is_present
                                        ? data2[col?.attribute_name]
                                        : col?.attribute_name !==
                                            "lateness_status" &&
                                          data2[col?.attribute_name]}
                                    </td>
                                  ) : (
                                    <>
                                      <>
                                        <td
                                          colSpan={8}
                                          style={{
                                            width: `${col?.minWidth}%`
                                          }}
                                          key={j}
                                          className={`px-5 ${
                                            col?.isMainField
                                              ? "table-cell"
                                              : "hidden"
                                          } text-center md:table-cell ${
                                            col?.wrap
                                              ? "overflow-wrap-anywhere"
                                              : ""
                                          } ${
                                            data2?.is_on_holiday
                                              ? "text-green-500 font-bold"
                                              : `${
                                                  data2?.is_present
                                                    ? ""
                                                    : "text-red-500 font-bold"
                                                }`
                                          }`}
                                        >
                                          {data2?.is_on_holiday
                                            ? "Holiday"
                                            : "On Leave."}
                                        </td>

                                        <td
                                          style={{
                                            width: `${col?.minWidth}%`
                                          }}
                                          key={j}
                                          className={`px-5 ${
                                            col?.isMainField
                                              ? "table-cell"
                                              : "hidden"
                                          } text-end  md:table-cell ${
                                            col?.wrap
                                              ? "overflow-wrap-anywhere"
                                              : ""
                                          }`}
                                        >
                                          <button
                                            onClick={() => {
                                              data2?.is_on_holiday
                                                ? handleViewHoliday(data2?.id)
                                                : handleViewLeave(
                                                    data2?.leave_id
                                                  );
                                            }}
                                            className={`btn ${
                                              data2?.is_on_holiday
                                                ? "bg-green-500 hover:bg-green-700"
                                                : "bg-red-500 hover:bg-red-700"
                                            }  text-base-300 btn-sm flex justify-center items-center w-full`}
                                          >
                                            <span>Details</span>
                                          </button>
                                        </td>
                                      </>
                                    </>
                                  )}
                                </>
                              )}
                            </>
                          ) : (
                            ""
                          )}
                        </Fragment>
                      ))}

                      {childActions?.filter((action) => {
                        return !action.disabledOn.some((disable) => {
                          const conditionValue = data2[disable.attribute_name];
                          return conditionValue === disable.value;
                        });
                      })?.length > 0 ? (
                        <td
                          style={{
                            width: "1%",
                            paddingRight: "20px"
                          }}
                          className="text-right"
                          id={`action-data-container`}
                        >
                          {!isFullActionList ? (
                            <>
                              {getFullDataToActionHandler ? (
                                <CustomDropDownForTableWithFullData
                                  isDeleteDisabled={data2?.is_system_default}
                                  disabled={selectedIds.length > 1}
                                  fullData={rows}
                                  index={i}
                                  isDataLoading={isLoading}
                                  isShareDataLoading={isLoading}
                                  data={data2}
                                  actions={childActions}
                                />
                              ) : (
                                <CustomDropDownForTable
                                  isDeleteDisabled={data2?.is_system_default}
                                  disabled={selectedIds.length > 1}
                                  fullData={rows}
                                  index={i}
                                  isDataLoading={isLoading}
                                  isShareDataLoading={isLoading}
                                  data={data2}
                                  actions={childActions}
                                  getFullDataToActionHandler={
                                    getFullDataToActionHandler
                                  }
                                />
                              )}
                            </>
                          ) : (
                            <span
                              className="flex gap-5 justify-end items-center"
                              id="action-data"
                            >
                              {childActions
                                .filter((action) => {
                                  return !action.disabledOn.some((disable) => {
                                    const conditionValue =
                                      data2[disable.attribute_name];
                                    return conditionValue === disable.value;
                                  });
                                })
                                .slice(0, 3)
                                .map((action, index) => (
                                  <Fragment key={index}>
                                    {!!checkPermissions(
                                      action.permissions,
                                      permissions
                                    ) && (
                                      <button
                                        data-auto={`table-v3-action-${action.name}-${dataAuto}`}
                                        onClick={() =>
                                          action.handler(
                                            getFullDataToActionHandler
                                              ? data2
                                              : data2?.id
                                          )
                                        }
                                        data-tip={action.name}
                                        className={`tooltip ${
                                          action ===
                                          childActions[childActions.length - 1]
                                            ? "tooltip-left"
                                            : "tooltip-left"
                                        } tooltip-primary`}
                                        key={index}
                                      >
                                        <action.Icon
                                          className={`text-xl ${
                                            action.name === "delete"
                                              ? " text-red-500"
                                              : "text-primary"
                                          }`}
                                        />
                                      </button>
                                    )}
                                  </Fragment>
                                ))}

                              {childActions.filter((action) => {
                                return !action.disabledOn.some((disable) => {
                                  const conditionValue =
                                    data2[disable.attribute_name];
                                  return conditionValue === disable.value;
                                });
                              }).length > 3 ? (
                                <CustomDropDownForTable
                                  getFullDataToActionHandler={
                                    getFullDataToActionHandler
                                  }
                                  isDeleteDisabled={data2?.is_system_default}
                                  disabled={selectedIds.length > 1}
                                  fullData={rows}
                                  index={i}
                                  isDataLoading={isLoading}
                                  isShareDataLoading={isLoading}
                                  data={data2}
                                  actions={childActions
                                    .filter((action) => {
                                      return !action.disabledOn.some(
                                        (disable) => {
                                          const conditionValue =
                                            data2[disable.attribute_name];
                                          return (
                                            conditionValue === disable.value
                                          );
                                        }
                                      );
                                    })
                                    .slice(3)}
                                />
                              ) : (
                                ""
                              )}
                            </span>
                          )}
                        </td>
                      ) : (
                        <td
                          style={{
                            width: "1%",
                            paddingRight: "20px"
                          }}
                          className="text-right"
                          id={`action-data-container`}
                        ></td>
                      )}
                    </tr>
                  </Fragment>
                ))
              ) : (
                <tr>
                  <td
                    className="text-center py-5 bg-base-300"
                    colSpan={cols?.length + 4}
                  >
                    {/* FOR DEFAULT LIGHT THEME  */}
                    <div className="flex justify-center items-center flex-col">
                      <div className="w-[200px] flex flex-col gap-2 justify-center items-center">
                        <img
                          data-auto={`table-v3-desktop-no-data-found-image-${dataAuto}`}
                          className="w-20"
                          src="/assets/nodatafound.svg"
                          alt="no data found"
                        />
                        <div>
                          <h4 className="font-medium text-lg">
                            Nothing Found!
                          </h4>
                          <p className="font-light">
                            Please add a new entity to see the content here.
                            Thank you!
                          </p>
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}) {
  // POPUP OPTIONS
  const [popupOption, setPopupOption] = useState({
    open: false,
    type: "",
    id: null,
    onClose: () => {
      setPopupOption({ ...popupOption, open: false });
    },
    overlayStyle: { background: "red" },
    closeOnDocumentClick: false
  });

  const permissions = localStorage.getItem("permissions");
  const [expandedRows, setExpandedRows] = useState([]);

  useEffect(() => {
    if (defaultExpandedRows.length > 0) {
      setExpandedRows(defaultExpandedRows);
    }
  }, [defaultExpandedRows]);

  const toggleRow = (id) => {
    setExpandedRows((prev) => (prev.includes(id) ? [] : [id]));
  };

  const handleViewLeave = (id) => {
    setPopupOption({
      open: true,
      type: "view",
      title: "View Leave",
      id: id,
      onClose: () => {
        setPopupOption({ ...popupOption, open: false });
      },
      overlayStyle: { background: "red" },
      closeOnDocumentClick: false
    });
  };

  const handleViewHoliday = (id) => {
    setPopupOption({
      open: true,
      type: "holiday_view",
      title: "Holiday View",
      id: id,
      onClose: () => {
        setPopupOption({ ...popupOption, open: false });
      },
      overlayStyle: { background: "red" },
      closeOnDocumentClick: false
    });
  };

  return (
    <div
      className={`min-h-[300px] overflow-x-auto scrollbar  top-0 w-full bg-base-200 md:bg-base-300`}
      data-auto={`table-container-${dataAuto}`}
    >
      <CustomPopup
        popupClasses={`w-[95vw] sm:w-[70vw] md:w-[70vw] lg:w-[50vw]`}
        popupOption={popupOption}
        setPopupOption={setPopupOption}
        title={"Create Leave Type"}
        Component={
          <>
            {popupOption?.type === "view" && (
              <CreateLeave
                setIsUpdated={setIsUpdated}
                isDeleteEnabled
                id={popupOption?.id}
                handleClosePopup={() => {
                  setPopupOption({
                    open: false,
                    type: "",
                    id: null,
                    userId: null,
                    selfId: null,
                    onClose: () => {
                      setPopupOption({ ...popupOption, open: false });
                    },
                    overlayStyle: { background: "red" },
                    closeOnDocumentClick: false
                  });
                }}
              />
            )}
            {popupOption?.type === "holiday_view" && (
              <HolidayViewForPopup
                id={popupOption?.id}
                handleClosePopup={() => {
                  setPopupOption({
                    open: false,
                    type: "",
                    id: null,
                    userId: null,
                    selfId: null,
                    onClose: () => {
                      setPopupOption({ ...popupOption, open: false });
                    },
                    overlayStyle: { background: "red" },
                    closeOnDocumentClick: false
                  });
                }}
              />
            )}
          </>
        }
      />

      {/* FOR DESKTOP VIEW  */}
      <table
        className=" hidden md:table gap-2 rounded-xl "
        data-auto={`table-${dataAuto}`}
      >
        {header ? (
          <thead className="top-0 bg-base-200">
            <tr className="h-16 text-neutral border-b border-primary-content">
              <th
                style={{
                  width: `1%`
                }}
                className=" px-8"
              ></th>

              <th
                style={{
                  width: `1%`
                }}
                className="px-5"
              >
                <div className="flex flex-col items-start justify-start gap-2">
                  #
                </div>
              </th>
              {cols.map((th, i) => (
                <Fragment key={i}>
                  {th?.show ? (
                    <th
                      className={`px-5 ${
                        th?.isMainField ? "table-cell" : "hidden"
                      } md:table-cell`}
                      style={{
                        width: `${th?.minWidth}%`,
                        textAlign: th?.align ? th?.align : `left`
                      }}
                    >
                      <div
                        className={`flex flex-col text-center  ${
                          th?.align === "center"
                            ? "items-center"
                            : "items-start"
                        }  justify-start gap-2 font-semibold  text-sm`}
                      >
                        {th?.name.slice(0, 1).toUpperCase() +
                          th?.name.slice(1)}{" "}
                      </div>
                    </th>
                  ) : (
                    ""
                  )}
                </Fragment>
              ))}

              {actions.length > 0 ? (
                <th
                  style={{
                    minWidth: "1%",
                    paddingRight: "20px"
                  }}
                >
                  <div className="flex items-center justify-end  text-sm">
                    <span>Actions</span>
                  </div>
                </th>
              ) : (
                ""
              )}
            </tr>
          </thead>
        ) : (
          ""
        )}

        <tbody data-auto={`table-body-${dataAuto}`}>
          {!isLoading ? (
            rows && rows?.length > 0 ? (
              rows.map((data, i) => (
                <Fragment key={i}>
                  <tr
                    onClick={() => toggleRow(data.id)}
                    className={`border cursor-pointer border-b ${
                      i % 2 === 1 ? "bg-base-100" : "bg-base-300"
                    } border-primary-content  h-16 ${
                      expandedRows.includes(data.id) &&
                      "!border-y !border-x !border-primary"
                    } text-neutral group tableRowAdmin hover:overflow-hidden
                     ${
                       specialClasses.map((item) => {
                         if (data[item?.attribute_name] === item?.value) {
                           return item?.className;
                         }
                       })[0] ?? "hover:bg-base-100"
                     }
                     `}
                    id={`row-${i + 1}`}
                  >
                    <td className="w-[50px] px-8">
                      <IoIosArrowDown
                        className={`${
                          expandedRows.includes(data.id) ? "rotate-180" : ""
                        } text-lg transition-all duration-300`}
                      />
                    </td>

                    <td
                      data-auto={`table-v3-number-${dataAuto}`}
                      key={i}
                      style={{
                        minWidth: "1%"
                      }}
                      className="px-5"
                    >
                      <span>{i + 1}</span>
                    </td>

                    {cols.map((col, j) => (
                      <Fragment key={j}>
                        {col?.show ? (
                          <td
                            data-auto={`table-v3-col-data${j + 1}-${dataAuto}`}
                            style={{
                              width: `${col?.minWidth}%`
                            }}
                            key={j}
                            className={`px-5 ${
                              col?.isMainField ? "table-cell" : "hidden"
                            } ${
                              col?.align === "center" && "text-center"
                            } md:table-cell ${
                              col?.wrap ? "overflow-wrap-anywhere" : ""
                            }`}
                          >
                            {data[col?.attribute_name]}
                          </td>
                        ) : (
                          ""
                        )}
                      </Fragment>
                    ))}

                    {actions?.filter((action) => {
                      return !action.disabledOn.some((disable) => {
                        const conditionValue = data[disable.attribute_name];
                        return conditionValue === disable.value;
                      });
                    })?.length > 0 ? (
                      <td
                        style={{
                          width: "1%",
                          paddingRight: "20px"
                        }}
                        className="text-right"
                        id={`action-data-container`}
                      >
                        {!isFullActionList ? (
                          <>
                            {getFullDataToActionHandler ? (
                              <CustomDropDownForTableWithFullData
                                isDeleteDisabled={data?.is_system_default}
                                disabled={selectedIds.length > 1}
                                fullData={rows}
                                index={i}
                                isDataLoading={isLoading}
                                isShareDataLoading={isLoading}
                                data={data}
                                actions={actions}
                              />
                            ) : (
                              <CustomDropDownForTable
                                isDeleteDisabled={data?.is_system_default}
                                disabled={selectedIds.length > 1}
                                fullData={rows}
                                index={i}
                                isDataLoading={isLoading}
                                isShareDataLoading={isLoading}
                                data={data}
                                actions={actions}
                                getFullDataToActionHandler={
                                  getFullDataToActionHandler
                                }
                              />
                            )}
                          </>
                        ) : (
                          <span
                            className="flex gap-5 justify-end items-center"
                            id="action-data"
                          >
                            {actions
                              .filter((action) => {
                                return !action.disabledOn.some((disable) => {
                                  const conditionValue =
                                    data[disable.attribute_name];
                                  return conditionValue === disable.value;
                                });
                              })
                              .slice(0, 3)
                              .map((action, index) => (
                                <Fragment key={index}>
                                  {!!checkPermissions(
                                    action.permissions,
                                    permissions
                                  ) && (
                                    <button
                                      data-auto={`table-v3-action-${action.name}-${dataAuto}`}
                                      onClick={() =>
                                        action.handler(
                                          getFullDataToActionHandler
                                            ? data
                                            : data?.id
                                        )
                                      }
                                      data-tip={action.name}
                                      className={`tooltip ${
                                        action === actions[actions.length - 1]
                                          ? "tooltip-left"
                                          : "tooltip-left"
                                      } tooltip-primary`}
                                      key={index}
                                    >
                                      <action.Icon
                                        className={`text-xl ${
                                          action.name === "delete"
                                            ? " text-red-500"
                                            : "text-primary"
                                        }`}
                                      />
                                    </button>
                                  )}
                                </Fragment>
                              ))}

                            {actions.filter((action) => {
                              return !action.disabledOn.some((disable) => {
                                const conditionValue =
                                  data[disable.attribute_name];
                                return conditionValue === disable.value;
                              });
                            }).length > 3 ? (
                              <CustomDropDownForTable
                                getFullDataToActionHandler={
                                  getFullDataToActionHandler
                                }
                                isDeleteDisabled={data?.is_system_default}
                                disabled={selectedIds.length > 1}
                                fullData={rows}
                                index={i}
                                isDataLoading={isLoading}
                                isShareDataLoading={isLoading}
                                data={data}
                                actions={actions
                                  .filter((action) => {
                                    return !action.disabledOn.some(
                                      (disable) => {
                                        const conditionValue =
                                          data[disable.attribute_name];
                                        return conditionValue === disable.value;
                                      }
                                    );
                                  })
                                  .slice(3)}
                              />
                            ) : (
                              ""
                            )}
                          </span>
                        )}
                      </td>
                    ) : (
                      ""
                    )}
                  </tr>

                  {/* CHILDREN DATA  */}
                  {expandedRows.includes(data.id) && (
                    <tr className="transition-all ">
                      <td
                        colSpan={cols?.filter((col) => col?.show)?.length + 2}
                        className={`bg-primary-content border-b border-primary border-x`}
                      >
                        <table className="table table-compact w-full ">
                          <thead>
                            <tr className={`bg-primary text-base-300`}>
                              <th
                                style={{
                                  width: `1%`
                                }}
                                className="px-5"
                              >
                                <div className="flex flex-col items-start justify-start gap-2"></div>
                              </th>
                              {childCols.map((th, i) => (
                                <Fragment key={i}>
                                  {th?.show ? (
                                    <th
                                      className={`px-5 ${
                                        th?.isMainField
                                          ? "table-cell"
                                          : "hidden"
                                      } md:table-cell`}
                                      style={{
                                        width: `${th?.minWidth}%`,
                                        textAlign: th?.align
                                          ? th?.align
                                          : `left`
                                      }}
                                    >
                                      <div
                                        className={`flex flex-col text-center  ${
                                          th?.align === "center"
                                            ? "items-center"
                                            : "items-start"
                                        }  justify-start gap-2 font-semibold  text-sm`}
                                      >
                                        {" "}
                                        {th?.name.slice(0, 1).toUpperCase() +
                                          th?.name.slice(1)}{" "}
                                      </div>
                                    </th>
                                  ) : (
                                    ""
                                  )}
                                </Fragment>
                              ))}

                              {childActions.length > 0 ? (
                                <th
                                  style={{
                                    minWidth: "1%",
                                    paddingRight: "20px"
                                  }}
                                >
                                  <div className="flex items-center justify-end  text-sm">
                                    <span>Actions</span>
                                  </div>
                                </th>
                              ) : (
                                ""
                              )}
                            </tr>
                          </thead>
                          <tbody className={`w-full`}>
                            {data?.children?.length > 0 ? (
                              data?.children?.map((data2, i) => (
                                <Fragment key={i}>
                                  <tr
                                    className={`border border-b ${
                                      i % 2 === 1
                                        ? "bg-base-100"
                                        : "bg-base-300"
                                    } border-primary-content ${
                                      !data2?.is_present ? " " : ""
                                    } h-16  text-neutral group tableRowAdmin hover:overflow-hidden
                                 `}
                                    id={`child-row-${i + 1}`}
                                  >
                                    <td
                                      data-auto={`table-v4-number-${dataAuto}`}
                                      key={i}
                                      style={{
                                        minWidth: "1%"
                                      }}
                                      className={`px-5    ${
                                        data2?.is_present
                                          ? ""
                                          : `${
                                              data2?.is_on_holiday
                                                ? "text-green-500 font-bold"
                                                : `${
                                                    data2?.is_present
                                                      ? ""
                                                      : "text-red-500 font-bold"
                                                  }`
                                            }`
                                      }  `}
                                    >
                                      <span>{i + 1}</span>
                                    </td>

                                    {childCols?.map((col, j) => (
                                      <Fragment key={j}>
                                        {col?.show ? (
                                          <>
                                            {col?.attribute_name === "date" &&
                                            (data2?.is_on_leave ||
                                              data2?.is_on_holiday) ? (
                                              <td
                                                colSpan={2}
                                                data-auto={`table-v3-col-data${
                                                  j + 1
                                                }-${dataAuto}`}
                                                style={{
                                                  width: `${col?.minWidth}%`
                                                }}
                                                key={j}
                                                className={`px-5 ${
                                                  col?.isMainField
                                                    ? "table-cell"
                                                    : "hidden"
                                                } text-start md:table-cell ${
                                                  col?.wrap
                                                    ? "overflow-wrap-anywhere"
                                                    : ""
                                                } ${
                                                  data2?.is_on_holiday
                                                    ? "text-green-500"
                                                    : `${
                                                        data2?.is_present
                                                          ? ""
                                                          : "text-red-500"
                                                      }`
                                                } font-bold`}
                                              >
                                                {data2[col?.attribute_name]}
                                              </td>
                                            ) : (
                                              <>
                                                {!(
                                                  data2?.is_on_leave ||
                                                  data2?.is_on_holiday
                                                ) ? (
                                                  <td
                                                    data-auto={`table-v3-col-data${
                                                      j + 1
                                                    }-${dataAuto}`}
                                                    style={{
                                                      width: `${col?.minWidth}%`
                                                    }}
                                                    key={j}
                                                    className={`px-5 ${
                                                      col?.isMainField
                                                        ? "table-cell"
                                                        : "hidden"
                                                    } ${
                                                      data2?.is_on_holiday
                                                        ? "text-green-500"
                                                        : `${
                                                            data2?.is_present
                                                              ? ""
                                                              : "text-red-500"
                                                          }`
                                                    }  ${
                                                      col?.align === "center" &&
                                                      "text-center"
                                                    } md:table-cell ${
                                                      col?.wrap
                                                        ? "overflow-wrap-anywhere"
                                                        : ""
                                                    }`}
                                                  >
                                                    {data2?.is_present
                                                      ? data2[
                                                          col?.attribute_name
                                                        ]
                                                      : col?.attribute_name !==
                                                          "lateness_status" &&
                                                        data2[
                                                          col?.attribute_name
                                                        ]}
                                                  </td>
                                                ) : (
                                                  <>
                                                    {j <= 1 ? (
                                                      <>
                                                        <td
                                                          colSpan={7}
                                                          style={{
                                                            width: `${col?.minWidth}%`
                                                          }}
                                                          key={j}
                                                          className={`px-5 ${
                                                            col?.isMainField
                                                              ? "table-cell"
                                                              : "hidden"
                                                          } text-center md:table-cell ${
                                                            col?.wrap
                                                              ? "overflow-wrap-anywhere"
                                                              : ""
                                                          } ${
                                                            data2?.is_on_holiday
                                                              ? "text-green-500"
                                                              : `${
                                                                  data2?.is_present
                                                                    ? ""
                                                                    : "text-red-500"
                                                                }`
                                                          } font-semibold `}
                                                        >
                                                          {data2?.is_on_holiday
                                                            ? "Holiday"
                                                            : "On Leave."}
                                                        </td>
                                                        <td
                                                          style={{
                                                            width: `${col?.minWidth}%`
                                                          }}
                                                          key={j}
                                                          className={`px-5 ${
                                                            col?.isMainField
                                                              ? "table-cell"
                                                              : "hidden"
                                                          } text-end  md:table-cell ${
                                                            col?.wrap
                                                              ? "overflow-wrap-anywhere"
                                                              : ""
                                                          }`}
                                                        >
                                                          <button
                                                            onClick={() => {
                                                              data2?.is_on_holiday
                                                                ? handleViewHoliday(
                                                                    data2?.id
                                                                  )
                                                                : handleViewLeave(
                                                                    data2?.leave_id
                                                                  );
                                                            }}
                                                            className={`btn ${
                                                              data2?.is_on_holiday
                                                                ? "bg-green-500 hover:bg-green-700"
                                                                : "bg-red-500 hover:bg-red-700"
                                                            } text-base-300 btn-sm flex justify-center items-center w-full`}
                                                          >
                                                            <span>Details</span>
                                                          </button>
                                                        </td>
                                                      </>
                                                    ) : (
                                                      ""
                                                    )}
                                                  </>
                                                )}
                                              </>
                                            )}
                                          </>
                                        ) : (
                                          ""
                                        )}
                                      </Fragment>
                                    ))}

                                    {childActions?.filter((action) => {
                                      return !action.disabledOn.some(
                                        (disable) => {
                                          const conditionValue =
                                            data2[disable.attribute_name];
                                          return (
                                            conditionValue === disable.value
                                          );
                                        }
                                      );
                                    })?.length > 0 ? (
                                      <td
                                        style={{
                                          width: "1%",
                                          paddingRight: "20px"
                                        }}
                                        className="text-right"
                                        id={`action-data-container`}
                                      >
                                        {!isFullActionList ? (
                                          <>
                                            {getFullDataToActionHandler ? (
                                              <CustomDropDownForTableWithFullData
                                                isDeleteDisabled={
                                                  data2?.is_system_default
                                                }
                                                disabled={
                                                  selectedIds.length > 1
                                                }
                                                fullData={rows}
                                                index={i}
                                                isDataLoading={isLoading}
                                                isShareDataLoading={isLoading}
                                                data={data2}
                                                actions={childActions}
                                              />
                                            ) : (
                                              <CustomDropDownForTable
                                                isDeleteDisabled={
                                                  data2?.is_system_default
                                                }
                                                disabled={
                                                  selectedIds.length > 1
                                                }
                                                fullData={rows}
                                                index={i}
                                                isDataLoading={isLoading}
                                                isShareDataLoading={isLoading}
                                                data={data2}
                                                actions={childActions}
                                                getFullDataToActionHandler={
                                                  getFullDataToActionHandler
                                                }
                                              />
                                            )}
                                          </>
                                        ) : (
                                          <span
                                            className="flex gap-5 justify-end items-center"
                                            id="action-data"
                                          >
                                            {childActions
                                              .filter((action) => {
                                                return !action.disabledOn.some(
                                                  (disable) => {
                                                    const conditionValue =
                                                      data2[
                                                        disable.attribute_name
                                                      ];
                                                    return (
                                                      conditionValue ===
                                                      disable.value
                                                    );
                                                  }
                                                );
                                              })
                                              .slice(0, 3)
                                              .map((action, index) => (
                                                <Fragment key={index}>
                                                  {!!checkPermissions(
                                                    action.permissions,
                                                    permissions
                                                  ) && (
                                                    <button
                                                      data-auto={`table-v3-action-${action.name}-${dataAuto}`}
                                                      onClick={() =>
                                                        action.handler(
                                                          getFullDataToActionHandler
                                                            ? data2
                                                            : data2?.id
                                                        )
                                                      }
                                                      data-tip={action.name}
                                                      className={`tooltip ${
                                                        action ===
                                                        childActions[
                                                          childActions.length -
                                                            1
                                                        ]
                                                          ? "tooltip-left"
                                                          : "tooltip-left"
                                                      } tooltip-primary`}
                                                      key={index}
                                                    >
                                                      <action.Icon
                                                        className={`text-xl ${
                                                          action.name ===
                                                          "delete"
                                                            ? " text-red-500"
                                                            : "text-primary"
                                                        }`}
                                                      />
                                                    </button>
                                                  )}
                                                </Fragment>
                                              ))}

                                            {childActions.filter((action) => {
                                              return !action.disabledOn.some(
                                                (disable) => {
                                                  const conditionValue =
                                                    data2[
                                                      disable.attribute_name
                                                    ];
                                                  return (
                                                    conditionValue ===
                                                    disable.value
                                                  );
                                                }
                                              );
                                            }).length > 3 ? (
                                              <CustomDropDownForTable
                                                getFullDataToActionHandler={
                                                  getFullDataToActionHandler
                                                }
                                                isDeleteDisabled={
                                                  data2?.is_system_default
                                                }
                                                disabled={
                                                  selectedIds.length > 1
                                                }
                                                fullData={rows}
                                                index={i}
                                                isDataLoading={isLoading}
                                                isShareDataLoading={isLoading}
                                                data={data2}
                                                actions={childActions
                                                  .filter((action) => {
                                                    return !action.disabledOn.some(
                                                      (disable) => {
                                                        const conditionValue =
                                                          data2[
                                                            disable
                                                              .attribute_name
                                                          ];
                                                        return (
                                                          conditionValue ===
                                                          disable.value
                                                        );
                                                      }
                                                    );
                                                  })
                                                  .slice(3)}
                                              />
                                            ) : (
                                              ""
                                            )}
                                          </span>
                                        )}
                                      </td>
                                    ) : (
                                      <td
                                        style={{
                                          width: "1%",
                                          paddingRight: "20px"
                                        }}
                                        className="text-right"
                                        id={`action-data-container`}
                                      ></td>
                                    )}
                                  </tr>
                                </Fragment>
                              ))
                            ) : (
                              <tr>
                                <td
                                  className="text-center py-5 bg-base-300"
                                  colSpan={cols?.length + 4}
                                >
                                  {/* FOR DEFAULT LIGHT THEME  */}
                                  <div className="flex justify-center items-center flex-col">
                                    <div className="w-[200px] flex flex-col gap-2 justify-center items-center">
                                      <img
                                        data-auto={`table-v3-desktop-no-data-found-image-${dataAuto}`}
                                        className="w-20"
                                        src="/assets/nodatafound.svg"
                                        alt="no data found"
                                      />
                                      <div>
                                        <h4 className="font-medium text-lg">
                                          Nothing Found!
                                        </h4>
                                        <p className="font-light">
                                          Please add a new entity to see the
                                          content here. Thank you!
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                </td>
                              </tr>
                            )}
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  )}
                </Fragment>
              ))
            ) : (
              <tr>
                <td
                  className="text-center py-5 bg-base-300"
                  colSpan={cols?.length + 4}
                >
                  {/* FOR DEFAULT LIGHT THEME  */}
                  <div className="flex justify-center items-center flex-col">
                    <div className="w-[200px] flex flex-col gap-2 justify-center items-center">
                      <img
                        data-auto={`table-v3-desktop-no-data-found-image-${dataAuto}`}
                        className="w-20"
                        src="/assets/nodatafound.svg"
                        alt="no data found"
                      />
                      <div>
                        <h4 className="font-medium text-lg">Nothing Found!</h4>
                        <p className="font-light">
                          Please add a new entity to see the content here. Thank
                          you!
                        </p>
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
            )
          ) : (
            <tr>
              <td className="text-center py-5" colSpan={cols?.length + 4}>
                <div
                  className={`w-full flex flex-col justify-center items-center`}
                >
                  <img
                    className={`w-auto h-[80px]`}
                    src="/assets/loadingAnimation.gif"
                    alt="Loading Animation"
                  />
                  <span className={``}>Loading...</span>
                </div>
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* FOR MOBILE VIEW  */}
      <div className={`w-full block md:hidden overflow-hidden`}>
        {!isLoading ? (
          rows?.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 md:gap-0 bg-base-200 ">
              {rows?.map((data, index) => (
                <MobileCardComponent
                  expandedRows={expandedRows}
                  actions={actions}
                  isFullActionList={isFullActionList}
                  data={data}
                  selectedIds={selectedIds}
                  rows={rows}
                  index={index}
                  isLoading={isLoading}
                  permissions={permissions}
                  getFullDataToActionHandler={getFullDataToActionHandler}
                  key={index}
                  cols={cols}
                  topCol={topCol}
                  col1Width={col1Width}
                  col2Width={col2Width}
                  dataAuto={dataAuto}
                  toggleRow={toggleRow}
                  childCols={childCols}
                  handleViewHoliday={handleViewHoliday}
                  handleViewLeave={handleViewLeave}
                />
              ))}
            </div>
          ) : (
            <div className="flex justify-center items-center flex-col bg-base-200 p-5  rounded-xl">
              <div className="w-[200px] flex flex-col gap-2 justify-center items-center">
                <img
                  data-auto={`table-v3-no-data-found-image-${dataAuto}`}
                  className="w-20"
                  src="/assets/nodatafound.svg"
                  alt="no data found"
                />
                <div className={`flex justify-center items-center flex-col`}>
                  <h4 className="font-medium text-lg text-center">
                    Nothing Found!
                  </h4>
                  <p className="font-light text-center">
                    Please add a new entity to see the content here. Thank you!
                  </p>
                </div>
              </div>
            </div>
          )
        ) : (
          <CustomLoading h={"h-[40vh]"} />
        )}
      </div>
    </div>
  );
}

TableV4ForAttendanceSummary.propTypes = {
  getFullDataToActionHandler: PropTypes.func,
  rows: PropTypes.array,
  cols: PropTypes.array,
  isLoading: PropTypes.bool,
  actions: PropTypes.array,
  isFullActionList: PropTypes.bool,
  selectedIds: PropTypes.array,
  header: PropTypes.bool,
  topCol: PropTypes.array,
  col1Width: PropTypes.string,
  col2Width: PropTypes.string,
  dataAuto: PropTypes.string,
  childCols: PropTypes.array,
  childActions: PropTypes.array,
  specialClasses: PropTypes.string,
  defaultExpandedRows: PropTypes.array,
  MobileCardComponent: PropTypes.func,
  setIsUpdated: PropTypes.func
};
