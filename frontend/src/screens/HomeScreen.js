import React, { useContext, useEffect, useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  StyleSheet,
  Image,
} from "react-native";
import { IconButton, Divider } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";

import MenuButton from "../components/MenuButton";
import AttendanceItem from "../components/AttendanceItem";
import ClockInfo from "../components/ClockInfo";
import themeContext from "../context/themeContext";
import theme from "../context/theme";
import { logout, listUsers } from "../actions/userActions";
import Button from "../components/Button";

const HomeScreen = ({ navigation }) => {
  const userDetails = useSelector((state) => state.userDetails);
  const { user } = userDetails;
  console.log(user);

  const dispatch = useDispatch();
  const userList = useSelector((state) => state.userList);
  const { users } = userList;

  const theme = useContext(themeContext);

  const today = new Date().toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
  };

  const userActivities = user.activities || [];

  // Find the latest clock-in activity
  const latestClockIn = userActivities
    .filter((activity) => activity.activityType === "Login")
    .pop();

  // Find the latest clock-out activity
  const latestClockOut = userActivities
    .filter((activity) => activity.activityType === "Logout")
    .pop();

  // Format the times for display
  const formattedClockInTime = latestClockIn?.clockInTime
    ? formatTime(new Date(latestClockIn.clockInTime))
    : "Not Yet";

  const formattedClockOutTime = latestClockIn?.clockOutTime
    ? formatTime(new Date(latestClockIn.clockOutTime))
    : "Not Yet";

  // Function to get the latest login or logout activity time
  const getLatestActivityTime = (activities) => {
    if (!activities || activities.length === 0)
      return { latestActivityTime: "No Activity", isLoggedIn: false };

    // Get the latest activity (either login or logout)
    const latestActivity = activities
      .filter(
        (activity) =>
          activity.activityType === "Login" ||
          activity.activityType === "Logout"
      )
      .pop();

    // Determine if the user is logged in
    const isLoggedIn = latestActivity?.activityType === "Login";

    // Get the activity time from the timestamp
    const latestActivityTime = latestActivity
      ? formatTime(new Date(latestActivity.timestamp))
      : "No Activity";

    return { latestActivityTime, isLoggedIn };
  };

  const logoutHandler = () => {
    dispatch(logout());
    navigation.navigate("LoginScreen");
  };
  const userListHandler = async () => {
    await dispatch(listUsers());
    console.log("Navigating to AllUsersScreen with users:", users);
    navigation.navigate("AllUsersScreen", { users });
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.background }]}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Profile Container */}
        <View style={[styles.profilecontent, { backgroundColor: theme.black }]}>
          <Image source={{ uri: user.image }} style={styles.image} />
          <View style={styles.textContainer}>
            <Text style={[styles.titleText, { color: theme.white }]}>
              {user.jobTitle}
            </Text>
            <Text style={[styles.nameText, { color: theme.white }]}>
              {user.name}
            </Text>
          </View>
          <IconButton
            icon="bell"
            iconColor={theme.color}
            size={20}
            onPress={() => console.log("Pressed")}
            style={{ backgroundColor: theme.background, borderRadius: 30 }}
          />
        </View>

        {/* Overview Container */}
        <View style={{ zIndex: 1000, position: "relative", top: "-20%" }}>
          <View
            style={[
              styles.overviewContainer,
              { backgroundColor: theme.secondaryBackground },
            ]}
          >
            <View>
              <Text style={[styles.overviewText, { color: theme.color }]}>
                Today's Overview
              </Text>
              <Text style={[styles.overviewDate, { color: theme.color }]}>
                {today}
              </Text>
            </View>
            <View style={styles.iconContainer}>
              <IconButton
                icon="dots-horizontal"
                iconColor={theme.color}
                size={20}
                onPress={() => console.log("Pressed")}
              />
            </View>
            {/* Clock In */}
            <View
              style={[
                styles.clockContainer,
                { backgroundColor: theme.ternaryBackground },
              ]}
            >
              <ClockInfo
                title="Clock In"
                time={formattedClockInTime} // Display formatted clock-in time
                buttonTitle={
                  latestClockIn
                    ? `Done at ${formatTime(latestClockIn.timestamp)}`
                    : "Not Yet"
                }
                mode={"elevated"}
                textColor={"green"}
                style={{ backgroundColor: theme.clockInButtonColour }}
              />
              {/* Clock Out */}
              <ClockInfo
                title="Clock Out"
                time={formattedClockOutTime} // Display formatted clock-out time
                buttonTitle={
                  latestClockIn
                    ? "Not Yet"
                    : latestClockOut
                    ? `Done at ${formatTime(latestClockOut.timestamp)}`
                    : "Not Yet"
                }
                mode={"contained"}
                style={{ backgroundColor: theme.clockOutButtonColour }}
              />
            </View>
          </View>

          {/* Menu Container */}
          <View>
            {/* Buttons */}
            <View style={styles.buttonRow}>
              <MenuButton
                icon="text-box-outline"
                iconColor={theme.menuIconGreen}
                text="Payroll"
                onPress={() => console.log("Payroll button Pressed")}
              />
              <MenuButton
                icon="hand-coin-outline"
                iconColor={theme.menuIconRed}
                text="Payslip"
                onPress={() => console.log("pressed")}
              />
              <MenuButton
                icon="chat-outline"
                iconColor={theme.menuIconOrange}
                text="Counseling"
                onPress={() => console.log("pressed")}
              />
              <MenuButton
                icon="file-document-edit-outline"
                iconColor={theme.menuIconGreen}
                text="Time Off"
                onPress={() => console.log("pressed")}
              />
              <MenuButton
                icon="calendar-month-outline"
                iconColor={theme.menuIconRed}
                text="Calendar"
                onPress={() => console.log("pressed")}
              />
              <MenuButton
                icon="timer-outline"
                iconColor={theme.menuIconGreen}
                text="Overtime"
                onPress={() => console.log("Overtime button Pressed")}
              />
              <MenuButton
                icon="close-circle"
                iconColor={theme.menuIconRed}
                text="Resign"
                onPress={() => console.log("pressed")}
              />
              <MenuButton
                icon="dots-horizontal"
                iconColor={theme.color}
                text="Other"
                onPress={() => console.log("pressed")}
              />
            </View>

            <Button onPress={logoutHandler} children={"Logout"} />

            {/* Attendance Container */}
            <View
              style={[
                styles.attendanceContainer,
                { backgroundColor: theme.secondaryBackground },
              ]}
            >
              <View style={styles.header}>
                <Text style={[styles.headerText, { color: theme.color }]}>
                  Attendance Tracking
                </Text>
                <Text
                  onPress={() =>
                    // navigation.navigate("AllUsersScreen", { users })
                    userListHandler()
                  }
                  style={[styles.viewAllText, { color: theme.color }]}
                >
                  View All
                </Text>
              </View>
              {users.slice(0, 6).map((userItem, index) => {
                const { latestActivityTime, isLoggedIn } =
                  getLatestActivityTime(userItem.activities);
                return (
                  <View key={userItem._id}>
                    <AttendanceItem
                      name={userItem.name}
                      title={userItem.jobTitle}
                      time={latestActivityTime}
                      avatarSource={userItem.image}
                      isLoggedIn={isLoggedIn}
                    />
                    {index < 5 && <Divider />}
                  </View>
                );
              })}
            </View>
          </View>
        </View>
      </ScrollView>
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
  image: {
    width: 50,
    height: 50,
    borderRadius: 50,
    marginBottom: 20,
  },
  profilecontent: {
    flexDirection: "row",
    alignItems: "flex-start",
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    paddingHorizontal: 10,
    paddingTop: 25,
    height: "30%",
  },
  textContainer: {
    marginLeft: 10,
    flex: 1,
  },
  titleText: {
    marginBottom: 5,
    color: theme.white,
    fontWeight: "200",
  },
  nameText: {
    marginBottom: 5,
    color: theme.white,
  },
  overviewContainer: {
    borderRadius: 20,
    padding: 10,
    marginBottom: 20,
    marginHorizontal: 10,
  },
  overviewText: {
    fontWeight: "200",
    fontSize: 15,
    paddingBottom: 5,
  },
  overviewDate: {
    fontWeight: "600",
    fontSize: 18,
    paddingBottom: 10,
  },
  clockContainer: {
    flexDirection: "row",
    marginTop: 10,
    borderRadius: 20,
    marginHorizontal: 10,
  },

  buttonRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 10,
  },

  attendanceContainer: {
    padding: 10,
    borderRadius: 10,
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
  viewAllText: {
    fontSize: 15,
  },
  iconContainer: {
    position: "absolute",
    top: 10,
    right: 10,
  },
});

export default HomeScreen;
