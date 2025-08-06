import PropTypes from "prop-types";
import React, { Fragment } from "react";
import { checkPermissions } from "../utils/checkPermissions";
import CustomDropDownForTable from "./CustomDropDownForTable";
import CustomLoading from "./CustomLoading";
import TableV3 from "./TableV3";
import TableWithSort from "./TableWithSort";

export default function CustomSortableTable({
  sortItems = [],
  getFullDataToActionHandler = false,
  rows = [],
  cols = [],
  isLoading = true,
  actions = [],
  isFullActionList = true,
  selectedIds = [],
  setSelectedIds,
  checkBoxes = false,
  header = true,
  topCol = [],
  col1Width = "35%",
  col2Width = "65%",
  dataAuto = "",
  specialClasses = [],
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
    dataAuto
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
              />
            ) : (
              <div className="flex gap-2 justify-end items-center">
                {actions
                  ?.filter(
                    (action) =>
                      !action.disabledOn.some((disable) => {
                        const conditionValue = data[disable.attribute_name];
                        return conditionValue === disable.value;
                      })
                  )
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
        <tbody>
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
                      className={`px-5 border-y border-primary-content w-auto ${
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
              )}
            </Fragment>
          ))}
        </tbody>
      </table>
    </div>
  ),
  onReorder = (e) => e,
  isSortingEnabled = false
}) {
  if (isLoading) {
    return <CustomLoading />;
  }
  return (
    <>
      {isSortingEnabled ? (
        <TableWithSort
          sortItems={sortItems}
          getFullDataToActionHandler={getFullDataToActionHandler}
          rows={rows}
          cols={cols}
          isLoading={isLoading}
          actions={actions}
          isFullActionList={isFullActionList}
          selectedIds={selectedIds}
          setSelectedIds={setSelectedIds}
          checkBoxes={checkBoxes}
          header={header}
          topCol={topCol}
          col1Width={col1Width}
          col2Width={col2Width}
          dataAuto={dataAuto}
          specialClasses={specialClasses}
          MobileCardComponent={MobileCardComponent}
          onReorder={onReorder}
          isSortingEnabled={isSortingEnabled}
        />
      ) : (
        <TableV3
          sortItems={sortItems}
          getFullDataToActionHandler={getFullDataToActionHandler}
          rows={rows}
          cols={cols}
          isLoading={isLoading}
          actions={actions}
          isFullActionList={isFullActionList}
          selectedIds={selectedIds}
          setSelectedIds={setSelectedIds}
          checkBoxes={checkBoxes}
          header={header}
          topCol={topCol}
          col1Width={col1Width}
          col2Width={col2Width}
          dataAuto={dataAuto}
          specialClasses={specialClasses}
          MobileCardComponent={MobileCardComponent}
          onReorder={onReorder}
          isSortingEnabled={isSortingEnabled}
        />
      )}
    </>
  );
}

CustomSortableTable.propTypes = {
  sortItems: PropTypes.array,
  getFullDataToActionHandler: PropTypes.bool,
  rows: PropTypes.array,
  cols: PropTypes.array,
  isLoading: PropTypes.bool,
  actions: PropTypes.array,
  isFullActionList: PropTypes.bool,
  selectedIds: PropTypes.array,
  setSelectedIds: PropTypes.func.isRequired,
  checkBoxes: PropTypes.bool,
  header: PropTypes.bool,
  topCol: PropTypes.array,
  col1Width: PropTypes.string,
  col2Width: PropTypes.string,
  dataAuto: PropTypes.string,
  specialClasses: PropTypes.array,
  MobileCardComponent: PropTypes.elementType,
  onReorder: PropTypes.func,
  isSortingEnabled: PropTypes.bool
};
