import { api } from "@/lib/api";
import type { User } from "./response/user.type";

export const getUserInfo = async (): Promise<User> => {
    return await api.get("/account/me");
};
