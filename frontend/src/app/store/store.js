import { configureStore } from "@reduxjs/toolkit";
import requestReducer from "./slices/requestSlice.js";

export const store = configureStore({
  reducer: {
    requests: requestReducer,
  },
});