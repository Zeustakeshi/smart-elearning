import type { Token } from "@/common/types/auth.type";

export type TokenPairResponse = {
    accessToken: Token;
    refreshToken: Token;
};
