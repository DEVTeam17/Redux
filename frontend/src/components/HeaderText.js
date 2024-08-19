import React, { useContext } from "react";
import { StyleSheet, Text, View } from "react-native";

import themeContext from "../context/themeContext";

const HeaderText = ({ children }) => {
  const theme = useContext(themeContext);

  return (
    <View>
      <Text style={[styles.title, { color: theme.headerText }]}>
        {children}
      </Text>
    </View>
  );
};

export default HeaderText;

const styles = StyleSheet.create({
  title: {
    fontWeight: "bold",
    fontSize: 30,
    textAlign: "center",
    marginBottom: 10,
  },
});
