import { View, StyleSheet, Button, Alert } from "react-native";

const ErrorMessage = ({ children }) => {
  return Alert.alert("Alert Title", { children }, [
    {
      text: "Cancel",
      onPress: () => console.log("Cancel Pressed"),
      style: "cancel",
    },
    { text: "OK", onPress: () => console.log("OK Pressed") },
  ]);
};

export default ErrorMessage;

const styles = StyleSheet.create({});
