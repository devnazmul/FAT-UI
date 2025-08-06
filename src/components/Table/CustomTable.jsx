import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import AppliedFilters from "../Filter/AppliedFilters.jsx";
import CustomFilter from "../Filter/CustomFilter.jsx";
import CustomDataSetForTable from "./CustomDataSetForTable.jsx";
import CustomNestedTableBody from "./CustomNestedTableBody.jsx";
import CustomTableBody from "./CustomTableBody.jsx";
import CustomTableHeader from "./CustomTableHeader.jsx";
import DefaultMobileComponentForTable from "./DefaultMobileComponentForTable.jsx";
import { Pagination } from "./Pagination.jsx";

const defaultOptions = {
  dataSet: {
    top: false,
    bottom: true,
    left: false,
    right: false
  },
  filter: {
    top: false,
    bottom: true,
    left: false,
    right: false
  },
  mobileComponent: {
    topCol: []
  },
  mergeHeadingComponent: {
    withDataSet: false,
    withFilter: false
  },
  table: {
    style: {
      headerClass: "",
      rowClass: ""
    },
    actionButton: {},
    checkBoxes: false,
    highLightedRows: [],
    checked: []
  },
  pagination: { perPageAttributeName: "perPage", pageAttributeName: "page" },
  tableType: "default",
  features: {
    sortByColumnEnabled: false,
    multiSelectEnable: false,
    dataSetEnable: false,
    filterEnable: false,
    headerEnable: true,
    paginationEnable: true
  }
};

