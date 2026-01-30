import { createSlice } from "@reduxjs/toolkit";

export const AuthSlice = createSlice({
  name: "loginStatus",
  initialState: { isLoggedIn: localStorage.getItem("isLoggedIn") ?? false },
  reducers: {
    login: (state) => {
      console.log(state);
      state.isLoggedIn = true;
      localStorage.setItem("isLoggedIn", true);
    },
    logout: (state) => {
      state.isLoggedIn = false;
      localStorage.setItem("isLoggedIn", false);
    },
  },
});

export const { login, logout } = AuthSlice.actions;
export default AuthSlice.reducer;
