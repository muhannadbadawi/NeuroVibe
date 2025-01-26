import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice"; // Path to your userSlice

const store = configureStore({
  reducer: {
    user: userReducer, // Add your slice here
  },
});

export default store;