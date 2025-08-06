import PropTypes from "prop-types";
import { useLocation } from "react-router-dom";
import Sidebar2 from "../layout/SideBar/Sidebar2";

export default function LinkWithChild({ link, title, Icon, children }) {
  const location = useLocation();
  return (
    <li className={`my-1`}>
      <details className={``}>
        <summary
          className={`py-3 bg-base-300 text-primary ${
            location.pathname.split("/")[1] === link.split("/")[1]
              ? "text-primary bg-gradient-to-r from-primary-content to-transparent"
              : "text-accent"
          }`}
        >
          <Icon /> {title}
        </summary>
        <ul className={`menu-vertical`}>
          <Sidebar2 links={children} isNested={true} />
        </ul>
      </details>
    </li>
  );
}

LinkWithChild.propTypes = {
  link: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  Icon: PropTypes.elementType.isRequired,
  children: PropTypes.arrayOf(PropTypes.object).isRequired
};
