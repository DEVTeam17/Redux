// utils.js or a similar utility file
export const getLatestActivity = (activities = []) => {
  const todayDate = new Date();

  const activitiesForToday = activities.filter((activity) => {
    const activityDate = new Date(activity.timestamp);
    return (
      activityDate.getFullYear() === todayDate.getFullYear() &&
      activityDate.getMonth() === todayDate.getMonth() &&
      activityDate.getDate() === todayDate.getDate()
    );
  });

  const latestActivity = activitiesForToday[activitiesForToday.length - 1];

  // Determine if the user is currently logged in
  const isLoggedIn = latestActivity?.activityType === "Login";

  const latestActivityTime = latestActivity
    ? new Date(latestActivity.timestamp).toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      })
    : "No Activity";

  return { latestActivityTime, isLoggedIn };
};
