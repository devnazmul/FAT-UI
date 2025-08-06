import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";

export default function LinkWithoutChild({ link, title }) {
  return (
    <li>
      <NavLink to={link} className={`py-3 text-primary `}>
        {title}
      </NavLink>
    </li>
  );
}

LinkWithoutChild.propTypes = {
  link: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired
};
