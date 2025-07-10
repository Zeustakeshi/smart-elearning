import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from "@/common/constants/token";
import { TokenType } from "@/common/enums/TokenType";
import type { Token } from "@/common/types/auth.type";
import Cookies from "js-cookie";

export const getTokenKey = (type: TokenType) => {
    return type === TokenType.ACCESS_TOKEN
        ? ACCESS_TOKEN_KEY
        : REFRESH_TOKEN_KEY;
};

export const saveToken = async (token: Token, type: TokenType) => {
    const key = getTokenKey(type);

    try {
        const expiryDate = new Date(token.expiredTime);
        Cookies.set(key, token.content, {
            expires: expiryDate,
        });
    } catch (error) {
        console.error("Save token error", error);
    }
};

export const getTokenValue = async (type: TokenType) => {
    try {
        return Cookies.get(getTokenKey(type));
    } catch (error) {
        console.error("Error retrieving token", error);
        return null;
    }
};

export const removeToken = async (type: TokenType) => {
    try {
        Cookies.remove(getTokenKey(type));
    } catch (error) {
        console.error("Error removing token", error);
    }
};
