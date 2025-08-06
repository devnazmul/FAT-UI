import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { LiaUserClockSolid } from "react-icons/lia";
import CustomPopup from "./CustomPopup";
import TimingViewer from "./TimingViewer";

export default function TimingPopup({
  fullData,
  data,
  title,
  workShift,
  textClassName = "text-primary",
  editPermission = false,
  setIsUpdated,
  user,
  isPublic = false
}) {
  const [isOpen, setIsOpen] = useState(false);
  // POPUP OPTIONS
  const [popupOption, setPopupOption] = useState({
    open: false,
    type: "",
    id: null,
    onClose: () => {
      setPopupOption({ ...popupOption, open: false });
    },
    fullData: fullData,
    overlayStyle: { background: "red" },
    closeOnDocumentClick: false
  });

  useEffect(() => {
    if (isOpen) {
      setPopupOption({
        open: true,
        title: title,
        onClose: () => {
          setPopupOption({ ...popupOption, open: false });
        },
        fullData: fullData,
        overlayStyle: { background: "red" },
        closeOnDocumentClick: false
      });
    } else {
      setPopupOption({
        open: false,
        type: "",
        id: null,
        onClose: () => {
          setPopupOption({ ...popupOption, open: false });
        },
        fullData: fullData,
        overlayStyle: { background: "red" },
        closeOnDocumentClick: false
      });
    }
  }, [isOpen]);

  return (
    <div className={`w-full`}>
      <CustomPopup
        popupClasses={`w-[90vw] sm:w-[90vw] md:w-[80vw] lg:w-[70vw]`}
        popupOption={popupOption}
        setPopupOption={setPopupOption}
        setIsOpen={setIsOpen}
        Component={
          <TimingViewer
            isPublic={isPublic}
            user={user}
            editPermission={editPermission}
            handleClosePopup={() => {
              setPopupOption({
                open: false,
                type: "",
                id: null,
                onClose: () => {
                  setPopupOption({ ...popupOption, open: false });
                  setIsOpen(false);
                },
                overlayStyle: { background: "red" },
                closeOnDocumentClick: false
              });
            }}
            fullData={fullData}
            data={data}
            workShift={workShift}
            setIsUpdated={setIsUpdated}
          />
        }
      />
      <div className={``}>
        <button onClick={() => setIsOpen(true)}>
          <LiaUserClockSolid className={`text-2xl ${textClassName}`} />
        </button>
      </div>
    </div>
  );
}

// PROPS TYPE DEFINITION
TimingPopup.propTypes = {
  user: PropTypes.object,
  fullData: PropTypes.object,
  data: PropTypes.object,
  title: PropTypes.string,
  workShift: PropTypes.object,
  textClassName: PropTypes.string,
  editPermission: PropTypes.bool,
  setIsUpdated: PropTypes.func,
  isPublic: PropTypes.bool
};
