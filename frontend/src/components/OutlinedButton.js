import { Pressable, StyleSheet, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

function OutlinedButton({
  onPress,
  icon,
  children,
  color,
  borderColor,
  bgColor,
}) {
  return (
    <Pressable
      style={({ pressed }) => [
        { borderColor: borderColor, backgroundColor: bgColor },
        styles.button,
        pressed && styles.pressed,
      ]}
      onPress={onPress}
    >
      <Ionicons style={styles.icon} name={icon} size={24} color={color} />
      <Text style={[styles.text, { color: color }]}>{children}</Text>
    </Pressable>
  );
}

export default OutlinedButton;

const styles = StyleSheet.create({
  button: {
    marginVertical: 20,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 30,
    width: "100%",
    height: 55,
  },
  pressed: {
    opacity: 0.7,
  },
  icon: {
    marginRight: 6,
  },
  text: {
    fontWeight: "bold",
    fontSize: 18,
    textAlign: "center",
  },
});
