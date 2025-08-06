import { formatText } from "@/utils/formatText.js";
import PropTypes from "prop-types";
import { Fragment } from "react";
import { BiSolidDownArrow, BiSolidUpArrow } from "react-icons/bi";

export default function CustomTableHeader({
  columns,
  isCheckBoxEnable,
  handleTickAll,
  checked,
  allChecked,
  selectedIds,
  data,
  dataAuto,
  actions,
  filters,
  onApplySorting,
  tableType,
}) {
  switch (tableType) {
    case "default":
      return (
        <thead className="sticky -top-0 bg-primary z-30 shadow-sm">
          <tr className="h-12 text-neutral border-b border-primary-content">
            {!!isCheckBoxEnable && (
              <th
                style={{
                  minWidth: "1%",
                }}
                className="px-5 pt-2"
              >
                <div
                  className={`h-full w-full flex items-center justify-start`}
                >
                  <label className={``}>
                    <input
                      data-auto={`table-checkbox-${dataAuto}`}
                      disabled={checked?.every((c) => !c?.isChecked)}
                      checked={
                        allChecked ||
                        (selectedIds?.length === data?.length &&
                          selectedIds?.length !== 0)
                      }
                      onClick={handleTickAll}
                      onChange={() => {}}
                      type="checkbox"
                      className={`checkbox bg-base-300`}
                    />
                  </label>
                </div>
              </th>
            )}

            <th
              style={{
                width: `1%`,
              }}
              className="px-5"
            >
              <div className="flex flex-col items-start justify-start gap-2"></div>
            </th>

            {columns
              ?.filter((filters) => filters?.show)
              ?.map((th, i) => (
                <Fragment key={i}>
                  {!!th?.show && (
                    <th
                      className={`px-5 ${
                        th?.isMainField ? "table-cell" : "hidden"
                      } md:table-cell`}
                      style={{
                        width: `${th?.minWidth}%`,
                      }}
                    >
                      <div
                        style={{
                          justifyContent: th?.align ? th?.align : `start`,
                        }}
                        className={`flex flex-row text-center text-sm items-center  gap-x-2 font-semibold`}
                      >
                        <div
                          onClick={() => {
                            if (th?.sortAble) {
                              onApplySorting({
                                order_by_field:
                                  filters?.order_by_field ===
                                  th?.original_attribute_name
                                    ? th?.original_attribute_name
                                    : th?.original_attribute_name,
                                order_by:
                                  filters?.order_by_field ===
                                  th?.original_attribute_name
                                    ? filters?.order_by === "asc"
                                      ? "desc"
                                      : "asc"
                                    : "asc",
                              });
                            }
                          }}
                          className={`flex items-center gap-x-2 ${
                            th?.sortAble && "cursor-pointer"
                          } `}
                        >
                          {th?.sortAble && (
                            <button className={`flex flex-col gap-0`}>
                              {th?.original_attribute_name ===
                              filters?.order_by_field ? (
                                <>
                                  {filters?.order_by === "asc" ? (
                                    <BiSolidDownArrow
                                      className={`text-base-300`}
                                    />
                                  ) : (
                                    <BiSolidUpArrow
                                      className={`text-base-300`}
                                    />
                                  )}
                                </>
                              ) : (
                                <div>
                                  <BiSolidUpArrow
                                    className={`text-primary-content/50 text-xs`}
                                  />
                                  <BiSolidDownArrow
                                    className={`text-primary-content/50 text-xs`}
                                  />
                                </div>
                              )}
                            </button>
                          )}
                          <div
                            style={{
                              justifyContent: th?.align ? th?.align : `start`,
                            }}
                            className={`text-left text-base-300 text-xs`}
                          >
                            {formatText(th?.name)?.toUpperCase()}
                          </div>
                        </div>
                      </div>
                    </th>
                  )}
                </Fragment>
              ))}

            {actions?.length > 0 && (
              <th
                style={{
                  minWidth: "1%",
                  paddingRight: "20px",
                }}
              >
                <div className="text-right text-base-300  text-xs uppercase">
                  Actions
                </div>
              </th>
            )}
          </tr>
        </thead>
      );

    case "nested":
      return (
        <thead className="sticky -top-0 bg-primary z-40 shadow-sm">
          <tr className="h-12 text-neutral border-b border-primary-content">
            {!!isCheckBoxEnable && (
              <th
                style={{
                  width: `1%`,
                }}
                className=" px-8"
              >
                <label>
                  <input
                    data-auto={`table-checkbox-${dataAuto}`}
                    disabled={checked?.every((c) => !c?.isChecked)}
                    checked={
                      allChecked ||
                      (selectedIds?.length === data?.length &&
                        selectedIds?.length !== 0)
                    }
                    onClick={handleTickAll}
                    onChange={() => {}}
                    type="checkbox"
                    className={`checkbox bg-base-300`}
                  />
                </label>
              </th>
            )}
            <th
              style={{
                width: `5px`,
              }}
              className="px-5"
            >
              <div className="flex flex-col  items-start justify-start gap-2"></div>
            </th>

            <th
              style={{
                width: `5px`,
              }}
              className="px-2"
            >
              <div className="flex flex-col items-center justify-center gap-2  text-xs text-base-300">
                #
              </div>
            </th>

            {columns
              ?.filter((filters) => filters?.show)
              ?.map((th, i) => (
                <Fragment key={i}>
                  {th?.show ? (
                    <th
                      className={`px-5 ${
                        th?.isMainField ? "table-cell" : "hidden"
                      } md:table-cell`}
                      style={{
                        width: `${th?.minWidth}%`,
                      }}
                    >
                      <div
                        style={{
                          justifyContent: th?.align ? th?.align : `start`,
                        }}
                        className={`flex flex-row text-center text-xs items-center  gap-x-2 font-semibold`}
                      >
                        <div
                          onClick={() => {
                            if (th?.sortAble) {
                              onApplySorting({
                                order_by_field:
                                  filters?.order_by_field ===
                                  th?.original_attribute_name
                                    ? th?.original_attribute_name
                                    : th?.original_attribute_name,
                                order_by:
                                  filters?.order_by_field ===
                                  th?.original_attribute_name
                                    ? filters?.order_by === "asc"
                                      ? "desc"
                                      : "asc"
                                    : "asc",
                              });
                            }
                          }}
                          className={`flex items-center gap-x-2 ${
                            th?.sortAble && "cursor-pointer"
                          } `}
                        >
                          {th?.sortAble && (
                            <button className={`flex flex-col gap-0`}>
                              {th?.original_attribute_name ===
                              filters?.order_by_field ? (
                                <>
                                  {filters?.order_by === "asc" ? (
                                    <BiSolidDownArrow
                                      className={`text-base-300`}
                                    />
                                  ) : (
                                    <BiSolidUpArrow
                                      className={`text-base-300`}
                                    />
                                  )}
                                </>
                              ) : (
                                <div>
                                  <BiSolidUpArrow
                                    className={`text-primary-content/50 text-xs`}
                                  />
                                  <BiSolidDownArrow
                                    className={`text-primary-content/50 text-xs`}
                                  />
                                </div>
                              )}
                            </button>
                          )}
                          <div
                            style={{
                              justifyContent: th?.align ? th?.align : `start`,
                            }}
                            className={`text-left text-base-300 text-xs`}
                          >
                            {formatText(th?.name)?.toUpperCase()}
                          </div>
                        </div>
                      </div>
                    </th>
                  ) : (
                    ""
                  )}
                </Fragment>
              ))}

            {actions?.length > 0 && (
              <th
                style={{
                  minWidth: "1%",
                  paddingRight: "20px",
                }}
              >
                <div className="text-right text-base-300 text-xs uppercase">
                  Actions
                </div>
              </th>
            )}
          </tr>
        </thead>
      );
  }
}

CustomTableHeader.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.object),
  isCheckBoxEnable: PropTypes.bool,
  handleTickAll: PropTypes.func,
  checked: PropTypes.arrayOf(PropTypes.object),
  allChecked: PropTypes.bool,
  selectedIds: PropTypes.arrayOf(PropTypes.number),
  data: PropTypes.arrayOf(PropTypes.object),
  dataAuto: PropTypes.string,
  actions: PropTypes.arrayOf(PropTypes.object),
  filters: PropTypes.object,
  onApplySorting: PropTypes.func,
  tableType: PropTypes.string,
};
