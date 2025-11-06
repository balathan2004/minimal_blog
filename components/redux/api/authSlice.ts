import { AuthResponseConfig, UserDataInterface } from "@/components/interfaces";
import { createSlice } from "@reduxjs/toolkit";
import authApi from "./authApi";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
export type NavBarType = { path: string; name: string }[];

export const NavGuests: NavBarType = [
  { path: "/", name: "home" },
  { path: "/blog", name: "blog" },
  { path: "/auth/login", name: "login" },
  { path: "/auth/register", name: "register" },
];

export const NavUsers: NavBarType = [
  { path: "/", name: "home" },
  { path: "/blog", name: "blog" },
  { path: "/create_post", name: "create post" },
  { path: "/account", name: "profile" },
];

const initialState = {
  userData: {} as UserDataInterface,
  accessToken: "",
  navState: NavGuests,
};

const authSlice = createSlice({
  initialState: initialState,
  name: "auth",
  reducers: {
    setAccessToken: (state, { payload }) => {
      state.accessToken = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      authApi.endpoints.login.matchFulfilled,
      (state, { payload }) => {
        state.userData = payload.credentials || ({} as UserDataInterface);
        (state.accessToken = payload.accessToken || ""),
          (state.navState = NavUsers);
        if (payload.refreshToken)
          localStorage.setItem("minimalBlogRefreshToken", payload.refreshToken);
      }
    ),
      builder.addMatcher(
        authApi.endpoints.getAccessToken.matchFulfilled,
        (state, { payload }) => {
          state.userData = payload.credentials || ({} as UserDataInterface);
          (state.accessToken = payload.accessToken || ""),
            (state.navState = NavUsers);
        }
      );
  },
});

export const useAuth = () => {
  return useSelector((state: RootState) => state.auth);
};
export const { setAccessToken } = authSlice.actions;
export default authSlice.reducer;
