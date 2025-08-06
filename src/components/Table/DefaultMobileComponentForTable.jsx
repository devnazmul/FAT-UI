import { checkPermissions } from "@/utils/checkPermissions.js";
import PropTypes from "prop-types";
import React, { Fragment } from "react";
import CustomLoading from "../CustomLoading.jsx";

export default function DefaultMobileComponentForTable({
  data,
  actions,
  selectedIds,
  options,
  permissions,
  isCheckBoxEnable = false,
  checked,
  allChecked,
  handleTickAll,
  isLoading,
  handleTick,
  columns,
  topCol
}) {
  return (
    <div className={`w-full block md:hidden `}>
      {/* CHECK BOX  */}
      {!!isCheckBoxEnable && (
        <div className="w-28 pt-5 pb-2">
          <label
            className={`flex items-center justify-start gap-x-2 cursor-pointer`}
          >
            <input
              data-auto={`table-checkbox-${options?.dataAuto}`}
              disabled={checked?.every((c) => !c?.isChecked)}
              checked={
                allChecked ||
                (selectedIds?.length === data?.length &&
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
      )}

      {!isLoading ? (
        data?.length > 0 ? (
          <div className="grid grid-cols-1 gap-3 bg-base-200 ">
            {data?.map((data, i) => (
              <div
                key={i}
                className="px-5 py-5 rounded-[5px] bg-base-300 border border-primary-content shadow-md flex flex-col overflow-auto scrollbar-none relative"
              >
                {/* CHECK BOX  */}
                {!!isCheckBoxEnable && (
                  <div className="w-[50px] px-8 absolute -left-5 pb-1 top-3">
                    <label
                      className={`flex justify-start items-center gap-x-2 cursor-pointer`}
                    >
                      <input
                        data-auto={`table-v3-body-checkbox-${options?.dataAuto}`}
                        disabled={!checked?.[i]?.isChecked}
                        checked={
                          (checked[i]?.isChecked && allChecked) ||
                          selectedIds.includes(data.id)
                        }
                        value={data?.id}
                        onClick={handleTick}
                        onChange={() => {}}
                        type="checkbox"
                        className="checkbox checkbox-primary"
                      />
                      <span>Select</span>
                    </label>
                  </div>
                )}

                {/* ACTION BUTTON  */}
                {actions?.length > 0 && (
                  <div className={`w-full flex justify-center pb-5`}>
                    <td className="text-right p-0">
                      <div className="flex gap-2 justify-end items-center">
                        {actions
                          ?.filter((action) => {
                            return !action.disabledOn.some((disable) => {
                              const conditionValue =
                                data[disable.attribute_name];
                              return conditionValue === disable.value;
                            });
                          })
                          ?.map((action, index) => (
                            <React.Fragment key={index}>
                              {checkPermissions(
                                action.permissions,
                                permissions
                              ) && (
                                <button
                                  data-auto={`table-action-${action.name}-${options?.dataAuto}`}
                                  onClick={() => action.handler(data)}
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
                              )}
                            </React.Fragment>
                          ))}
                      </div>
                    </td>
                  </div>
                )}

                {/* DATA  */}
                <table
                  data-auto={`table-${options?.dataAuto}`}
                  className="table w-full rounded-md"
                >
                  <tbody>
                    {topCol
                      ? topCol?.map((col, i) =>
                          col?.show ? (
                            <tr
                              key={i}
                              className={`px-5 border-y border-primary-content w-auto `}
                            >
                              <td
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
                    {columns.map((col, j) => (
                      <Fragment key={j}>
                        {col?.show ? (
                          <>
                            {data[col?.attribute_name] ? (
                              <tr
                                key={j}
                                className={`px-5 border-y border-primary-content w-auto ${
                                  col?.attribute_name ===
                                  topCol[0]?.attribute_name
                                    ? "hidden"
                                    : ""
                                }`}
                              >
                                <td
                                  data-auto={`table-col-name${
                                    j + 1
                                  }-${options?.dataAuto}`}
                                  className={`font-bold border border-primary-content text-primary max-w-1/3 w-1/3`}
                                >
                                  {col.name}:
                                </td>
                                <td
                                  data-auto={`table-col-value${
                                    j + 1
                                  }-${options?.dataAuto}`}
                                  className={`border border-primary-content overflow-wrap-anywhere max-w-2/3 w-2/3`}
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
          // NO DATA FOUND
          <div className="flex justify-center items-center flex-col bg-base-200 p-5  rounded-xl">
            <div className="w-[200px] flex flex-col gap-2 justify-center items-center">
              <img
                data-auto={`table-no-data-found-image-${options?.dataAuto}`}
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
        // LOADING
        <CustomLoading h={"h-[40vh]"} />
      )}
    </div>
  );
}
DefaultMobileComponentForTable.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object),
  selectedIds: PropTypes.arrayOf(PropTypes.number),
  actions: PropTypes.arrayOf(PropTypes.object),
  // OPTIONS
  options: PropTypes.shape({
    dataSet: PropTypes.shape({
      top: PropTypes.bool,
      bottom: PropTypes.bool,
      left: PropTypes.bool,
      right: PropTypes.bool
    }),
    filter: PropTypes.shape({
      top: PropTypes.bool,
      bottom: PropTypes.bool,
      left: PropTypes.bool,
      right: PropTypes.bool
    }),
    table: PropTypes.shape({
      style: PropTypes.shape({
        headerClass: PropTypes.string,
        rowClass: PropTypes.string
      }),
      actionButton: PropTypes.object // You can make this more specific if you know the structure
    }),
    tableType: PropTypes.oneOf(["default", "nested", "sortable"]),
    features: PropTypes.shape({
      sortByColumnEnabled: PropTypes.bool,
      multiSelectEnable: PropTypes.bool,
      dataSetEnable: PropTypes.bool,
      filterEnable: PropTypes.bool
    }),
    dataAuto: PropTypes.string
  }),
  // PERMISSIONS
  permissions: PropTypes.array,
  isCheckBoxEnable: PropTypes.bool,
  checked: PropTypes.arrayOf(PropTypes.object),
  allChecked: PropTypes.bool,
  handleTickAll: PropTypes.func,
  isLoading: PropTypes.bool,
  handleTick: PropTypes.func,
  columns: PropTypes.array,
  topCol: PropTypes.array
};
