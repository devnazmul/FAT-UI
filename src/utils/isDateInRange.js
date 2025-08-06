import moment from "moment";

export const isDateInRange = (date, from, to) => {
  if (!from && !to) {
    // If both start and end dates are empty, render all days
    return true;
  } else if (from && !to) {
    const startDate = moment(from, "DD-MM-YYYY");
    return moment(date, "DD-MM-YYYY").isSameOrAfter(startDate);
  } else if (!from && to) {
    const endDate = moment(to, "DD-MM-YYYY");
    return moment(date, "DD-MM-YYYY").isSameOrBefore(endDate);
  } else {
    const startDate = moment(from, "DD-MM-YYYY");
    const endDate = moment(to, "DD-MM-YYYY");
    return moment(date, "DD-MM-YYYY").isBetween(startDate, endDate, null, "[]");
  }
};
