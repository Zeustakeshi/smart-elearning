import type { User } from "@/api/response/user.type";
import { getUserInfo } from "@/api/user.api";
import { TokenType } from "@/common/enums/TokenType";
import type { Token } from "@/common/types/auth.type";
import * as tokenStore from "@/lib/tokenStore";
import { createContext, useContext, useState } from "react";

export interface AuthContext {
  user: User | null;
  isAuthenticated: boolean;
  login: (accessToken: Token, refreshToken: Token) => Promise<void>;
  logout: () => void;
  updateUserInfo: () => Promise<void>;
}

const AuthContext = createContext<AuthContext | null>(null);

const key = "smart-elearning.auth.user";

const getUserStorage = () => {
  const userStr = localStorage.getItem(key);
  if (!userStr || userStr === "undefined") return null;
  try {
    return JSON.parse(userStr);
  } catch (error) {
    console.error("Lỗi parse JSON từ localStorage:", error);
    return null;
  }
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(getUserStorage());
  const isAuthenticated = !!user;

  const updateUserInfo = async () => {
    const user = await getUserInfo();
    setUser(user);
    localStorage.setItem(key, JSON.stringify(user));
  };

  const login = async (accessToken: Token, refreshToken: Token) => {
    tokenStore.saveToken(accessToken, TokenType.ACCESS_TOKEN);
    tokenStore.saveToken(refreshToken, TokenType.REFRESH_TOKEN);
    await updateUserInfo();
  };

  const logout = async () => {
    setUser(null);
    localStorage.removeItem(key);
    await tokenStore.removeToken(TokenType.ACCESS_TOKEN);
    await tokenStore.removeToken(TokenType.REFRESH_TOKEN);
    window.location.reload();
  };

  return (
    <AuthContext.Provider
      value={{ user, login, logout, isAuthenticated, updateUserInfo }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within a AuthProvider");
  }
  return context;
}
