/**
 * A utility function to format a date string from "DD-MM-YYYY" to "DD-MM-YYYY"
 * @param {string} date - The date string to be formatted
 * @returns {string} The formatted date string
 */
import moment from "moment";
export const formatDate = (date) => {
  // Parse the date string using Moment.js
  const parsedDate = moment(date, "DD-MM-YYYY");
  // Format the parsed date string to "DD-MM-YYYY"
  return parsedDate.format("DD-MM-YYYY");
};
