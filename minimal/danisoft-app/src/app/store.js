import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./api/apiSlice";

export const store = configureStore({
  reducer: { [apiSlice.reducerPath]: apiSlice.reducer }, //Set it as empty object, then we wrefer to the apiSlice
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true, //True  to use the redux devTools
});
