import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

import {
  USER_DELETE_FAIL,
  USER_DELETE_REQUEST,
  USER_DELETE_SUCCESS,
  USER_DETAILS_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_RESET,
  USER_DETAILS_SUCCESS,
  USER_LIST_FAIL,
  USER_LIST_REQUEST,
  USER_LIST_RESET,
  USER_LIST_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_UPDATE_FAIL,
  USER_UPDATE_PROFILE_FAIL,
  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_RESET,
  USER_UPDATE_PROFILE_SUCCESS,
  USER_UPDATE_REQUEST,
  USER_UPDATE_SUCCESS,
  USER_TIMEOFF_REQUEST,
  USER_TIMEOFF_SUCCESS,
  USER_TIMEOFF_FAIL,
} from "../constants/userConstants";

const API_URL = "http://localhost:5000/api/users"; // Replace with your actual API URL

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: USER_LOGIN_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.post(
      `${API_URL}/login`,
      { email, password },
      config
    );

    dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
    console.log(data);

    await AsyncStorage.setItem("userInfo", JSON.stringify(data));
    dispatch(getUserDetails());
    dispatch(listUsers());
  } catch (err) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};

export const logout = () => async (dispatch, getState) => {
  try {
    const {
      userLogin: { userInfo },
    } = getState();

    if (userInfo && userInfo.token) {
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
      await axios.post(`${API_URL}/logout`, {}, config);
    }

    const storedUserInfo = await AsyncStorage.getItem("userInfo");
    if (storedUserInfo) {
      await AsyncStorage.removeItem("userInfo");
    }

    dispatch({ type: USER_LOGOUT });
  } catch (err) {
    console.error("Logout failed:", err.message);
  }
};

export const register =
  (
    name,
    email,
    password,
    isAdmin,
    jobTitle,
    address,
    dateOfJoining,
    department,
    status,
    image
  ) =>
  async (dispatch) => {
    try {
      dispatch({ type: USER_REGISTER_REQUEST });

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      // Making POST request to register user
      const { data } = await axios.post(
        `${API_URL}`,
        {
          name,
          email,
          password,
          isAdmin,
          jobTitle,
          address,
          dateOfJoining,
          department,
          status,
          image,
        },
        config
      );

      // Dispatching success actions
      dispatch({ type: USER_REGISTER_SUCCESS, payload: data });
      dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
      console.log(data);

      // Saving user info to AsyncStorage
      await AsyncStorage.setItem("userInfo", JSON.stringify(data));
    } catch (err) {
      // Handling errors
      dispatch({
        type: USER_REGISTER_FAIL,
        payload:
          err.response && err.response.data.message
            ? err.response.data.message
            : err.message,
      });
    }
  };

export const getUserDetails = () => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_DETAILS_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`${API_URL}/profile`, config);

    // Check if the activities are included in the data response
    console.log(data.activities);

    dispatch({ type: USER_DETAILS_SUCCESS, payload: data });
  } catch (err) {
    const errorMessage =
      err.response && err.response.data.message
        ? err.response.data.message
        : err.message;

    dispatch({
      type: USER_DETAILS_FAIL,
      payload: errorMessage,
    });
  }
};

export const updateUserProfile = (user) => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_UPDATE_PROFILE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.put(`/api/users/profile`, user, config);

    dispatch({ type: USER_UPDATE_PROFILE_SUCCESS, payload: data });
    dispatch({ type: USER_LOGIN_SUCCESS, payload: data });
  } catch (err) {
    dispatch({
      type: USER_UPDATE_PROFILE_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};

export const listUsers = () => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_LIST_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`${API_URL}`, config);

    dispatch({ type: USER_LIST_SUCCESS, payload: data });
  } catch (err) {
    dispatch({
      type: USER_LIST_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};

export const deleteUser = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_DELETE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    await axios.delete(`/api/users/${id}`, config);

    dispatch({ type: USER_DELETE_SUCCESS });
  } catch (err) {
    dispatch({
      type: USER_DELETE_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};

export const updateUser = (user) => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_UPDATE_REQUEST });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.put(`/api/users/${user._id}`, user, config);

    dispatch({ type: USER_UPDATE_SUCCESS, payload: data });
  } catch (err) {
    dispatch({
      type: USER_UPDATE_FAIL,
      payload:
        err.response && err.response.data.message
          ? err.response.data.message
          : err.message,
    });
  }
};

export const timeOff =
  (
    userId,
    category,
    startDate,
    startTime,
    endDate,
    endTime,
    description,
    attachments
  ) =>
  async (dispatch, getState) => {
    try {
      dispatch({ type: USER_TIMEOFF_REQUEST });

      const {
        userLogin: { userInfo },
      } = getState(); // Extracting the logged-in user's information from the state

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`, // Adding the token for protected routes
        },
      };

      // Making POST request to apply for time off
      const { data } = await axios.post(
        `${API_URL}/timeoff`,
        {
          userId,
          category,
          duration: {
            startDate,
            startTime,
            endDate,
            endTime,
          },
          description,
          attachments,
        },
        config
      );

      // Dispatching success action
      dispatch({ type: USER_TIMEOFF_SUCCESS, payload: data });
      console.log("Time-off request successful:", data);
    } catch (err) {
      // Handling errors
      dispatch({
        type: USER_TIMEOFF_FAIL,
        payload:
          err.response && err.response.data.message
            ? err.response.data.message
            : err.message,
      });
    }
  };
