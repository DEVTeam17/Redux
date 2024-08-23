import { StyleSheet, Text, View } from "react-native";
import React, { useContext } from "react";
import themeContext from "../context/themeContext";

const InputTitle = ({ children }) => {
  const theme = useContext(themeContext);

  return (
    <Text style={[styles.inputTitle, { color: theme.color }]}>{children}</Text>
  );
};

export default InputTitle;

const styles = StyleSheet.create({
  inputTitle: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 5,
  },
});