export default function CustomTable({
  dataAuto,
  // DATA
  data,

  onParentRowToggle,

  // PARENT DATA
  columns,
  setColumns,

  // FIRST CHILD DATA
  childColumns = [],
  setChildColumns,

  // SECOND CHILD DATA
  secondNestedColumns = [],
  setSecondNestedColumns,

  actions = [],
  totalNumberOfData,
  selectedIds = [],
  setSelectedIds,
  isDescriptionOpen = false,
  descriptionTitle = "",
  description = "",

  //  FILTERS
  filters,
  filterObject,
  setFilters,

  // LOADING STATE
  isFilterDataLoading,
  isTableDataLoading,
  isChildLoading,

  // MOBILE COMPONENT
  MobileComponent = (props) => <DefaultMobileComponentForTable {...props} />,

  // OPTIONS
  options = {},

  // PERMISSIONS
  permissions = localStorage.getItem("permissions"),

  headingComponent
}) {
  // Merge options
  const tableOptions = {
    ...defaultOptions,
    dataSet: {
      ...defaultOptions?.dataSet,
      ...(options?.dataSet || {})
    },
    filter: {
      ...defaultOptions?.filter,
      ...(options?.filter || {})
    },
    mobileComponent: {
      ...defaultOptions?.mobileComponent,
      ...(options?.mobileComponent || {})
    },
    mergeHeadingComponent: {
      ...defaultOptions?.mergeHeadingComponent,
      ...(options?.mergeHeadingComponent || {})
    },
    table: {
      style: {
        ...defaultOptions?.table?.style,
        ...(options?.table?.style || {})
      },
      actionButton: {},
      checkBoxes:
        options?.table?.checkBoxes || defaultOptions?.table?.checkBoxes,
      highLightedRows:
        options?.table?.highLightedRows ||
        defaultOptions?.table?.highLightedRows,
      checked: options?.table?.checked || defaultOptions?.table?.checked
    },
    pagination: {
      pageAttributeName:
        options?.pagination?.pageAttributeName ||
        defaultOptions?.pagination?.pageAttributeName,
      perPageAttributeName:
        options?.pagination?.perPageAttributeName ||
        defaultOptions?.pagination?.perPageAttributeName
    },
    tableType: options?.tableType || defaultOptions?.tableType,
    features: {
      ...defaultOptions?.features,
      ...(options?.features || {})
    }
  };

  const [expandedRows, setExpandedRows] = useState([]);
  const toggleRow = (id) => {
    setExpandedRows((prev) => (prev.includes(id) ? [] : [id]));
  };

  useEffect(() => {
    tableOptions?.table?.checked?.map(
      (check) =>
        check?.isChecked &&
        setSelectedIds([...selectedIds, parseInt(check?.id)])
    );
  }, []);

  // MULTI SELECT FUNCTIONALITIES
  const [allChecked, setAllChecked] = useState(false);
  const handleTickAll = (e) => {
    if (e.target.checked) {
      if (tableOptions?.table?.checked) {
        setSelectedIds(
          data
            .map((d) => parseInt(d.id))
            .filter((id) =>
              tableOptions?.table?.checked.some(
                (c) => c.id === id && c.isChecked
              )
            )
        );
      } else {
        setSelectedIds(data.map((d) => parseInt(d.id)));
      }
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
    <div className={`pb-5`}>
      {/* TOP SECTION  */}
      {!!tableOptions?.features?.headerEnable && (
        <>
          {/* DESCRIPTION  */}
          <div
            className={`bg-primary-content/50 border-primary/50 rounded-lg mt-3 mb-2 transition-all overflow-hidden aspect-auto ${
              isDescriptionOpen ? "h-auto p-5 border-2" : "h-0 p-0 border-0"
            }`}
          >
            <div>
              <h2 className={`font-bold mb-2`}>{descriptionTitle}:</h2>
              <p>{description}</p>
            </div>
          </div>

          {/* FILTER AND DATASET  */}
          {!!(
            tableOptions?.features?.dataSetEnable ||
            tableOptions?.features?.filterEnable
          ) && (
            <div
              className={`w-full flex ${headingComponent ? "justify-between" : tableOptions?.features?.dataSetEnable && tableOptions?.features?.filterEnable ? "justify-end md:justify-between" : tableOptions?.features?.dataSetEnable ? "justify-end md:justify-start" : "justify-end"} items-center `}
            >
              {/* DATA SET  */}
              {!!tableOptions?.features?.dataSetEnable && (
                <div
                  className={
                    tableOptions?.mergeHeadingComponent?.withDataSet
                      ? "flex items-center gap-2"
                      : `hidden md:flex items-center gap-2`
                  }
                >
                  <CustomDataSetForTable
                    columns={columns}
                    setColumns={setColumns}
                    dataAuto={`${dataAuto}-dataSet`}
                    top={tableOptions?.dataSet?.top}
                    bottom={tableOptions?.dataSet?.bottom}
                    left={tableOptions?.dataSet?.left}
                    right={tableOptions?.dataSet?.right}
                  />
                  {!!(
                    tableOptions?.mergeHeadingComponent?.withDataSet &&
                    headingComponent
                  ) && headingComponent}
                </div>
              )}
              {/* FILTER */}
              {!!tableOptions?.features?.filterEnable && (
                <div
                  className={
                    !!tableOptions?.mergeHeadingComponent?.withFilter &&
                    `flex items-center gap-2`
                  }
                >
                  <CustomFilter
                    dataAuto={`${dataAuto}-filter`}
                    totalData={totalNumberOfData}
                    isLoading={isFilterDataLoading}
                    onApplyChange={(e) => {
                      setFilters((prev) => ({ ...prev, ...e }));
                    }}
                    options={filterObject}
                    top={tableOptions?.filter?.top}
                    bottom={tableOptions?.filter?.bottom}
                    left={tableOptions?.filter?.left}
                    right={tableOptions?.filter?.right}
                  />
                  {!!(
                    tableOptions?.mergeHeadingComponent?.withFilter &&
                    headingComponent
                  ) && headingComponent}
                </div>
              )}
              {tableOptions?.mergeHeadingComponent?.withDataSet ||
              tableOptions?.mergeHeadingComponent?.withFilter
                ? ""
                : headingComponent
                  ? headingComponent
                  : ""}
            </div>
          )}

          {/* APPLIED FILTER  */}
          {!!(
            (filterObject?.filter((f) => f?.defaultSelectedValues?.length)
              ?.length > 0 ||
              filterObject?.filter((f) => f?.defaultValue)?.length > 0) &&
            tableOptions?.features?.filterEnable
          ) && (
            <div className={``}>
              <AppliedFilters setFilters={setFilters} filters={filterObject} />
            </div>
          )}
        </>
      )}

      {/* TABLE  */}
      <div
        className={`hidden md:block overflow-hidden rounded-lg border border-gray-200 bg-white shadow mt-2`}
      >
        <div
          className={`max-h-[calc(100vh-270px)] overflow-auto scrollbar-thin`}
        >
          <table
            className="min-w-full divide-y divide-gray-200"
            style={{ minWidth: "1200px" }}
          >
            <CustomTableHeader
              tableType={tableOptions?.tableType}
              columns={columns}
              isCheckBoxEnable={tableOptions?.table?.checkBoxes}
              multiSelectEnable={tableOptions?.features?.multiSelectEnable}
              handleTickAll={handleTickAll}
              checked={tableOptions?.table?.checked}
              allChecked={allChecked}
              selectedIds={selectedIds}
              data={data}
              dataAuto={`${dataAuto}-table`}
              actions={actions}
              filters={filters}
              onApplySorting={(e) => {
                setFilters((prev) => ({ ...prev, ...e }));
              }}
            />

            {/* DEFAULT TABLE  */}
            {tableOptions.tableType === "default" && (
              <CustomTableBody
                data={data}
                columns={columns}
                isTableDataLoading={isTableDataLoading}
                actions={actions}
                isCheckBoxEnable={tableOptions?.table?.checkBoxes}
                highLightedRows={tableOptions?.table?.highLightedRows}
                selectedIds={selectedIds}
                multiSelectEnable={tableOptions?.features?.multiSelectEnable}
                specialClasses={tableOptions?.features?.specialClasses}
                checked={tableOptions?.table?.checked}
                allChecked={allChecked}
                handleTick={handleTick}
                permissions={permissions}
                dataAuto={dataAuto}
              />
            )}

            {/* NESTED TABLE  */}
            {tableOptions.tableType === "nested" && (
              <CustomNestedTableBody
                expandedRows={expandedRows}
                toggleRow={toggleRow}
                onParentRowToggle={onParentRowToggle}
                childColumns={childColumns}
                setChildColumns={setChildColumns}
                secondNestedColumns={secondNestedColumns}
                setSecondNestedColumns={setSecondNestedColumns}
                data={data}
                columns={columns}
                isTableDataLoading={isTableDataLoading}
                actions={actions}
                isCheckBoxEnable={tableOptions?.table?.checkBoxes}
                highLightedRows={tableOptions?.table?.highLightedRows}
                selectedIds={selectedIds}
                multiSelectEnable={tableOptions?.features?.multiSelectEnable}
                specialClasses={tableOptions?.features?.specialClasses}
                checked={tableOptions?.table?.checked}
                allChecked={allChecked}
                handleTick={handleTick}
                permissions={permissions}
                dataAuto={dataAuto}
                isChildLoading={isChildLoading}
              />
            )}
          </table>
        </div>

        {/* PAGINATION  */}
        {!!(tableOptions?.features?.paginationEnable && totalNumberOfData) && (
          <>
            {totalNumberOfData !== 0 && (
              <div className="flex-col sticky bottom-0 flex justify-center items-center w-full">
                <Pagination
                  filters={filters}
                  setFilters={setFilters}
                  total={totalNumberOfData}
                  dataAuto={`${dataAuto}-pagination`}
                />
              </div>
            )}
          </>
        )}
      </div>

      {/* MOBILE COMPONENT  */}
      <div className={`md:hidden mt-3`}>
        {tableOptions.tableType === "default" && (
          <MobileComponent
            data={data}
            actions={actions}
            totalNumberOfData={totalNumberOfData}
            selectedIds={selectedIds}
            setSelectedIds={setSelectedIds}
            filters={filters}
            filterObject={filterObject}
            setFilters={setFilters}
            isFilterDataLoading={isFilterDataLoading}
            isTableDataLoading={isTableDataLoading}
            options={options}
            permissions={permissions}
            checked={tableOptions?.table?.checked}
            isCheckBoxEnable={tableOptions?.table?.checkBoxes}
            allChecked={allChecked}
            handleTickAll={handleTickAll}
            isLoading={isTableDataLoading}
            handleTick={handleTick}
            columns={columns}
            topCol={tableOptions?.mobileComponent?.topCol}
          />
        )}

        {tableOptions.tableType === "nested" && (
          <MobileComponent
            expandedRows={expandedRows}
            toggleRow={toggleRow}
            onParentRowToggle={onParentRowToggle}
            data={data}
            actions={actions}
            totalNumberOfData={totalNumberOfData}
            selectedIds={selectedIds}
            setSelectedIds={setSelectedIds}
            filters={filters}
            filterObject={filterObject}
            setFilters={setFilters}
            isFilterDataLoading={isFilterDataLoading}
            isTableDataLoading={isTableDataLoading}
            options={options}
            permissions={permissions}
            checked={tableOptions?.table?.checked}
            isCheckBoxEnable={tableOptions?.table?.checkBoxes}
            allChecked={allChecked}
            handleTickAll={handleTickAll}
            isLoading={isTableDataLoading}
            handleTick={handleTick}
            columns={columns}
            topCol={tableOptions?.mobileComponent?.topCol}
            childColumns={childColumns}
            setChildColumns={setChildColumns}
            secondNestedColumns={secondNestedColumns}
            setSecondNestedColumns={setSecondNestedColumns}
            highLightedRows={tableOptions?.table?.highLightedRows}
            multiSelectEnable={tableOptions?.features?.multiSelectEnable}
            specialClasses={tableOptions?.features?.specialClasses}
            dataAuto={dataAuto}
            isChildLoading={isChildLoading}
          />
        )}

        {/* PAGINATION  */}
        {!!(tableOptions?.features?.paginationEnable && totalNumberOfData) && (
          <div className="flex-col flex justify-center bg-base-300 items-center w-full mt-5 pb-5">
            <Pagination
              containerClassName="bg-base-300"
              filters={filters}
              setFilters={setFilters}
              total={totalNumberOfData}
              pageAttributeName={tableOptions?.pagination?.pageAttributeName}
              perPageAttributeName={
                tableOptions?.pagination?.perPageAttributeName
              }
              dataAuto={`${dataAuto}-pagination`}
            />
          </div>
        )}
      </div>
    </div>
  );
}

CustomTable.propTypes = {
  dataAuto: PropTypes.string,
  data: PropTypes.arrayOf(PropTypes.object),
  onParentRowToggle: PropTypes.func,
  columns: PropTypes.arrayOf(PropTypes.object),
  setColumns: PropTypes.func,

  childColumns: PropTypes.arrayOf(PropTypes.object),
  setChildColumns: PropTypes.func,

  secondNestedColumns: PropTypes.arrayOf(PropTypes.object),
  setSecondNestedColumns: PropTypes.func,

  selectedIds: PropTypes.arrayOf(PropTypes.number),
  actions: PropTypes.arrayOf(PropTypes.object),
  totalNumberOfData: PropTypes.number,
  setSelectedIds: PropTypes.func,
  isDescriptionOpen: PropTypes.bool,
  descriptionTitle: PropTypes.string,
  description: PropTypes.string,

  // FILTERS
  filters: PropTypes.object,
  filterObject: PropTypes.object,
  setFilters: PropTypes.func,

  // LOADING STATE
  isFilterDataLoading: PropTypes.bool,
  isTableDataLoading: PropTypes.bool,
  isChildLoading: PropTypes.bool,

  // MOBILE COMPONENT
  MobileComponent: PropTypes.element,

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

  onSort: PropTypes.func,
  // PERMISSIONS
  permissions: PropTypes.array,
  headingComponent: PropTypes.node
};
