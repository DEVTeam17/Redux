import React, { useContext } from "react";
import { StyleSheet, Text, View } from "react-native";

import themeContext from "../context/themeContext";

const ParaText = ({ children }) => {
  const theme = useContext(themeContext);

  return (
    <View>
      <Text style={[styles.text, { color: theme.paraText }]}>{children}</Text>
    </View>
  );
};

export default ParaText;

const styles = StyleSheet.create({
  text: {
    fontWeight: "400",
    fontSize: 15,
    marginBottom: 30,
    textAlign: "center",
  },
});
