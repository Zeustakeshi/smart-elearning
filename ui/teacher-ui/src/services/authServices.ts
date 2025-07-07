import { api } from "@/config/axios";
import type { LoginData, RegisterData } from "@/types/auth";
import Cookies from "js-cookie";

// Kiểm tra xác thực
export const isAuthenticated = (): boolean => {
  const token = Cookies.get("token");
  return Boolean(token);
};

// Đăng nhập
export const login = async (data: LoginData) => {
  const response = await api.post("/auth/login", data);
  const token = response.data.data.value;
  setToken(token);
  await fetchUserInfo();
  return response.data;
};

// Đăng ký
export const register = async (data: RegisterData) => {
  const response = await api.post("/auth/register", data);
  const token = response.data.data.value;
  setToken(token);
  await fetchUserInfo();
  return response.data;
};

// Lưu token vào cookie
const setToken = (token: string) => {
  Cookies.set("token", token, { expires: 7 });
};

// Đăng xuất
export const logout = () => {
  Cookies.remove("token");
  Cookies.remove("user");
};

//------- Lấy thông tin người dùng từ cookie -------//

export const fetchUserInfo = async () => {
  const response = await api.get("/user/me");
  const user = response.data.data;
  Cookies.set("user", JSON.stringify(user), { expires: 7 });
  return response.data;
};
