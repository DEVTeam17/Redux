import React, { useContext } from "react";
import { View, Text, StyleSheet } from "react-native";
import { IconButton } from "react-native-paper";
import themeContext from "../context/themeContext";

const MenuButton = ({ icon, iconColor, text, onPress }) => {
  const theme = useContext(themeContext);

  return (
    <View style={styles.menuButtonContainer}>
      <IconButton
        icon={icon}
        iconColor={iconColor}
        size={37}
        style={[
          styles.menuButtonIcon,
          { backgroundColor: theme.secondaryBackground },
        ]}
        onPress={onPress}
      />
      <Text style={[styles.menuButtonText, { color: theme.color }]}>
        {text}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  menuButtonIcon: {
    borderRadius: 10,
  },
  menuButtonContainer: {
    alignItems: "center",
    width: "25%",
  },
  menuButtonText: {
    marginTop: 5,
    textAlign: "center",
    color: "black",
    paddingBottom: 5,
    fontSize: 13,
    fontWeight: "500",
  },
});

export default MenuButton;
