import PropTypes from "prop-types";

const HighlightMatch = ({ text, query }) => {
  if (!query) {
    return <span>{text}</span>; // No query, just return the text
  }

  const lowerText = text.toLowerCase();
  const lowerQuery = query.toLowerCase();
  const parts = [];
  let lastIndex = 0;

  // Find all occurrences of the query
  let index = lowerText.indexOf(lowerQuery, lastIndex);
  while (index !== -1) {
    // Add the part before the match
    if (index > lastIndex) {
      parts.push(text.substring(lastIndex, index));
    }
    // Add the matched part with highlight
    parts.push(
      <span key={index} className={`bg-orange-500 rounded `}>
        {text.substring(index, index + query.length)}
      </span>
    );
    lastIndex = index + query.length;
    index = lowerText.indexOf(lowerQuery, lastIndex);
  }

  // Add any remaining part after the last match
  if (lastIndex < text.length) {
    parts.push(text.substring(lastIndex));
  }

  return <span>{parts}</span>;
};

export default HighlightMatch;
HighlightMatch.propTypes = {
  text: PropTypes.string.isRequired,
  query: PropTypes.string
};
