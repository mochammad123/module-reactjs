import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";

export const storeSlice = configureStore({
  reducer: {
    auth: authReducer,
  },
});
