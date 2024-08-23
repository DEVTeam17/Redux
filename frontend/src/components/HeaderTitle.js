import { StyleSheet, Text, View } from "react-native";
import React, { useContext } from "react";

import themeContext from "../context/themeContext";

const HeaderTitle = ({ children }) => {
  const theme = useContext(themeContext);
  return (
    <Text style={[styles.container, { color: theme.color }]}>{children}</Text>
  );
};

export default HeaderTitle;

const styles = StyleSheet.create({
  container: {
    textAlign: "center",
    fontWeight: "500",
    fontSize: 20,
  },
});
