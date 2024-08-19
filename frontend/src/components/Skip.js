import React, { useContext } from "react";
import { StyleSheet, Text, View, Pressable } from "react-native";

import themeContext from "../context/themeContext";

const Skip = ({ onPress }) => {
  const theme = useContext(themeContext);

  return (
    <Pressable onPress={onPress}>
      <Text style={[styles.skipText, { color: theme.skipText }]}>Skip</Text>
    </Pressable>
  );
};

export default Skip;

const styles = StyleSheet.create({
  skipText: {
    textAlign: "right",
    paddingTop: 5,
  },
});
