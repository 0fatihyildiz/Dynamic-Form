import { configureStore } from "@reduxjs/toolkit";
import generalSlice from "./slices/general-slice";

export const store = configureStore({
  reducer: {
    general: generalSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
