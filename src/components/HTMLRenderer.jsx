import PropTypes from "prop-types";
import ReactHtmlParser from "react-html-parser";

function HTMLRenderer({ htmlString }) {
  // Use dangerouslySetInnerHTML to render the HTML
  return (
    <div id="html-viewer" className={``}>
      {ReactHtmlParser(htmlString)}
    </div>
  );
}

HTMLRenderer.propTypes = {
  htmlString: PropTypes.string.isRequired
};

export default HTMLRenderer;
