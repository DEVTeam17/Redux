import React, { useContext } from "react";
import { StyleSheet, View } from "react-native";

import themeContext from "../context/themeContext";

const ProgressBar = ({ value }) => {
  const theme = useContext(themeContext);

  return (
    <View
      style={[styles.progressBarContainer, { backgroundColor: theme.paraText }]}
    >
      <View
        style={[
          styles.progressBar,
          {
            width: `${value}%`,
            backgroundColor: theme.color,
          },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  progressBarContainer: {
    height: 4,
    borderRadius: 2,
    width: "100%",
  },
  progressBar: {
    height: "100%",
    borderRadius: 2,
  },
});

export default ProgressBar;
