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

// Decode token
export const getDataFromToken = (token: string): DecodedToken => {
  try {
    console.log("Decoding token:", token);
    const decoded: DecodedToken = jwtDecode(token);
    return decoded;
  } catch (error) {
    console.error("Lỗi decode:", error);
    throw new Error("Invalid token");
  }
};
