const CustomPopupv2 = ({ popupOption, setPopupOption, Component }) => {
  if (!popupOption.open) return null;

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <button onClick={setPopupOption}>X</button>
        {Component}
      </div>
    </div>
  );
};