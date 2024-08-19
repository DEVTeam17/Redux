import React, { useContext } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import themeContext from "../context/themeContext";

const Input = ({
  label,
  iconName,
  error,
  password,
  onFocus = () => {},
  ...props
}) => {
  const theme = useContext(themeContext);
  const [hidePassword, setHidePassword] = React.useState(password);
  const [isFocused, setIsFocused] = React.useState(false);
  return (
    <View style={{ marginBottom: 20 }}>
      <View
        style={[
          style.inputContainer,
          {
            borderColor: error
              ? theme.accentRed
              : isFocused
              ? theme.color
              : theme.color,
            alignItems: "center",
            backgroundColor: theme.primaryBackground,
          },
        ]}
      >
        <Icon
          name={iconName}
          style={{ color: theme.inputField, fontSize: 22, marginRight: 10 }}
        />
        <TextInput
          autoCorrect={false}
          onFocus={() => {
            onFocus();
            setIsFocused(true);
          }}
          onBlur={() => setIsFocused(false)}
          secureTextEntry={hidePassword}
          style={{ color: theme.color, flex: 1 }}
          placeholderTextColor={theme.inputField}
          {...props}
        />
        {password && (
          <Icon
            onPress={() => setHidePassword(!hidePassword)}
            name={hidePassword ? "eye-outline" : "eye-off-outline"}
            style={{ color: theme.inputField, fontSize: 22 }}
          />
        )}
      </View>
      {error && (
        <Text style={{ marginTop: 7, color: theme.accentRed, fontSize: 12 }}>
          {error}
        </Text>
      )}
    </View>
  );
};

const style = StyleSheet.create({
  inputContainer: {
    height: 55,
    flexDirection: "row",
    paddingHorizontal: 15,
    borderWidth: 0.5,
    borderRadius: 10,
  },
});

export default Input;
