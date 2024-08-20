import { applyMiddleware, combineReducers, createStore } from "redux";
import { composeWithDevTools } from "@redux-devtools/extension";
import { thunk } from "redux-thunk";
// import AsyncStorage from "@react-native-async-storage/async-storage";

import {
  userDetailsReducer,
  userLoginReducer,
  userRegisterReducer,
  userUpdateProfileReducer,
} from "./src/reducers/userReducer";

const reducer = combineReducers({
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
});

const initialState = {
  userLogin: { userInfo: null, loading: false, error: null },
  userRegister: { loading: false, error: null },
  userDetails: { user: {}, loading: false, error: null },
  userUpdateProfile: { user: {}, loading: false, error: null, success: false },
};

const middlewares = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middlewares))
);

export default store;
