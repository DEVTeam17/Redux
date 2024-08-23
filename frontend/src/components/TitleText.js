import { StyleSheet, Text, View } from "react-native";
import React, { useContext } from "react";
import themeContext from "../context/themeContext";

const TitleText = ({ children, optional }) => {
  const theme = useContext(themeContext);
  return (
    <Text style={[styles.title, { color: theme.color }]}>
      {children}
      {optional && (
        <Text style={{ fontSize: 10, color: theme.inputText }}>{optional}</Text>
      )}
    </Text>
  );
};

export default TitleText;

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 10,
  },
});
