import PropTypes from "prop-types";
import Headings from "./Headings/Headings.jsx";

export default function PageHeader({ title, subtitle, ButtonSection }) {
  return (
    <header
      id="header"
      className="flex flex-col lg:flex-row justify-between md:items-center relative gap-5"
    >
      {/* TITLE SECTION */}
      <div
        id="header-content"
        className="flex flex-col w-full text-center lg:text-left"
      >
        <Headings level={1}>{title}</Headings>
        <h3>{subtitle}</h3>
      </div>

      {/*BUTTON SECTION */}

      <ButtonSection />
    </header>
  );
}
PageHeader.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  ButtonSection: PropTypes.element
};
