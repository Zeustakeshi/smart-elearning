import { TokenType } from "@/common/enums/TokenType";
import * as tokenStore from "@/lib/tokenStore";
import axios from "axios";

export const refreshToken = async () => {
    const refreshToken = await tokenStore.getTokenValue(
        TokenType.REFRESH_TOKEN
    );

    try {
        if (!refreshToken) {
            throw new Error("Invalid refresh token");
        }

        const { data }: any = await axios({
            method: "POST",
            url: `${import.meta.env.VITE_BASE_API_URL}/auth/token/refresh`,
            data: {
                refreshToken: refreshToken,
            },
        });
        const tokens = data.data;
        await tokenStore.saveToken(tokens.accessToken, TokenType.ACCESS_TOKEN);
        await tokenStore.saveToken(
            tokens.refreshToken,
            TokenType.REFRESH_TOKEN
        );
    } catch (error) {
        console.log("Refresh token error " + error);
        localStorage.clear();
        sessionStorage.clear();
        tokenStore.removeToken(TokenType.ACCESS_TOKEN);
        tokenStore.removeToken(TokenType.REFRESH_TOKEN);
        window.location.href = "/auth/login";
    }
};
