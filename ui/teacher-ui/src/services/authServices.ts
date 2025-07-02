import { api, getRolesFromToken } from "@/config/axios";
import type { LoginData, RegisterData } from "@/types/auth";
import Cookies from "js-cookie";

// Đăng nhập
export const login = async (data: LoginData) => {
  const response = await api.post("/auth/login", data);
  console.log("response", response.data);
  Cookies.set("token", response.data.token, {
    expires: 7,
  });

  // Giải mã token để lấy roles và lưu vào cookie
  const roles = getRolesFromToken(response.data.token);
  Cookies.set("roles", JSON.stringify(roles));
  Cookies.set("userId", response.data.userId);
  return response.data;
};

// Đăng ký
export const register = async (data: RegisterData) => {
  const response = await api.post("/auth/register", data);
  return response.data;
};

// Đăng xuất
export const logout = () => {
  Cookies.remove("token");
  Cookies.remove("userId");
  Cookies.remove("roles");
};
