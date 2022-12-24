import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import { persistReducer } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
};

const rootReducer = combineReducers({
  authReducer: persistReducer(persistConfig, authReducer),
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
