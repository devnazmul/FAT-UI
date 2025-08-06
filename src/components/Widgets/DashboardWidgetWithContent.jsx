// Widget.js

import { ArcElement, Chart as ChartJS, Tooltip } from "chart.js";
import React from "react";
import { Doughnut } from "react-chartjs-2";
import { useDrag } from "react-dnd";
import { NavLink } from "react-router-dom";
import { formatText } from "../../utils/formatText";

ChartJS.register(ArcElement, Tooltip);

const DashboardWidgetWithContent = ({
  filter,
  id,
  item,
  isDragAble = true,
  icons,
}) => {
  const [{ isDragging }, drag] = useDrag({
    type: "WIDGET",
    item: { ...item, colIndex: item.colIndex }, // Include colIndex in the item
    canDrag: isDragAble,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const getRouteDateFilter = () => {
    if (filter === "today") {
      return `start_date=${item?.date_ranges?.today_data_count_date_range[0]}&end_date=${item?.date_ranges?.today_data_count_date_range[1]}`;
    }

    if (filter === "last_week") {
      return `start_date=${item?.date_ranges?.previous_week_data_count_date_range[0]}&end_date=${item?.date_ranges?.previous_week_data_count_date_range[1]}`;
    }

    if (filter === "this_week") {
      return `start_date=${item?.date_ranges?.this_week_data_count_date_range[0]}&end_date=${item?.date_ranges?.this_week_data_count_date_range[1]}`;
    }

    if (filter === "next_week") {
      return `start_date=${item?.date_ranges?.next_week_data_count_date_range[0]}&end_date=${item?.date_ranges?.next_week_data_count_date_range[1]}`;
    }

    if (filter === "last_month") {
      return `start_date=${item?.date_ranges?.previous_month_data_count_date_range[0]}&end_date=${item?.date_ranges?.previous_month_data_count_date_range[1]}`;
    }

    if (filter === "this_month") {
      return `start_date=${item?.date_ranges?.this_month_data_count_date_range[0]}&end_date=${item?.date_ranges?.this_month_data_count_date_range[1]}`;
    }

    if (filter === "next_month") {
      return `start_date=${item?.date_ranges?.next_month_data_count_date_range[0]}&end_date=${item?.date_ranges?.next_month_data_count_date_range[1]}`;
    }
  };

  const graphData =
    item?.data !== null || item?.data !== undefined
      ? Object.keys(item?.data || {})?.length > 0
        ? {
            labels: Object.keys(item?.data)?.map((d) => formatText(d)),
            data: Object.keys(item?.data)?.map(
              (d) => item?.data[d]?.total_data_count || 0
            ),
          }
        : {}
      : {};

  return (
    <div
      ref={drag}
      className={`relative rounded-xl flex ${
        item?.widget_type === "multiple_upcoming_days" ||
        item?.widget_type === "graph"
          ? `h-[210px] `
          : "h-[90px]"
      } flex-col overflow-hidden justify-between p-2 md:p-2 shadow-lg shadow-primary-content border border-primary-content ${
        isDragging ? "border-dashed opacity-50 border-primary" : ""
      }`}
      data-widget-id={id}
    >
      <div className={`flex justify-start items-center`}>
        <div className={`flex items-start gap-2 md:gap-3  w-full`}>
          {/* WIDGET ICON  */}
          <div
            className={`w-16 h-16 bg-primary rounded-xl shadow-md  flex justify-center items-center text-base-300 text-xl md:text-2xl`}
          >
            {icons[item?.widget_name]}
          </div>
          <div
            className={`flex justify-between items-start w-[calc(100%-4rem)]`}
          >
            {/* WIDGET NAME  */}
            <div className="flex flex-col">
              <NavLink
                className={``}
                to={`${item?.route || ""}${getRouteDateFilter()}`}
              >
                <h1 className={`font-semibold hover:text-primary`}>
                  {formatText(item?.widget_name)}
                </h1>
              </NavLink>

              {item?.widget_type !== "graph" ? (
                <span className={`text-sm text-slate-400`}>
                  {filter === "today" && <span className={``}>Today</span>}
                  {filter === "last_week" && (
                    <span className={``}>Last Week</span>
                  )}
                  {filter === "this_week" && (
                    <span className={``}> This week</span>
                  )}
                  {filter === "next_week" && (
                    <span className={``}> Next week</span>
                  )}
                  {filter === "last_month" && (
                    <span className={``}>Last month</span>
                  )}
                  {filter === "this_month" && (
                    <span className={``}>This month</span>
                  )}
                  {filter === "next_month" && (
                    <span className={``}>Next month</span>
                  )}
                </span>
              ) : (
                <span className={`text-sm text-gray-500`}>
                  <span>Total</span>
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      <>
        {(item?.widget_type === "multiple_upcoming_days" ||
          item?.widget_type === "default") && (
          <div
            className={`px-2 text-primary z-20
            ${
              item?.widget_type === "multiple_upcoming_days" &&
              "-mt-[100px] text-6xl"
            }
            ${
              item?.widget_type === "default" &&
              "-mt-[64px] text-4xl text-right "
            }
            `}
          >
            {filter === "today" && (
              <span className={`flex flex-col`}>
                <span>{item?.today_data_count || 0}</span>
              </span>
            )}
            {filter === "last_week" && (
              <span className={`flex flex-col`}>
                <span>{item?.previous_week_data_count || 0}</span>
              </span>
            )}
            {filter === "this_week" && (
              <span className={`flex flex-col`}>
                <span>{item?.this_week_data_count || 0}</span>
              </span>
            )}
            {filter === "next_week" && (
              <span className={`flex flex-col`}>
                <span>{item?.next_week_data_count || 0}</span>
              </span>
            )}
            {filter === "last_month" && (
              <span className={`flex flex-col`}>
                <span>{item?.previous_month_data_count || 0}</span>
              </span>
            )}
            {filter === "this_month" && (
              <span className={`flex flex-col`}>
                <span>{item?.this_month_data_count || 0}</span>
              </span>
            )}
            {filter === "next_month" && (
              <span className={`flex flex-col`}>
                <span>{item?.next_month_data_count || 0}</span>
              </span>
            )}
          </div>
        )}

        {/* // EXPIRED DATA */}
        {item?.widget_type === "multiple_upcoming_days" && (
          <div
            className={`flex flex-col text-sm absolute bottom-3 right-3 gap-2 md:gap-1 z-20`}
          >
            <span
              className={`bg-primary text-sm text-base-300 shadow-md w-30 h-7 rounded-lg flex justify-between px-4 md:px-2 z-10 items-center`}
            >
              <span>In 15 Days:</span>{" "}
              <span className={``}>{item?.expires_in_15_days || 0}</span>
            </span>
            <span
              className={`bg-primary text-sm text-base-300 shadow-md w-30 h-7 rounded-lg flex justify-between px-4 md:px-2 z-10 items-center`}
            >
              <span>In 30 Days:</span>{" "}
              <span className={``}>{item?.expires_in_30_days || 0}</span>
            </span>
            <span
              className={`bg-primary text-sm text-base-300 shadow-md w-30 h-7 rounded-lg flex justify-between px-4 md:px-2 z-10 items-center`}
            >
              <span>In 60 Days:</span>{" "}
              <span className={``}>{item?.expires_in_60_days || 0}</span>
            </span>
          </div>
        )}

        {/* // GRAPH  */}
        {item?.widget_type === "graph" && (
          <div
            className={`w-36  h-36 sm:w-24 sm:h-24 md:h-32 md:w-32  absolute bottom-2 right-20  sm:right-[56px] md:right-[70px] translate-x-1/2 flex justify-center items-center z-20`}
          >
            <Doughnut
              options={{
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                  yAxes: [
                    {
                      ticks: {
                        beginAtZero: true,
                      },
                    },
                  ],
                },
              }}
              data={{
                labels: graphData?.labels,
                datasets: [
                  {
                    label: "",
                    data: graphData?.data,
                    backgroundColor: [
                      "rgb(147 51 234)", // PURPLE
                      "rgb(219 39 119)", // PINK
                      "rgb(20 184 166)", // TEAL
                      "rgb(225 29 72)", // PINK
                      "rgb(14 165 233)", // SKY
                      "rgb(219 39 119)", // PINK
                      "rgb(6 182 212)", // CYAN
                      "rgb(220 38 38)", // RED
                      "rgb(79 70 229)", // INDIGO
                      "rgb(101 163 13)", // LIME
                      "rgb(249 115 22)", // ORANGE
                      "rgb(124 58 237)", // VIOLATE
                      "rgb(22 163 74)", // GREEN
                      "rgb(245 158 11)", // AMBER
                      "rgb(29 78 216)", // BLUE
                      "rgb(234 179 8)", // YELLOW
                      "rgb(192 38 211)", // FUCHSIA
                    ],
                    borderWidth: 2,
                    borderColor: "transparent",
                  },
                ],
              }}
            />
          </div>
        )}
      </>
    </div>
  );
};

export default DashboardWidgetWithContent;
