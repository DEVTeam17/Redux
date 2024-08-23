import React, { useState, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  Image,
} from "react-native";
import { Button, Icon } from "react-native-paper";
import * as DocumentPicker from "expo-document-picker";
import { useDispatch, useSelector } from "react-redux";

import DateTimePickerModal from "react-native-modal-datetime-picker";
import TitleText from "../components/TitleText";
import themeContext from "../context/themeContext";
import HeaderTitle from "../components/HeaderTitle";
import InputTitle from "../components/InputTitle";

import { timeOff } from "../actions/userActions";

const TimeOffScreen = () => {
  const theme = useContext(themeContext);
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.userLogin);

  const [selectedButton, setSelectedButton] = useState(null);
  const [startDate, setStartDate] = useState(new Date());
  const [startTime, setStartTime] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isStartTimePickerVisible, setStartTimePickerVisibility] =
    useState(false);
  const [isEndTimePickerVisible, setEndTimePickerVisibility] = useState(false);
  const [characterCount, setCharacterCount] = useState(0);
  const [reason, setReason] = useState("");
  const [document, setPickedDocument] = useState(null);

  const formatTime = (date) => {
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  };

  const handlePress = (button) => {
    setSelectedButton(button);
  };

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirmDate = (date) => {
    setStartDate(date);
    hideDatePicker();
  };

  const showStartTimePicker = () => {
    setStartTimePickerVisibility(true);
  };

  const hideStartTimePicker = () => {
    setStartTimePickerVisibility(false);
  };

  const handleConfirmStartTime = (time) => {
    setStartTime(time);
    hideStartTimePicker();
  };

  const showEndTimePicker = () => {
    setEndTimePickerVisibility(true);
  };

  const hideEndTimePicker = () => {
    setEndTimePickerVisibility(false);
  };

  const handleConfirmEndTime = (time) => {
    setEndTime(time);
    hideEndTimePicker();
  };

  const handleReasonChange = (text) => {
    if (text.length <= 2000) {
      setReason(text);
      setCharacterCount(text.length);
    }
  };

  const selectDocumentHandler = async () => {
    try {
      const document = await DocumentPicker.getDocumentAsync({
        type: "*/*",
        copyToCacheDirectory: true,
      });
      if (document.type !== "cancel") {
        setPickedDocument(document.uri);
      }
    } catch (err) {
      console.error("Error picking document: ", err);
    }
  };

  const handleSubmit = () => {
    if (!selectedButton || !reason) {
      alert("Please fill all the required fields.");
      return;
    }

    dispatch(
      timeOff(
        userInfo._id,
        selectedButton,
        startDate.toISOString(),
        formatTime(startTime),
        startDate.toISOString(),
        formatTime(endTime),
        reason,
        document
          ? [{ fileName: document.split("/").pop(), fileUrl: document }]
          : []
      )
    );

    setSelectedButton(null);
    setStartDate(new Date());
    setStartTime(new Date());
    setEndTime(new Date());
    setReason("");
    setPickedDocument(null);
  };

  const buttonData = [
    { label: "Sick", value: "Sick" },
    { label: "Vacation", value: "Vacation" },
    { label: "Maternity", value: "Maternity" },
    { label: "Personal Matters", value: "Personal Matters" },
  ];

  let documentPreview = (
    <Text style={{ textAlign: "center" }}>No Document uploaded yet...</Text>
  );

  if (document) {
    documentPreview = (
      <Image source={{ uri: document }} style={styles.documentPreview} />
    );
  }

  return (
    <SafeAreaView
      style={[styles.safeArea, { backgroundColor: theme.background }]}
    >
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <HeaderTitle children="Time Off" />
        <View style={styles.container}>
          <TitleText children="Select a category" />
          <ScrollView horizontal contentContainerStyle={styles.buttonContainer}>
            {buttonData.map(({ label, value }) => (
              <Button
                key={value}
                mode={selectedButton === value ? "contained" : "outlined"}
                onPress={() => handlePress(value)}
                style={styles.button}
                textColor={
                  selectedButton === value ? theme.white : theme.primaryText
                }
                buttonColor={
                  selectedButton === value
                    ? theme.buttonBackground
                    : theme.background
                }
              >
                {label}
              </Button>
            ))}
          </ScrollView>
        </View>
        <View style={styles.divider} />

        <View style={styles.container}>
          <TitleText children="Set the Duration" />

          <InputTitle children="Start Date" />
          <TouchableOpacity onPress={showDatePicker} style={styles.datePicker}>
            <View style={styles.datePickerContent}>
              <Text style={[styles.dateText, { color: theme.inputField }]}>
                {startDate.toDateString()}
              </Text>
              <Icon
                source="calendar-month-outline"
                color={theme.inputText}
                size={20}
              />
            </View>
          </TouchableOpacity>
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={handleConfirmDate}
            onCancel={hideDatePicker}
          />
          <View style={styles.timePickersContainer}>
            <View style={[styles.timePickerContainer, { marginRight: 5 }]}>
              <InputTitle children="Start Time" />

              <TouchableOpacity
                onPress={showStartTimePicker}
                style={styles.timePicker}
              >
                <Text style={[styles.timeText, { color: theme.inputField }]}>
                  {startTime.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </Text>
                <Icon source="chevron-down" color={theme.inputText} size={20} />
              </TouchableOpacity>
              <DateTimePickerModal
                isVisible={isStartTimePickerVisible}
                mode="time"
                onConfirm={handleConfirmStartTime}
                onCancel={hideStartTimePicker}
              />
            </View>
            <View style={[styles.timePickerContainer, { marginLeft: 5 }]}>
              <InputTitle children="End Time" />

              <TouchableOpacity
                onPress={showEndTimePicker}
                style={styles.timePicker}
              >
                <Text style={[styles.timeText, { color: theme.inputField }]}>
                  {endTime.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </Text>
                <Icon source="chevron-down" color={theme.inputText} size={20} />
              </TouchableOpacity>
              <DateTimePickerModal
                isVisible={isEndTimePickerVisible}
                mode="time"
                onConfirm={handleConfirmEndTime}
                onCancel={hideEndTimePicker}
              />
            </View>
          </View>
        </View>
        <View style={styles.divider} />
        <View style={styles.container}>
          <TitleText children="Description" />

          <TextInput
            multiline
            blurOnSubmit
            onChangeText={handleReasonChange}
            value={reason}
            style={[
              [
                styles.input,
                { borderColor: theme.inputField, color: theme.inputField },
              ],
              styles.textArea,
            ]}
            placeholder="Write your complete reason here..."
            placeholderTextColor={theme.inputText}
          />
          <View style={styles.characterCountContainer}>
            <Text style={{ fontSize: 10, color: theme.inputText }}>
              Maximum 2000 characters
            </Text>
            <Text style={{ fontSize: 10, color: theme.inputField }}>
              {characterCount}/2000
            </Text>
          </View>
        </View>
        <View style={styles.divider} />
        <View style={styles.container}>
          <TitleText children="Attachment" optional=" (optional)" />

          <View
            style={[styles.documentPreview, { borderColor: theme.inputField }]}
          >
            {documentPreview}
          </View>
          <Button
            icon="plus-circle-outline"
            mode="outlined"
            onPress={selectDocumentHandler}
            textColor={theme.borderColor}
            style={{
              borderColor: theme.borderColor,
            }}
          >
            Upload files
          </Button>
        </View>
      </ScrollView>

      <Button
        mode="contained"
        buttonColor={theme.buttonBackground}
        style={{
          marginHorizontal: 15,
          marginVertical: 20,
        }}
        onPress={handleSubmit}
      >
        Submit time off request
      </Button>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    paddingTop: 50,
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  container: {
    marginTop: 10,
    paddingHorizontal: 15,
  },

  buttonContainer: {
    flexDirection: "row",
    flexWrap: "nowrap",
    alignItems: "center",
  },
  button: {
    margin: 5,
  },
  divider: {
    width: "100%",
    height: 5,
    backgroundColor: "grey",
    marginVertical: 20,
  },
  datePicker: {
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#ccc",
    marginBottom: 20,
  },
  datePickerContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  dateText: {
    fontSize: 16,
    color: "#000",
  },

  timePickersContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  timePickerContainer: {
    flex: 1,
  },
  timePicker: {
    flex: 1,
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: "#ccc",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  timeText: {
    fontSize: 16,
    color: "#000",
  },
  input: {
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 5,
    padding: 5,
    paddingRight: 35,
  },
  textArea: {
    height: 120,
    textAlignVertical: "top",
  },
  characterCountContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  document: {
    width: "100%",
    height: "100%",
  },
  documentPreview: {
    width: "100%",
    height: 200,
    marginVertical: 8,
    justifyContent: "center",
    alignContent: "center",
    borderRadius: 4,
    borderWidth: 1,
  },
});

export default TimeOffScreen;
