import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./api/apiSlice";
import todosSlice from "../features/todosSlice";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    todos: todosSlice,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});
