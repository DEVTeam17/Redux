import React, { useContext, useState, useEffect } from "react";
import {
  View,
  Text,
  SafeAreaView,
  Keyboard,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Alert,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../actions/userActions";
import Button from "../components/Button";
import Input from "../components/Input";
import LoadingOverlay from "../components/LoadingOverLay";
import DividerLine from "../components/DividerLine";
import OutlinedButton from "../components/OutlinedButton";
import Icon from "../components/Icon";
import themeContext from "../context/themeContext";

const image = {
  uri: "https://img.freepik.com/free-photo/black-prism-concept-ai-generated_268835-7011.jpg",
};

const LoginScreen = ({ navigation }) => {
  const theme = useContext(themeContext);
  const dispatch = useDispatch();

  const { loading, error, userInfo } = useSelector((state) => state.userLogin);

  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});

  const validate = () => {
    Keyboard.dismiss();
    let isValid = true;

    if (!inputs.email) {
      handleError("Please input email", "email");
      isValid = false;
    } else if (!inputs.email.match(/\S+@\S+\.\S+/)) {
      handleError("Please input a valid email", "email");
      isValid = false;
    }

    if (!inputs.password) {
      handleError("Please input password", "password");
      isValid = false;
    } else if (inputs.password.length < 5) {
      handleError("Min password length of 5", "password");
      isValid = false;
    }

    if (isValid) {
      loginUser();
    }
  };

  const loginUser = () => {
    dispatch(login(inputs.email, inputs.password));
  };

  const handleOnchange = (text, input) => {
    setInputs((prevState) => ({ ...prevState, [input]: text }));
  };

  const handleError = (error, input) => {
    setErrors((prevState) => ({ ...prevState, [input]: error }));
  };

  useEffect(() => {
    if (userInfo) {
      navigation.navigate("DashboardScreen");
    }
  }, [navigation, userInfo]);

  useEffect(() => {
    if (error) {
      Alert.alert("Login Error", error);
    }
  }, [error]);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.black }]}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <LoadingOverlay visible={loading} message="Logging you in..." />
        <ImageBackground
          source={image}
          resizeMode="cover"
          style={styles.imageBackground}
        >
          <View style={styles.textContainer}>
            <Text style={[styles.welcomeText, { color: theme.white }]}>
              Welcome Back!
            </Text>
            <Text style={[styles.subtitleText, { color: theme.secondaryText }]}>
              Let’s get you signed in and make your work life smoother,
              together.
            </Text>
          </View>
        </ImageBackground>
        <View
          style={[
            styles.formContainer,
            { backgroundColor: theme.primaryBackground },
          ]}
        >
          <Text style={[styles.infoText, { color: theme.color }]}>
            Ensure that your account is associated with your company's email
            address to access our applications.
          </Text>
          <Input
            onChangeText={(text) => handleOnchange(text, "email")}
            onFocus={() => handleError(null, "email")}
            iconName="email-outline"
            label="Email"
            placeholder="Enter your email address"
            error={errors.email}
          />
          <Input
            onChangeText={(text) => handleOnchange(text, "password")}
            onFocus={() => handleError(null, "password")}
            iconName="lock-outline"
            label="Password"
            placeholder="Enter your password"
            error={errors.password}
            password
          />
          <Text
            onPress={() => navigation.navigate("RegisterScreen")}
            style={[styles.forgotPasswordText, { color: theme.color }]}
          >
            Forgot Password?
          </Text>
          <Button children="Sign In" onPress={validate} />
          <DividerLine />
          <OutlinedButton
            children="Sign In With Company's URL"
            onPress={() => navigation.navigate("RegisterScreen")}
            icon="attach"
            color={theme.color}
            borderColor={theme.black}
            bgColor={theme.bgColor}
          />
          <View style={styles.footerContainer}>
            <Icon
              icon="alert-circle-outline"
              color={theme.primaryText}
              onPress={() => console.log("Pressed")}
            />
            <Text style={[styles.footerText, { color: theme.primaryText }]}>
              If you encounter issues, please contact your company's HR
              department for assistance.
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  imageBackground: {
    paddingTop: 50,
    paddingHorizontal: 30,
    height: 200,
  },
  textContainer: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  welcomeText: {
    fontSize: 40,
    fontWeight: "bold",
    textAlign: "center",
  },
  subtitleText: {
    fontSize: 15,
    marginTop: 15,
    marginBottom: 25,
    textAlign: "center",
  },
  formContainer: {
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
    paddingHorizontal: 20,
    flex: 1,
    paddingTop: 20,
  },
  infoText: {
    marginBottom: 36,
  },
  forgotPasswordText: {
    color: "black",
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 16,
    marginTop: 36,
  },
  footerContainer: {
    flexDirection: "row",
    marginTop: 70,
    marginBottom: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  footerText: {
    textAlign: "center",
    marginLeft: 10,
  },
});

export default LoginScreen;
