import React, { useContext, useState, useCallback } from "react";
import {
  View,
  Text,
  SafeAreaView,
  Keyboard,
  ScrollView,
  Alert,
  StyleSheet,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../actions/userActions";
import Button from "../components/Button";
import Input from "../components/Input";
import LoadingOverlay from "../components/LoadingOverLay";
import themeContext from "../context/themeContext";

const RegisterScreen = ({ navigation }) => {
  const theme = useContext(themeContext);
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.userRegister);

  const [inputs, setInputs] = useState({
    email: "",
    fullname: "",
    phone: "",
    password: "",
    jobTitle: "",
    address: "",
    dateOfJoining: "",
    department: "",
    status: "",
    image: "",
  });

  const [errors, setErrors] = useState({});

  const validateInputs = () => {
    const validationErrors = {};
    if (!inputs.email) {
      validationErrors.email = "Please input email";
    } else if (!inputs.email.match(/\S+@\S+\.\S+/)) {
      validationErrors.email = "Please input a valid email";
    }

    if (!inputs.fullname) {
      validationErrors.fullname = "Please input fullname";
    }

    if (!inputs.phone) {
      validationErrors.phone = "Please input phone number";
    }

    if (!inputs.password) {
      validationErrors.password = "Please input password";
    } else if (inputs.password.length < 5) {
      validationErrors.password = "Password must be at least 5 characters";
    }

    return validationErrors;
  };

  const validate = () => {
    Keyboard.dismiss();
    const validationErrors = validateInputs();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      registerUser();
    }
  };

  const registerUser = async () => {
    try {
      await dispatch(
        register(
          inputs.fullname,
          inputs.email,
          inputs.password,
          false, // Assuming isAdmin is false for regular users
          inputs.jobTitle,
          inputs.address,
          inputs.dateOfJoining,
          inputs.department,
          inputs.status,
          inputs.image
        )
      );
      navigation.navigate("DashboardScreen");
    } catch (err) {
      Alert.alert("Registration Error", err.message || "Something went wrong.");
    }
  };

  const handleOnChange = useCallback((text, input) => {
    setInputs((prevState) => ({ ...prevState, [input]: text }));
  }, []);

  const handleError = useCallback((error, input) => {
    setErrors((prevState) => ({ ...prevState, [input]: error }));
  }, []);

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.black }]}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <LoadingOverlay visible={loading} message="Creating account..." />
        <Text style={[styles.headerText, { color: theme.color }]}>
          Register
        </Text>
        <Text style={[styles.subtitleText, { color: theme.secondaryText }]}>
          Create an account to get started
        </Text>

        <Input
          onChangeText={(text) => handleOnChange(text, "fullname")}
          onFocus={() => handleError(null, "fullname")}
          iconName="account-outline"
          label="Full Name"
          placeholder="Enter your full name"
          error={errors.fullname}
        />
        <Input
          onChangeText={(text) => handleOnChange(text, "email")}
          onFocus={() => handleError(null, "email")}
          iconName="email-outline"
          label="Email"
          placeholder="Enter your email address"
          error={errors.email}
        />
        <Input
          onChangeText={(text) => handleOnChange(text, "phone")}
          onFocus={() => handleError(null, "phone")}
          iconName="phone-outline"
          label="Phone Number"
          placeholder="Enter your phone number"
          error={errors.phone}
        />
        <Input
          onChangeText={(text) => handleOnChange(text, "password")}
          onFocus={() => handleError(null, "password")}
          iconName="lock-outline"
          label="Password"
          placeholder="Enter your password"
          error={errors.password}
          password
        />
        <Input
          onChangeText={(text) => handleOnChange(text, "jobTitle")}
          onFocus={() => handleError(null, "jobTitle")}
          iconName="briefcase-outline"
          label="Job Title"
          placeholder="Enter your job title"
          error={errors.jobTitle}
        />
        <Input
          onChangeText={(text) => handleOnChange(text, "address")}
          onFocus={() => handleError(null, "address")}
          iconName="map-marker-outline"
          label="Address"
          placeholder="Enter your address"
          error={errors.address}
        />
        <Input
          onChangeText={(text) => handleOnChange(text, "dateOfJoining")}
          onFocus={() => handleError(null, "dateOfJoining")}
          iconName="calendar-outline"
          label="Date of Joining"
          placeholder="Enter your date of joining"
          error={errors.dateOfJoining}
        />
        <Input
          onChangeText={(text) => handleOnChange(text, "department")}
          onFocus={() => handleError(null, "department")}
          iconName="office-building-outline"
          label="Department"
          placeholder="Enter your department"
          error={errors.department}
        />
        <Input
          onChangeText={(text) => handleOnChange(text, "status")}
          onFocus={() => handleError(null, "status")}
          iconName="account-check-outline"
          label="Status"
          placeholder="Enter your status"
          error={errors.status}
        />
        <Input
          onChangeText={(text) => handleOnChange(text, "image")}
          onFocus={() => handleError(null, "image")}
          iconName="image-outline"
          label="Image URL"
          placeholder="Enter your image URL"
          error={errors.image}
        />

        <Button title="Register" onPress={validate} />
        <Text
          onPress={() => navigation.navigate("LoginScreen")}
          style={[styles.signInText, { color: theme.color }]}
        >
          Already have an account? Sign In
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollViewContent: {
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  headerText: {
    fontSize: 40,
    fontWeight: "bold",
  },
  subtitleText: {
    fontSize: 18,
    marginVertical: 10,
  },
  signInText: {
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 16,
    marginTop: 20,
  },
});

export default RegisterScreen;
