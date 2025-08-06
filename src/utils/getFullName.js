import { formatText } from "./formatText.js";

export const getFullName = (name) => {
  const nameArray = [
    name?.title,
    name?.first_Name,
    name?.middle_Name,
    name?.last_Name
  ];
  const filteredName = nameArray?.filter((n) => n);

  return filteredName?.length > 0 ? formatText(filteredName?.join(" ")) : "N/A";
};
