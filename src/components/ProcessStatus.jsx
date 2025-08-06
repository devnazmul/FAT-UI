import PropTypes from "prop-types";

export default function ProcessStatus({ status }) {
  switch (status) {
    case "not_started":
      return (
        <span className="rounded-[3px] px-2 badge-primary my-1 ">
          Not Started
        </span>
      );
    case "in_progress":
      return (
        <span className="rounded-[3px] px-2 badge-warning my-1 ">
          In Progress
        </span>
      );
    case "completed":
      return (
        <span className="rounded-[3px] px-2 badge-success text-base-300 my-1 ">
          Completed
        </span>
      );
    default:
      return "";
  }
}

ProcessStatus.propTypes = {
  status: PropTypes.string
};
