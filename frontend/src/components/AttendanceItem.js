import React, { useContext } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Avatar } from "react-native-paper";
import themeContext from "../context/themeContext";

const AttendanceItem = ({ name, title, time, avatarSource, isLoggedIn }) => {
  const theme = useContext(themeContext);

  return (
    <View style={styles.itemContainer}>
      <Avatar.Image size={40} source={avatarSource} />
      <View style={styles.itemInfo}>
        <Text style={[styles.name, { color: theme.color }]}>{name}</Text>
        <Text style={[styles.title, { color: theme.color }]}>{title}</Text>
      </View>
      <Text
        style={[
          styles.time,
          {
            backgroundColor: isLoggedIn
              ? theme.attendenceItemBackground
              : theme.redbg,
            color: isLoggedIn ? theme.attendenceItemText : theme.accentRed,
          },
        ]}
      >
        {time}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
  },
  itemInfo: {
    flex: 1,
    marginLeft: 10,
  },
  name: {
    fontSize: 16,
  },
  title: {
    fontSize: 12,
    color: "grey",
    fontWeight: "100",
  },
  time: {
    fontSize: 14,
    borderRadius: 6,
    padding: 6,
    margin: 6,
  },
});

export default AttendanceItem;
