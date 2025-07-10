import { api } from "@/lib/api";
import type {
    CreateAccountValueType,
    LoginValueType,
} from "../schemas/auth.schema";
import type { TokenPairResponse } from "./response/token.type";

export const createAccount = async (
    data: CreateAccountValueType
): Promise<TokenPairResponse> => {
    return await api.post("/auth/register", {
        ...data,
        accountType: "TEACHER",
    });
};

export const login = async (
    data: LoginValueType
): Promise<TokenPairResponse> => {
    return await api.post("/auth/login", {
        ...data,
    });
};
