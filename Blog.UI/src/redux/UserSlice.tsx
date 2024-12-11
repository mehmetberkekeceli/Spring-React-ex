import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import { RootState } from "./Store";

const userCookie = Cookies.get("user");
const initialUser = userCookie ? JSON.parse(userCookie) : null;
const tokenCookie = Cookies.get("token");
const initialToken = tokenCookie ? tokenCookie : null;

export interface AuthState {
  user: string | null;
  userToken: string | null;
}

const initialState: AuthState = {
  user: initialUser,
  userToken: initialToken,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<string>) => {
      Cookies.set("user", action.payload);
      state.user = action.payload;
      Cookies.set("token", action.payload);
      state.userToken = action.payload;
    },
  },
});

export const { login } = authSlice.actions;
export default authSlice.reducer;

// Selector
export const selectUser = (state: RootState) => state.auth.user;
export const selectToken = (state: RootState) => state.auth.userToken;
