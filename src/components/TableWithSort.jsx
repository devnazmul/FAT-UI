// ===========================================
// #00122
// ===========================================

import {
  AnimatePresence,
  Reorder,
  motion,
  useDragControls
} from "framer-motion";
import PropTypes from "prop-types";
import { Fragment } from "react";
import { GoGrabber } from "react-icons/go";

export default function TableWithSort({
  rows,
  cols,
  isLoading,
  actions = [],
  header = true,
  dataAuto,
  onReorder = (e) => e,
  sortItems = []
}) {
  const controls = useDragControls();

  return (
    <div
      className={`min-h-[300px] overflow-x-auto scrollbar  top-0 w-full bg-base-200 md:bg-base-300`}
      data-auto={`table-container-${dataAuto}`}
    >
      {/* FOR DESKTOP VIEW  */}
      <Reorder.Group
        values={sortItems}
        onReorder={onReorder}
        as="table"
        className="table gap-2 rounded-xl "
        data-auto={`table-${dataAuto}`}
      >
        {header ? (
          <thead className="bg-base-200">
            <tr className="h-16 text-neutral border-b border-primary-content">
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

        <tbody className="" data-auto={`table-body-${dataAuto}`}>
          {!isLoading ? (
            sortItems && sortItems?.length > 0 ? (
              <AnimatePresence>
                {sortItems.map((data, i) => (
                  <Reorder.Item
                    as="tr"
                    // dragListener={false}
                    // dragControls={controls}
                    key={data}
                    value={data}
                    className={`border-b ${
                      i % 2 === 1 ? "bg-base-100" : "bg-base-300"
                    } border-primary-content  h-16  text-neutral group tableRowAdmin hover:overflow-hidden`}
                    id={`row-${i + 1}`}
                  >
                    {/* COUNTER  */}
                    <motion.td
                      data-auto={`table-v3-number-${dataAuto}`}
                      key={i}
                      style={{
                        minWidth: "1%"
                      }}
                      className="px-5 items-center h-full table-cell"
                    >
                      <div className={`flex h-full items-center gap-x-2`}>
                        <GoGrabber
                          className={`cursor-grab touch-none`}
                          onPointerDown={(e) => {
                            controls.start(e);
                          }}
                          size={25}
                        />{" "}
                        <span className={` select-none`}>{i + 1}</span>
                      </div>
                    </motion.td>

                    {/* COLUMNS  */}
                    {cols.map((col, j) => (
                      <Fragment key={j}>
                        {!!col?.show && (
                          <motion.td
                            data-auto={`table-v3-col-data${j + 1}-${dataAuto}`}
                            style={{
                              width: `${col?.minWidth}%`
                            }}
                            key={j}
                            className={`cursor-grab px-5 select-none ${
                              col?.isMainField ? "table-cell" : "hidden"
                            } ${
                              col?.align === "center" && "text-center"
                            } md:table-cell ${
                              col?.wrap ? "overflow-wrap-anywhere" : ""
                            }`}
                          >
                            {
                              rows.find((row) => row?.order_number === data)[
                                col?.attribute_name
                              ]
                            }
                          </motion.td>
                        )}
                      </Fragment>
                    ))}
                  </Reorder.Item>
                ))}
              </AnimatePresence>
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
      </Reorder.Group>
    </div>
  );
}

TableWithSort.propTypes = {
  rows: PropTypes.arrayOf(PropTypes.object).isRequired,
  cols: PropTypes.arrayOf(PropTypes.object).isRequired,
  isLoading: PropTypes.bool.isRequired,
  actions: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      onClick: PropTypes.func
    })
  ),
  header: PropTypes.node,
  dataAuto: PropTypes.string.isRequired,
  onReorder: PropTypes.func,
  sortItems: PropTypes.arrayOf(PropTypes.string)
};
