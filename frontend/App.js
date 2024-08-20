import * as React from "react";
import {
  NavigationContainer,
  DarkTheme,
  DefaultTheme,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { useColorScheme } from "react-native";
import { useState, useEffect } from "react";
import { EventRegister } from "react-native-event-listeners";
import { Provider } from "react-redux";

import themeContext from "./src/context/themeContext";
import theme from "./src/context/theme";
import OnBoardingOne from "./src/screens/OnBoardingOne";
import OnBoardingTwo from "./src/screens/OnBoardingTwo";
import OnBoardingThree from "./src/screens/OnBoardingThree";
import LoginScreen from "./src/screens/LoginScreen";
import RegisterScreen from "./src/screens/RegisterScreen";
import DashboardScreen from "./src/screens/DashboardScreen";
import HomeScreen from "./src/screens/HomeScreen";

import store from "./store";

const Stack = createNativeStackNavigator();

export default function App() {
  const colorScheme = useColorScheme();
  let systemColor;
  if (colorScheme === "light") {
    systemColor = false;
  } else {
    systemColor = true;
  }

  const [darkMode, setDarkMode] = useState(systemColor);
  useEffect(() => {
    const listener = EventRegister.addEventListener("ChangeTheme", (data) => {
      setDarkMode(data);
      console.log(data);
    });
    return () => {
      EventRegister.removeAllListeners(listener);
    };
  }, [darkMode]);
  return (
    <>
      <StatusBar style={darkMode === true ? "light" : "light"} />
      <Provider store={store}>
        <themeContext.Provider
          value={darkMode === true ? theme.dark : theme.light}
        >
          <NavigationContainer
            theme={darkMode === true ? DarkTheme : DefaultTheme}
          >
            <Stack.Navigator screenOptions={{ headerShown: false }}>
              <Stack.Screen name="OnBoardingOne" component={OnBoardingOne} />
              <Stack.Screen name="OnBoardingTwo" component={OnBoardingTwo} />
              <Stack.Screen
                name="OnBoardingThree"
                component={OnBoardingThree}
              />
              <Stack.Screen name="LoginScreen" component={LoginScreen} />
              <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
              <Stack.Screen
                name="DashboardScreen"
                component={DashboardScreen}
              />
              <Stack.Screen name="HomeScreen" component={HomeScreen} />
            </Stack.Navigator>
          </NavigationContainer>
        </themeContext.Provider>
      </Provider>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
