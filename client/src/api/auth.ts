
import { apiClient } from "./apiClient";

export const login = async () => {
  const { data } = await apiClient.get("/auth/login");

  return data;
};