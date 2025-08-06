export function convertFloatHoursToTime(input, numberOnly = false) {
  // Ensure the input is a number
  let cleanedInput = input;

  if (typeof input === "string") {
    cleanedInput = input.replace(/,/g, "");
  }

  let floatHours = parseFloat(cleanedInput);

  if (isNaN(floatHours) || floatHours < 0) {
    return "0h";
  }

  let hours = Math.floor(floatHours);
  let minutes = Math.round((floatHours - hours) * 60);

  // Fix for rounding overflow (e.g., 2.999 becomes 2h60min)
  if (minutes === 60) {
    hours += 1;
    minutes = 0;
  }

  const stringH =
    hours === 0 && minutes === 0
      ? numberOnly
        ? 0
        : `0h`
      : hours > 0
        ? numberOnly
          ? hours
          : `${hours}h`
        : "";

  const stringM = minutes > 0 ? (numberOnly ? minutes : `${minutes}min`) : ``;

  if (numberOnly) {
    return {
      hours: stringH,
      minutes: stringM
    };
  }

  return `${stringH} ${stringM}`.trim();
}
