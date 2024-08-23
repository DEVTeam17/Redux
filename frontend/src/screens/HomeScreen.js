import React, { useContext } from "react";
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
import { logout, listUsers } from "../actions/userActions";
import Button from "../components/Button";

const HomeScreen = ({ navigation }) => {
  const userDetails = useSelector((state) => state.userDetails);
  const { user } = userDetails;

  const dispatch = useDispatch();
  const userList = useSelector((state) => state.userList);
  const { users } = userList;
  console.log(user);

  const theme = useContext(themeContext);

  // Function to check if two dates are the same day
  const isSameDay = (date1, date2) => {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  };

  // Get today's date
  const todayDate = new Date();

  // Function to format time to 'HH:MM AM/PM'
  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
  };

  const userActivities = user.activities || [];

  // Filter activities for today
  const activitiesForToday = userActivities.filter((activity) => {
    const activityDate = new Date(activity.timestamp);
    return isSameDay(activityDate, todayDate);
  });

  // Find the first login of the day
  const firstLogin = activitiesForToday.find(
    (activity) => activity.activityType === "Login"
  );

  // Find the last logout of the day
  const lastLogout = [...activitiesForToday]
    .reverse()
    .find((activity) => activity.activityType === "Logout");

  // Extract the shift timing (clock-in and clock-out) from the first login or use fallback
  const shiftTiming = firstLogin?.shiftTiming || {
    clockInTime: "8:00 AM",
    clockOutTime: "5:00 PM",
  };

  const formattedLoginTime = firstLogin
    ? formatTime(firstLogin.timestamp) // Use the timestamp for the buttonTitle
    : "Not Yet";

  const formattedLogoutTime = lastLogout
    ? formatTime(lastLogout.timestamp) // Use the timestamp for the buttonTitle
    : "Not Yet";

  const logoutHandler = () => {
    dispatch(logout());
    navigation.navigate("LoginScreen");
  };

  const userListHandler = async () => {
    dispatch(listUsers());
    navigation.navigate("AllUsersScreen", { users });
  };

  // Helper function to get first login and last logout for other users
  const getFirstLoginAndLastLogout = (activities) => {
    const activitiesForToday = activities.filter((activity) => {
      const activityDate = new Date(activity.timestamp);
      return isSameDay(activityDate, todayDate);
    });

    const firstLogin = activitiesForToday.find(
      (activity) => activity.activityType === "Login"
    );

    const lastLogout = [...activitiesForToday]
      .reverse()
      .find((activity) => activity.activityType === "Logout");

    // Use the timestamp of the first login or last logout for the time
    const latestActivityTime = lastLogout
      ? formatTime(lastLogout.timestamp)
      : firstLogin
      ? formatTime(firstLogin.timestamp)
      : "No Activity";

    return {
      firstLogin,
      lastLogout,
      latestActivityTime,
      isLoggedIn: !!firstLogin && !lastLogout,
    };
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
                {todayDate.toLocaleDateString("en-US", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}{" "}
                {/* Display today's date in the preferred format */}
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
                time={shiftTiming.clockInTime} // Use shift clock-in time
                buttonTitle={
                  firstLogin ? `Done at ${formattedLoginTime}` : "Not Yet"
                }
                mode={"elevated"}
                textColor={"green"}
                style={{ backgroundColor: theme.clockInButtonColour }}
              />
              {/* Clock Out */}
              <ClockInfo
                title="Clock Out"
                time={shiftTiming.clockOutTime} // Use shift clock-out time
                buttonTitle={
                  lastLogout
                    ? `Last logout at ${formattedLogoutTime}`
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
                onPress={() => navigation.navigate("TimeOffScreen")}
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
                  onPress={() => userListHandler()}
                  style={[styles.viewAllText, { color: theme.color }]}
                >
                  View All
                </Text>
              </View>
              {users.slice(0, 6).map((userItem, index) => {
                const {
                  firstLogin,
                  lastLogout,
                  latestActivityTime,
                  isLoggedIn,
                } = getFirstLoginAndLastLogout(userItem.activities);

                return (
                  <View key={userItem._id}>
                    <AttendanceItem
                      name={userItem.name}
                      title={userItem.jobTitle}
                      time={latestActivityTime} // Correctly show the latest activity time
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
    fontWeight: "200",
  },
  nameText: {
    marginBottom: 5,
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
