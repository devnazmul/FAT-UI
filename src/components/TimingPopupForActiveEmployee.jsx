import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { LiaUserClockSolid } from "react-icons/lia";
import { useAuth } from "../context/AuthContext.jsx";
import { checkRole } from "../utils/checkPermissions.js";
import CustomPopup from "./CustomPopup";
import TimingViewerForActiveEmployee from "./TimingViewerForActiveEmployee.jsx";

export default function TimingPopupForActiveEmployee({
  fullData,
  data,
  title,
  workShift,
  textClassName = "text-primary",
  setIsUpdating
}) {
  const { user } = useAuth();

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
          <TimingViewerForActiveEmployee
            editPermission={
              popupOption.fullData?.employee?.id !== user?.id &&
              !checkRole(user, "Employee")
            }
            setIsUpdating={setIsUpdating}
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
TimingPopupForActiveEmployee.propTypes = {
  fullData: PropTypes.object,
  data: PropTypes.object,
  title: PropTypes.string,
  workShift: PropTypes.object,
  textClassName: PropTypes.string,
  setIsUpdating: PropTypes.func
};
