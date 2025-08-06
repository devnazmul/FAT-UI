import PropTypes from "prop-types";
import { formatText } from "../../utils/formatText.js";

const StatusButton = ({ d, onClick = () => {}, disabled, isLoading }) => {
  return (
    <div
      role="button"
      disabled={disabled || isLoading}
      onClick={() => onClick()}
      className={`md:flex justify-center`}
    >
      <span
        className={`px-3 py-1 rounded-full text-center font-medium flex justify-center items-center border w-fit ${
          d?.status === "pending_approval" && "border-warning"
        } ${
          (d?.status === "approved" || d?.status === "active") &&
          "  border-success"
        } ${
          (d?.status === "rejected" || d?.status === "deactive") &&
          " border-error"
        } ${d?.status === "in_progress" && "border-info "} ${
          d?.status === "applied" && "border-yellow-400 "
        }${d?.status === "interview_stage_1" && "border-orange-700 "} ${
          d?.status === "interview_stage_2" && "border-yellow-800 "
        } ${d?.status === "final_interview" && "border-purple-700 "} ${
          d?.status === "job_offered" && "border-green-700 "
        } ${d?.status === "hired" && "border-green-500 "} ${
          d?.status === "assigned" && "border-sky-500 "
        }`}
      >
        <div
          className={`w-4 h-4 border-2  ${
            d?.status === "pending_approval" && "border-warning"
          } ${
            (d?.status === "approved" || d?.status === "active") &&
            "  border-success"
          } ${
            (d?.status === "rejected" || d?.status === "deactive") &&
            " border-error"
          } ${
            d?.status === "in_progress" && "border-info bg-opacity-20 text-info"
          } ${d?.status === "applied" && "border-yellow-400"} ${
            d?.status === "interview_stage_1" && "border-orange-700"
          } ${d?.status === "interview_stage_2" && "border-yellow-800"} ${
            d?.status === "final_interview" && "border-purple-700"
          } ${d?.status === "job_offered" && "border-green-700"} ${
            d?.status === "hired" && "border-green-500"
          }  ${
            d?.status === "assigned" && "border-sky-500"
          } rounded-full flex justify-center items-center mr-1`}
        >
          <div
            className={`w-2 h-2 border-2 ${
              d?.status === "pending_approval" && "border-warning bg-warning"
            } ${
              (d?.status === "approved" || d?.status === "active") &&
              "  border-success bg-success"
            } ${
              (d?.status === "rejected" || d?.status === "deactive") &&
              " border-error bg-error"
            } ${d?.status === "in_progress" && "border-info bg-info "} ${
              d?.status === "applied" && "border-yellow-400 bg-yellow-400"
            }${
              d?.status === "interview_stage_1" &&
              "border-orange-700 bg-orange-700"
            } ${
              d?.status === "interview_stage_2" &&
              "border-yellow-800 bg-yellow-800"
            } ${
              d?.status === "final_interview" &&
              "border-purple-700 bg-purple-700"
            } ${
              d?.status === "job_offered" && "border-green-700 bg-green-700"
            } ${d?.status === "hired" && "border-green-500 bg-green-500"} ${
              d?.status === "assigned" && "border-sky-500 bg-sky-500"
            } rounded-full`}
          ></div>
        </div>
        <div
          className={`${
            d?.status === "in_progress" && "text-info"
          } flex gap-1 items-center`}
        >
          {isLoading ? (
            <span className="loading loading-spinner loading-xs"></span>
          ) : (
            formatText(d?.status)
              ?.split(" ")
              ?.map((item, index) => <span key={index}>{item}</span>)
          )}
        </div>
      </span>
    </div>
  );
};

export default StatusButton;

StatusButton.propTypes = {
  d: PropTypes.shape({
    status: PropTypes.string,
  }),
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  isLoading: PropTypes.bool,
};
