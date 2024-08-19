import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { useSelector } from "react-redux";

const DashboardScreen = () => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  if (!userInfo) {
    return <Text>You are not authenticated.</Text>;
  }

  return (
    <View style={styles.container}>
      <Image source={{ uri: userInfo.image }} style={styles.image} />
      <Text style={styles.name}>{userInfo.name}</Text>
      <Text style={styles.jobTitle}>{userInfo.jobTitle}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
  },
  jobTitle: {
    fontSize: 18,
    color: "gray",
  },
});

export default DashboardScreen;
