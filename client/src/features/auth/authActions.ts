import axios from "axios";
import { apiClient } from "@/api/apiClient";
import { createAsyncThunk } from "@reduxjs/toolkit";

type LoginPayload = {
  email: string;
  password: string;
};

interface UserInfo {
  id: string;
  name: string;
  email: string;
  userToken: string;
}

export const userLogin = createAsyncThunk(
  "auth/login",
  async (payload: LoginPayload, { rejectWithValue }) => {
    const { email, password } = payload;

    try {
      const { data } = await apiClient.post(`/auth/login`, { email, password });

      const userInfo: UserInfo = {
        id: data.id,
        name: data.name,
        email: data.email,
        userToken: data.access_token,
      };

      localStorage.setItem("userToken", userInfo.userToken);

      return userInfo;
    } catch (err) {
      let errorMessage: string;

      if (axios.isAxiosError(err) && err.response?.data?.message) {
        errorMessage = err.response.data.message;
      } else if (err instanceof Error) {
        errorMessage = err.message;
      } else {
        errorMessage = "An unknown error occurred";
      }

      return rejectWithValue(errorMessage);
    }
  },
);
