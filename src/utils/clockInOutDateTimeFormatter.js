import moment from "moment";

export const clockInOutDateTimeFormatter = (date) => {
  if (moment(date, "DD-MM-YYYY HH:mm:ss", true).isValid()) {
    return moment(date, "DD-MM-YYYY HH:mm:ss").format("DD-MM-YYYY hh:mm A");
  } else {
    return moment(date, "YYYY-MM-DD HH:mm:ss").format("DD-MM-YYYY hh:mm A");
  }
};
