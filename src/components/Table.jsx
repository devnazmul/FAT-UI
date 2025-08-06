// ===========================================
// #00122
// ===========================================

import PropTypes from "prop-types";
import React, { Fragment, useState } from "react";
import { checkPermissions } from "../utils/checkPermissions";
import CustomDropDownForTable from "./CustomDropDownForTable";
import CustomLoading from "./CustomLoading";

export default function Table({
  getFullDataToActionHandler = false,
  rows,
  cols,
  isLoading,
  actions = [],
  isFullActionList = true,
  selectedIds = [],
  setSelectedIds,
  checkBoxes = false,
  header = true,
  tableHeaderClass = "bg-base-200",
  col1Width = "w-[30%]",
  col2Width = "w-[70%]",
  dataAuto,
  specialClasses = []
}) {
  const [allChecked, setAllChecked] = useState(false);
  const permissions = localStorage.getItem("permissions");

  const handleTickAll = (e) => {
    const { checked } = e.target;
    if (checked) {
      setSelectedIds(rows.map((d) => parseInt(d.id)));
      setAllChecked(true);
    } else {
      setSelectedIds([]);
      setAllChecked(false);
    }
  };

  const handleTick = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setSelectedIds([...selectedIds, parseInt(value)]);
    } else {
      setSelectedIds(
        selectedIds.filter((single_id) => single_id !== parseInt(value))
      );
      setAllChecked(false);
    }
  };

  return (
    <div
      className={`min-h-[300px]  overflow-x-auto scrollbar top-0 w-full bg-base-200 md:bg-base-300 `}
      data-auto={`table-container-${dataAuto}`}
    >
      {/* FOR DESKTOP VIEW  */}
      <table
        className="hidden md:table gap-2 rounded-xl "
        data-auto={`table-${dataAuto}`}
      >
        {header ? (
          <thead className={`${tableHeaderClass}`}>
            <tr className="h-16 text-neutral border-b border-primary-content">
              {checkBoxes ? (
                <th
                  style={{
                    width: `1%`
                  }}
                  className=" px-8"
                >
                  <label>
                    <input
                      data-auto={`table-checkbox-${dataAuto}`}
                      checked={
                        allChecked ||
                        (selectedIds?.length === rows?.length &&
                          selectedIds?.length !== 0)
                      }
                      onClick={handleTickAll}
                      onChange={() => {}}
                      type="checkbox"
                      className={`checkbox checkbox-primary`}
                    />
                  </label>
                </th>
              ) : (
                ""
              )}
              <th
                style={{
                  width: `1%`
                }}
                className="px-5"
              >
                <div className="flex flex-col items-start justify-start gap-2"></div>
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
                        className={`flex flex-col text-center text-sm ${
                          th?.align === "center"
                            ? "items-center"
                            : "items-start"
                        }  justify-start gap-2 font-semibold`}
                      >
                        {th?.name?.slice(0, 1)?.toUpperCase() +
                          th?.name?.slice(1)}{" "}
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

        <tbody className="" data-auto={`table-body-${dataAuto}`}>
          {!isLoading ? (
            rows && rows?.length > 0 ? (
              rows.map((data, i) => (
                <tr
                  key={i}
                  className={`border-b ${
                    i % 2 === 1 ? "bg-base-100" : "bg-base-300"
                  } border-primary-content  h-16 hover:bg-base-100 text-neutral group tableRowAdmin hover:overflow-hidden  ${
                    specialClasses.map((item) => {
                      if (data[item?.attribute_name] === item?.value) {
                        return item?.className;
                      }
                    })[0] ?? "hover:bg-base-100"
                  }`}
                >
                  {checkBoxes ? (
                    <td className="w-[50px] px-8">
                      <label>
                        <input
                          data-auto={`table-v3-body-checkbox-${dataAuto}`}
                          checked={allChecked || selectedIds.includes(data.id)}
                          value={data?.id}
                          onClick={handleTick}
                          onChange={() => {}}
                          type="checkbox"
                          className="checkbox checkbox-primary"
                        />
                      </label>
                    </td>
                  ) : (
                    ""
                  )}
                  <td
                    data-auto={`table-number-${dataAuto}`}
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
                          data-auto={`table-col-data${j + 1}-${dataAuto}`}
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

                  {actions?.length > 0 ? (
                    <td
                      style={{
                        width: "1%",
                        paddingRight: "20px"
                      }}
                      className="text-right"
                    >
                      {!isFullActionList ? (
                        <CustomDropDownForTable
                          dataAuto={`${dataAuto}`}
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
                          actions={actions}
                        />
                      ) : (
                        <span className="flex gap-5 justify-end items-center">
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
                                {checkPermissions(
                                  action.permissions,
                                  permissions
                                ) ? (
                                  <button
                                    data-auto={`${dataAuto}-${action.name}-${data?.id}`}
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
                                        : "tooltip-top"
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
                                ) : (
                                  ""
                                )}
                              </Fragment>
                            ))}

                          {actions.length > 3 ? (
                            <CustomDropDownForTable
                              dataAuto={`${dataAuto}`}
                              isDeleteDisabled={data?.is_system_default}
                              disabled={selectedIds.length > 1}
                              fullData={rows}
                              index={i}
                              isDataLoading={isLoading}
                              isShareDataLoading={isLoading}
                              data={data}
                              actions={actions
                                .filter((action) => {
                                  return !action.disabledOn.some((disable) => {
                                    const conditionValue =
                                      data[disable.attribute_name];
                                    return conditionValue === disable.value;
                                  });
                                })
                                .slice(3)}
                              getFullDataToActionHandler={
                                getFullDataToActionHandler
                              }
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
                        data-auto={`table-desktop-no-data-found-image-${dataAuto}`}
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
      <div className={`w-full block md:hidden `}>
        {checkBoxes ? (
          <div className="w-28 pt-5 pb-2">
            <label
              className={`flex items-center justify-start gap-x-2 cursor-pointer`}
            >
              <input
                data-auto={`table-checkbox-${dataAuto}`}
                checked={
                  allChecked ||
                  (selectedIds?.length === rows?.length &&
                    selectedIds?.length !== 0)
                }
                onClick={handleTickAll}
                onChange={() => {}}
                type="checkbox"
                className={`checkbox checkbox-primary`}
              />
              <span>Select All</span>
            </label>
          </div>
        ) : (
          ""
        )}
        {!isLoading ? (
          rows?.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 md:gap-0 bg-base-200 ">
              {rows?.map((data, i) => (
                <div
                  key={i}
                  className="p-5 my-2 rounded-xl bg-base-300 border border-primary-content shadow-md shadow-primary-content flex flex-col overflow-auto scrollbar-none relative"
                >
                  {checkBoxes ? (
                    <div className="w-[50px] px-8 absolute -left-5 top-3">
                      <label
                        className={`flex justify-start items-center gap-x-2 cursor-pointer`}
                      >
                        <input
                          data-auto={`table-v3-body-checkbox-${dataAuto}`}
                          checked={allChecked || selectedIds.includes(data.id)}
                          value={data?.id}
                          onClick={handleTick}
                          onChange={() => {}}
                          type="checkbox"
                          className="checkbox checkbox-primary"
                        />
                        <span>Select</span>
                      </label>
                    </div>
                  ) : (
                    ""
                  )}
                  <div className={`w-full flex justify-center pt-1 pb-5`}>
                    {actions?.length > 0 ? (
                      <td className="text-right p-0">
                        {!isFullActionList ? (
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
                        ) : (
                          <div className="flex gap-2 justify-end items-center">
                            {actions
                              .filter((action) => {
                                return !action.disabledOn.some((disable) => {
                                  const conditionValue =
                                    data[disable.attribute_name];
                                  return conditionValue === disable.value;
                                });
                              })
                              .map((action, index) => (
                                <React.Fragment key={index}>
                                  {checkPermissions(
                                    action.permissions,
                                    permissions
                                  ) ? (
                                    <button
                                      data-auto={`table-action-${action.name}-${dataAuto}`}
                                      onClick={() =>
                                        action.handler(
                                          getFullDataToActionHandler
                                            ? data
                                            : data?.id
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
                  <table
                    data-auto={`table-${dataAuto}`}
                    className="table w-full "
                  >
                    <tbody>
                      {cols.map((col, j) => (
                        <Fragment key={j}>
                          {col?.show ? (
                            <>
                              {data[col?.attribute_name] ? (
                                <tr
                                  key={j}
                                  className={`px-5 border-y border-primary-content w-auto`}
                                >
                                  <td
                                    data-auto={`table-col-name${
                                      j + 1
                                    }-${dataAuto}`}
                                    className={`font-bold border border-primary-content text-primary ${col1Width}`}
                                  >
                                    {col.name}:
                                  </td>
                                  <td
                                    data-auto={`table-col-value${
                                      j + 1
                                    }-${dataAuto}`}
                                    className={`border border-primary-content overflow-wrap-anywhere ${col2Width}`}
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
                          )}
                        </Fragment>
                      ))}
                    </tbody>
                  </table>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex justify-center items-center flex-col bg-base-200 p-5  rounded-xl">
              <div className="w-[200px] flex flex-col gap-2 justify-center items-center">
                <img
                  data-auto={`table-no-data-found-image-${dataAuto}`}
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

Table.propTypes = {
  getFullDataToActionHandler: PropTypes.func,
  rows: PropTypes.arrayOf(PropTypes.object).isRequired,
  cols: PropTypes.arrayOf(PropTypes.object).isRequired,
  isLoading: PropTypes.bool.isRequired,
  actions: PropTypes.arrayOf(PropTypes.object),
  isFullActionList: PropTypes.bool,
  selectedIds: PropTypes.arrayOf(PropTypes.number).isRequired,
  setSelectedIds: PropTypes.func.isRequired,
  checkBoxes: PropTypes.bool,
  header: PropTypes.bool,
  tableHeaderClass: PropTypes.string,
  col1Width: PropTypes.string,
  col2Width: PropTypes.string,
  dataAuto: PropTypes.string.isRequired,
  specialClasses: PropTypes.arrayOf(PropTypes.string)
};
