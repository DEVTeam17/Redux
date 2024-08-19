import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  ScrollView,
  Image,
} from "react-native";
import React from "react";

import ProgressBar from "../components/ProgressBar";
import Skip from "../components/Skip";
import HeaderText from "../components/HeaderText";
import ParaText from "../components/ParaText";
import Button from "../components/Button";

const OnBoardingTwo = ({ navigation }) => {
  const value = 66.6;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View>
          <ProgressBar value={value} />
          <Skip onPress={() => navigation.navigate("LoginScreen")} />
        </View>
        <Image
          source={require("../assets/OnBoardingTwo.png")}
          resizeMode="contain"
          style={styles.image}
        />
        <View>
          <HeaderText children="Effortless Attendance Tracking" />
          <ParaText
            children="Log your attendance effortlessly. Clock in, clock out – it's that
            simple. Focus on your work, and we'll take care of the rest."
          />
        </View>
        <Button
          children="Next"
          onPress={() => navigation.navigate("OnBoardingThree")}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default OnBoardingTwo;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "space-between",
  },
  image: {
    width: "100%",
  },
});
