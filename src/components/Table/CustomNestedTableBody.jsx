import { checkPermissions } from "@/utils/checkPermissions.js";
import PropTypes from "prop-types";
import { Fragment, useState } from "react";
import CustomDropDownForTable from "./CustomDropDownForTable.jsx";
import { IoIosArrowDown } from "react-icons/io";
import CustomTable from "./CustomTable.jsx";
import { features } from "process";

export default function CustomNestedTableBody({
  childColumns,
  setChildColumns,
  isChildLoading,
  onParentRowToggle,
  data,
  columns,
  isTableDataLoading,
  actions = [],
  selectedIds = [],
  checked = [],
  isCheckBoxEnable = false,
  highLightedRows,
  dataAuto,
  specialClasses = [],
  allChecked,
  handleTick,
  permissions = [],
  numberOfDefaultActionsList = 3,
  expandedRows,
  toggleRow
}) {
  return (
    <tbody className="">
      {!isTableDataLoading ? (
        data && data?.length > 0 ? (
          data.map((data, i) => (
            // MAIN ROW
            <Fragment key={i}>
              <tr
                onClick={() => {
                  onParentRowToggle(data);
                  toggleRow(data.id);
                }}
                className={`cursor-pointer border-b
                    ${
                      i % 2 === 0 ? "bg-base-100" : "bg-base-300"
                    }   h-16 hover:bg-primary-content/50 text-sm group tableRowAdmin hover:overflow-hidden  ${
                      highLightedRows?.some(
                        (hd) => data[hd?.name] === hd?.value
                      )
                        ? `${highLightedRows?.find((hd) => data[hd?.name] === hd?.value)?.color}`
                        : ` h-16 hover:bg-base-100 ${
                            specialClasses.map((item) => {
                              if (data[item?.attribute_name] === item?.value) {
                                return item?.className;
                              }
                            })[0] ?? "hover:bg-base-100"
                          }`
                    }`}
              >
                {/* ARROW ICON */}
                <td className="w-[5px]">
                  <div className={`flex justify-center items-center px-5`}>
                    <IoIosArrowDown
                      className={`${
                        expandedRows.includes(data.id)
                          ? "-rotate-90"
                          : "-rotate-0"
                      } text-lg transition-all duration-300`}
                    />
                  </div>
                </td>

                {/* CHECKBOX */}
                {isCheckBoxEnable && (
                  <td className="w-[50px] px-8">
                    <label>
                      <input
                        data-auto={`table-v3-body-checkbox-${dataAuto}`}
                        disabled={!checked?.[i]?.isChecked}
                        checked={
                          (checked?.[i]?.isChecked && allChecked) ||
                          selectedIds.includes(data.id)
                        }
                        value={data?.id}
                        onClick={handleTick}
                        onChange={() => {}}
                        type="checkbox"
                        className="checkbox checkbox-primary"
                      />
                    </label>
                  </td>
                )}

                {/* SERIAL NUMBER */}
                <td
                  data-auto={`table-number-${dataAuto}`}
                  key={i}
                  style={{
                    width: "5px"
                  }}
                  className="px-2"
                >
                  <span className={`flex justify-center items-center`}>
                    {i + 1}
                  </span>
                </td>

                {/* MAIN COLUMNS */}
                {columns.map((col, j) => (
                  <Fragment key={j}>
                    {!!col?.show && (
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
                        } ${data["specialClasses"]}`}
                      >
                        {data[col?.attribute_name]}
                      </td>
                    )}
                  </Fragment>
                ))}

                {/* ACTIONS BUTTONS */}
                {!!(actions?.length > 0) && (
                  <td
                    style={{
                      width: "1%",
                      paddingRight: "20px"
                    }}
                    className="text-right"
                  >
                    <span className="flex gap-5 justify-end items-center">
                      {actions
                        ?.filter((action) => {
                          return !action.disabledOn.some((disable) => {
                            const conditionValue = data[disable.attribute_name];
                            return conditionValue === disable.value;
                          });
                        })
                        .slice(0, numberOfDefaultActionsList)
                        .map((action, index) => (
                          <Fragment key={index}>
                            {checkPermissions(
                              action.permissions,
                              permissions
                            ) ? (
                              <button
                                data-auto={`${dataAuto}-${action.name}-${data?.id}`}
                                onClick={() => action.handler(data)}
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

                      {!!(actions.length > numberOfDefaultActionsList) && (
                        <CustomDropDownForTable
                          dataAuto={`${dataAuto}`}
                          isDeleteDisabled={data?.is_system_default}
                          disabled={selectedIds.length > 1}
                          fullData={data}
                          index={i}
                          isDataLoading={isTableDataLoading}
                          isShareDataLoading={isTableDataLoading}
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
                        />
                      )}
                    </span>
                  </td>
                )}
              </tr>

              {expandedRows.includes(data.id) && (
                <tr className="transition-all border border-primary">
                  {isChildLoading ? (
                    <td
                      className={`px-5 py-5 text-center shadow-inner bg-base-100`}
                      colSpan={childColumns?.length}
                    >
                      Loading...
                    </td>
                  ) : (
                    <td
                      colSpan={columns?.filter((col) => col?.show)?.length + 2}
                      className={`shadow-inner px-5 pt-3 bg-base-100`}
                    >
                      <CustomTable
                        // DATA
                        data={data?.children}
                        // PARENT DATA
                        columns={childColumns}
                        setColumns={setChildColumns}
                        // LOADING STATE
                        isTableDataLoading={isTableDataLoading}
                        // OPTIONS
                        options={{
                          tableType: "default",
                          features: {
                            headerEnable: false,
                            paginationEnable: false
                          }
                        }}
                      />
                    </td>
                  )}
                </tr>
              )}
            </Fragment>
          ))
        ) : (
          // NO DATA FOUND
          <tr>
            <td
              className="text-center py-5 bg-base-300"
              colSpan={columns?.length + 4}
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
        // LOADING
        <tr>
          <td className="text-center py-5" colSpan={columns?.length + 4}>
            <div className={`w-full flex flex-col justify-center items-center`}>
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
  );
}

CustomNestedTableBody.propTypes = {
  childColumns: PropTypes.arrayOf(PropTypes.object),
  setChildColumns: PropTypes.func,
  isChildLoading: PropTypes.bool,
  data: PropTypes.arrayOf(PropTypes.object),
  columns: PropTypes.arrayOf(PropTypes.object),
  isTableDataLoading: PropTypes.bool,
  actions: PropTypes.arrayOf(PropTypes.object),
  numberOfDefaultActionsList: PropTypes.number,
  selectedIds: PropTypes.arrayOf(PropTypes.number),
  isCheckBoxEnable: PropTypes.bool,
  checked: PropTypes.arrayOf(PropTypes.object),
  highLightedRows: PropTypes.array,
  dataAuto: PropTypes.string,
  specialClasses: PropTypes.arrayOf(PropTypes.string),
  allChecked: PropTypes.bool,
  handleTick: PropTypes.func,
  permissions: PropTypes.arrayOf(PropTypes.object),
  expandedRows: PropTypes.arrayOf(PropTypes.number),
  toggleRow: PropTypes.func
};
