import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { userLogin } from "./authActions";

export interface UserInfo {
  id: string;
  name: string;
  email: string;
  userToken: string;
}

interface AuthState {
  loading: boolean;
  userInfo: UserInfo | null;
  userToken: string | null;
  error: string | null;
  success: boolean;
}

const initialState: AuthState = {
  loading: false,
  userInfo: localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo") as string)
    : null,
  userToken: localStorage.getItem("userToken") || null,
  error: null,
  success: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.loading = false;
      state.userInfo = null;
      state.userToken = null;
      state.error = null;
      state.success = false;

      localStorage.removeItem("userToken");
      localStorage.removeItem("userInfo");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(userLogin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        userLogin.fulfilled,
        (state, action: PayloadAction<UserInfo>) => {
          state.loading = false;
          state.userInfo = action.payload;
          state.userToken = action.payload.userToken;
          state.success = true;

          localStorage.setItem("userToken", action.payload.userToken);
          localStorage.setItem("userInfo", JSON.stringify(action.payload));
        },
      )
      .addCase(userLogin.rejected, (state, action) => {
        state.loading = false;
        if (action.payload) {
          state.error = action.payload as string;
        } else {
          state.error = action.error.message || "Something went wrong";
        }
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
