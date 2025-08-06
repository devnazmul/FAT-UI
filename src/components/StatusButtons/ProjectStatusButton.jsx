import React from "react";
import { formatText } from "../../utils/formatText";

const ProjectStatusButton = ({ d }) => (
  <div className={`md:flex justify-center`}>
    <span
      className={`px-3 py-1 rounded-full text-center font-medium flex justify-center items-center border-2 w-fit`}
    >
      <div
        className={`w-4 h-4 border-2  ${
          d?.status === "pending" && "border-gray-500"
        } ${d?.status === "approved" && "  border-green-500"}  ${
          d?.status === "in_progress" && "border-blue-500"
        } rounded-full flex justify-center items-center mr-1`}
      >
        <div
          className={`w-2 h-2 border-2 ${
            d?.status === "pending" && "border-gray-500 bg-gray-500"
          } ${
            d?.status === "completed" && "  border-green-500 bg-green-500"
          }  ${
            d?.status === "in_progress" && "border-blue-500 bg-blue-500 "
          } rounded-full`}
        ></div>
      </div>
      <div>
        {d?.status === "in_progress" ? (
          <div className={`flex items-center`}>
            <p className={`mr-1`}>In</p>
            <p>Progress</p>
          </div>
        ) : (
          formatText(d?.status)
        )}
      </div>
    </span>
  </div>
);

export default ProjectStatusButton;
