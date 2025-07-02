import type { DecodedToken } from "@/types/auth";
import axios, { type AxiosInstance } from "axios";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

export const api: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_URL_API,
  headers: {
    "Content-Type": "application/json",
  },
});

// Thêm token từ cookie vào header
api.interceptors.request.use((config) => {
  const token = Cookies.get("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Decode token lấy roles
export const getRolesFromToken = (token: string): string => {
  try {
    const decoded: DecodedToken = jwtDecode(token);
    return decoded.scope;
  } catch (error) {
    console.error("Lỗi decode:", error);
    return "";
  }
};
