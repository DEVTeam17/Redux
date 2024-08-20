import React, { useContext } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Button } from "react-native-paper";
import themeContext from "../context/themeContext";

const ClockInfo = ({ title, time, buttonTitle, mode, style, textColor }) => {
  const theme = useContext(themeContext);

  return (
    <View style={styles.clockInfoContainer}>
      <Text style={[styles.clockTitle, { color: theme.color }]}>{title}</Text>
      <Text style={[styles.clockTime, { color: theme.color }]}>{time}</Text>
      <Button mode={mode} style={style} textColor={textColor}>
        {buttonTitle}
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  clockInfoContainer: {
    flex: 1,
    margin: 10,
  },
  clockTitle: {
    fontWeight: "300",
    textAlign: "center",
    fontSize: 14,
    paddingTop: 10,
  },
  clockTime: {
    fontWeight: "600",
    paddingBottom: 10,
    textAlign: "center",
    fontSize: 24,
  },
});

export default ClockInfo;
