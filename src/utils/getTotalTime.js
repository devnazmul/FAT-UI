export const getTotalTime = (timeSlots) => {
  const parseTime = (timeStr) => {
    return new Date(timeStr.replace(/(\d{2})-(\d{2})-(\d{4})/, "$2/$1/$3"));
  };

  let totalMilliseconds = 0;

  timeSlots.forEach((slot) => {
    const start = parseTime(slot.start_at);
    const end = parseTime(slot.end_at);
    totalMilliseconds += end - start;
  });

  const totalMinutes = Math.floor(totalMilliseconds / 60000);
  return {
    h: Math.floor(totalMinutes / 60),
    m: totalMinutes % 60
  };
};

export const getTotalTimeInString = (timeSlots) => {
  const parseTime = (timeStr) => {
    const [day, month, year, hour, minute, second = 0] = timeStr
      .match(/\d+/g)
      .map(Number);
    return new Date(year, month - 1, day, hour, minute, second);
  };

  let totalMilliseconds = timeSlots.reduce((total, slot) => {
    const start = parseTime(slot.start_at);
    const end = parseTime(slot.end_at);
    return total + (end - start);
  }, 0);

  let hours = Math.floor(totalMilliseconds / 3600000);
  let minutes = Math.floor((totalMilliseconds % 3600000) / 60000);
  let seconds = Math.floor((totalMilliseconds % 60000) / 1000);

  // Round seconds to minutes if ≥ 30
  if (seconds >= 30) minutes++;

  // If minutes become 60, convert to an extra hour
  if (minutes === 60) {
    hours++;
    minutes = 0;
  }

  return (
    [hours ? `${hours}h` : "", minutes ? `${minutes}min` : ""]
      .filter(Boolean)
      .join(" ") || "0min"
  );
};
