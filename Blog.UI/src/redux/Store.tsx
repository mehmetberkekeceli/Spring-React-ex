import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./UserSlice";

type RootState = ReturnType<typeof store.getState>;

export const store = configureStore({
  reducer: {
    auth: authSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export type AppThunk = (
  ...args: any
) => (dispatch: AppDispatch, getState: () => RootState) => any;
export type { RootState };
