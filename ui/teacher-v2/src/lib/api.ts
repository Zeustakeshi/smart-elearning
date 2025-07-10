import { ERROR_MESSAGES } from "@/common/constants/error";
import { TokenType } from "@/common/enums/TokenType";
import * as tokenStore from "@/lib/tokenStore";
import axios from "axios";
import { refreshToken } from "./refreshToken";

export const api = axios.create({
    baseURL: import.meta.env.VITE_BASE_API_URL,
    withCredentials: false,
});

api.interceptors.request.use(async (request) => {
    const accessToken = await tokenStore.getTokenValue(TokenType.ACCESS_TOKEN);
    if (accessToken) {
        request.headers.Authorization = `Bearer ${accessToken}`;
    }
    return request;
});

api.interceptors.response.use(
    (response) => response.data.data,
    async (error) => {
        if (error.request.status === 401) {
            await refreshToken();
            const accessToken = await tokenStore.getTokenValue(
                TokenType.ACCESS_TOKEN
            );
            if (accessToken) return api(error.config);
        }

        if (error?.response?.data?.errors) {
            return Promise.reject(
                ERROR_MESSAGES[Number(error?.response?.data?.code ?? 9999)]
            );
        } else {
            return Promise.reject(error);
        }
    }
);
