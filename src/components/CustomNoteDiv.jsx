import PropTypes from "prop-types";

export default function CustomNoteDiv({ children }) {
  return (
    <div className="p-5 border-2 border-primary bg-primary-content rounded-xl">
      {children}
    </div>
  );
}

CustomNoteDiv.propTypes = {
  children: PropTypes.node.isRequired
};
