import React, { useContext } from "react";
import { Pressable, StyleSheet, Text } from "react-native";

import themeContext from "../context/themeContext";

function Button({ onPress, children }) {
  const theme = useContext(themeContext);

  return (
    <Pressable
      style={({ pressed }) => [
        { backgroundColor: theme.buttonBackground },
        styles.button,
        pressed && styles.pressed,
      ]}
      onPress={onPress}
    >
      <Text style={[styles.text, { color: theme.buttonText }]}>{children}</Text>
    </Pressable>
  );
}

export default Button;

const styles = StyleSheet.create({
  button: {
    marginVertical: 20,
    elevation: 2,
    borderRadius: 30,
    height: 55,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  pressed: {
    opacity: 0.7,
  },
  text: {
    fontWeight: "bold",
    fontSize: 18,
    textAlign: "center",
  },
});
