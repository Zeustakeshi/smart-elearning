import { api, getDataFromToken } from "@/config/axios";
import type { DecodedToken, LoginData, RegisterData } from "@/types/auth";
import Cookies from "js-cookie";

// Đăng nhập
export const login = async (data: LoginData) => {
  const response = await api.post("/auth/login", data);
  const token = response.data.data.value;
  setToken(token);
  const dataToken = getDataFromToken(token);
  setUserDataFromToken(dataToken);
  return response.data;
};

// Đăng ký
export const register = async (data: RegisterData) => {
  const response = await api.post("/auth/register", data);
  const token = response.data.data.value;
  setToken(token);
  const dataToken = getDataFromToken(token);
  setUserDataFromToken(dataToken);
  return response.data;
};

// Lưu token vào cookie
const setToken = (token: string) => {
  Cookies.set("token", token, { expires: 7 });
};

// Lưu thông tin người dùng từ token
const setUserDataFromToken = (dataToken: DecodedToken) => {
  const cookieMappings = {
    roles: dataToken.scope,
    user_id: dataToken.user_id,
    username: dataToken.username,
    email: dataToken.email,
  };

  Object.entries(cookieMappings).forEach(([key, value]) => {
    if (value !== undefined) {
      Cookies.set(
        key,
        typeof value === "object" ? JSON.stringify(value) : String(value)
      );
    }
  });
};

// Đăng xuất
export const logout = () => {
  Cookies.remove("token");
  Cookies.remove("user_id");
  Cookies.remove("roles");
  Cookies.remove("username");
  Cookies.remove("email");
};

//------- Lấy thông tin người dùng từ cookie -------//
export const getUserFromCookies = () => {
  return {
    token: Cookies.get("token"),
    userId: Cookies.get("user_id"),
    roles: Cookies.get("roles"),
    username: Cookies.get("username"),
    email: Cookies.get("email"),
  };
};
