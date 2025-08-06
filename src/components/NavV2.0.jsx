import LinkWithChild from "./LinkWithChild";
import LinkWithoutChild from "./LinkWithoutChild";
import PropTypes from "prop-types";

export default function Sidebar2() {
  return (
    <ul className="menu bg-base-200 w-56 rounded-box">
      <LinkWithoutChild />
      <LinkWithChild />
      <LinkWithoutChild />
    </ul>
  );
}

Sidebar2.propTypes = {
  // Add your prop types here
};
