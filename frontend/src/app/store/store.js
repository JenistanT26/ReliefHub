import { configureStore } from "@reduxjs/toolkit";
import requestReducer from "./slices/requestSlice.js";
import donorItemReducer from "./slices/donoritemSlice";

export const store = configureStore({
  reducer: {
    requests: requestReducer,
    donorItems: donorItemReducer,
  },
});
