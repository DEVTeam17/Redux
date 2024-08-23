const today = new Date();

export const getDate = (offset = 0) => {
  const date = new Date(today.getTime() + offset * 24 * 60 * 60 * 1000);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  const dayLabels = {
    0: "Sunday",
    1: "Monday",
    2: "Tuesday",
    3: "Wednesday",
    4: "Thursday",
    5: "Friday",
    6: "Saturday",
  };

  const todayLabel = "Today";
  const yesterdayLabel = "Yesterday";

  // Check if the date is today, yesterday, or a specific day of the week
  if (
    day === today.getDate() &&
    month === today.getMonth() + 1 &&
    year === today.getFullYear()
  ) {
    return todayLabel;
  } else if (
    day === today.getDate() - 1 &&
    month === today.getMonth() + 1 &&
    year === today.getFullYear()
  ) {
    return yesterdayLabel;
  } else {
    return dayLabels[date.getDay()];
  }
};
