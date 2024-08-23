import React, { useContext } from "react";
import { SafeAreaView, ScrollView, View, Text, StyleSheet } from "react-native";
import { Divider } from "react-native-paper";
import AttendanceItem from "../components/AttendanceItem";
import themeContext from "../context/themeContext";
import { useDispatch, useSelector } from "react-redux";

const AllUsersScreen = ({ route }) => {
  const userList = useSelector((state) => state.userList);
  const { users } = userList;
  const theme = useContext(themeContext);

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
  };

  const getLatestActivityTime = (activities = []) => {
    if (!activities || activities.length === 0)
      return { latestActivityTime: "No Activity", isLoggedIn: false };

    const latestActivity = activities
      .filter(
        (activity) =>
          activity.activityType === "Login" ||
          activity.activityType === "Logout"
      )
      .pop();

    const isLoggedIn = latestActivity?.activityType === "Login";

    const latestActivityTime = latestActivity
      ? formatTime(new Date(latestActivity.timestamp))
      : "No Activity";

    return { latestActivityTime, isLoggedIn };
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.background }]}
    >
      {users && users.length > 0 ? (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <View
            style={[
              styles.attendanceContainer,
              { backgroundColor: theme.secondaryBackground },
            ]}
          >
            <View style={styles.header}>
              <Text style={[styles.headerText, { color: theme.color }]}>
                All Users
              </Text>
            </View>
            {users.map((userItem, index) => {
              const { latestActivityTime, isLoggedIn } = getLatestActivityTime(
                userItem.activities
              );
              return (
                <View key={userItem._id}>
                  <AttendanceItem
                    name={userItem.name}
                    title={userItem.jobTitle}
                    time={latestActivityTime}
                    avatarSource={userItem.image}
                    isLoggedIn={isLoggedIn}
                  />
                  {index < users.length - 1 && <Divider />}
                </View>
              );
            })}
          </View>
        </ScrollView>
      ) : (
        <View style={styles.emptyState}>
          <Text style={{ color: theme.color }}>No users available.</Text>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
  },
  attendanceContainer: {
    padding: 10,
    marginHorizontal: 10,
    borderRadius: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  headerText: {
    alignSelf: "flex-start",
    fontSize: 17,
    fontWeight: "bold",
    alignItems: "center",
  },
  emptyState: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default AllUsersScreen;
