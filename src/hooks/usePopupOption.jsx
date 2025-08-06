import { useState } from "react";
import { FORM, FORM_ACTIONS } from "../libs/form/form";

export default function usePopupOption() {
  // MODAL OPTIONS
  const [popupOption, setPopupOption] = useState({
    open: false,
    type: null,
    form: null,
    title: ``,
    data: null,
    overlayStyle: { background: "red" },
    closeOnDocumentClick: false,
    closeButtonHidden: false,
    onClose: () => {
      setPopupOption({ ...popupOption, open: false, data: null });
    },
  });

  // HANDLE ADD NEW COURSE
  const handleAddNewJobType = () => {
    setPopupOption((prev) => ({
      ...prev,
      open: true,
      type: FORM_ACTIONS.CREATE,
      form: FORM.jobType,
      title: "Create New Job Type",
      data: null,
    }));
  };

  // // HANDLE ADD NEW STUDENT STATUS
  // const handleAddNewStudentStatus = () => {
  //   setPopupOption((prev) => ({
  //     ...prev,
  //     open: true,
  //     type: "create",
  //     form: "student_status",
  //     title: "Create Application Status",
  //     data: null
  //   }));
  // };

  // // HANDLE ADD NEW AWARDING BODY
  // const handleAddNewAwardingBody = () => {
  //   setPopupOption((prev) => ({
  //     ...prev,
  //     open: true,
  //     type: "create",
  //     form: "awarding_body",
  //     title: "Create Awarding Body",
  //     data: null
  //   }));
  // };
  // // HANDLE ADD NEW SUBJECT
  // const handleAddNewSubject = () => {
  //   setPopupOption((prev) => ({
  //     ...prev,
  //     open: true,
  //     type: "create",
  //     form: "subjects",
  //     title: "Create Subject",
  //     data: null
  //   }));
  // };
  // // HANDLE ADD NEW SESSION
  // const handleAddNewSession = () => {
  //   setPopupOption((prev) => ({
  //     ...prev,
  //     open: true,
  //     type: "create",
  //     form: "session",
  //     title: "Create Session",
  //     data: null
  //   }));
  // };
  // // HANDLE ADD NEW LETTER TEMPLATE
  // const handleAddNewLetterTemplate = () => {
  //   setPopupOption((prev) => ({
  //     ...prev,
  //     open: true,
  //     type: "create",
  //     form: "letter_template",
  //     title: "Create Letter Template",
  //     data: null
  //   }));
  // };
  // // HANDLE ADD NEW AGENCY
  // const handleAddNewAgency = () => {
  //   setPopupOption((prev) => ({
  //     ...prev,
  //     open: true,
  //     type: "create",
  //     form: "agent",
  //     title: "Create New Agency",
  //     data: null
  //   }));
  // };
  // // HANDLE ADD NEW STAFF
  // const handleAddNewStaff = () => {
  //   setPopupOption((prev) => ({
  //     ...prev,
  //     open: true,
  //     type: "create",
  //     form: "staff",
  //     title: "Create New Staff",
  //     data: null
  //   }));
  // };
  // // HANDLE ADD NEW Student Letter
  // const handleAddNewStudentLetter = () => {
  //   setPopupOption((prev) => ({
  //     ...prev,
  //     open: true,
  //     type: "create",
  //     form: "student_letter",
  //     title: "Create New Student Letter",
  //     data: null
  //   }));
  // };

  // RETURN
  return {
    popupOption,
    setPopupOption,
    handleAddNewJobType,
  };
}
