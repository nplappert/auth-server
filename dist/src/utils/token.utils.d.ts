import { Response } from "express";
import { AccessToken, RefreshToken } from "../interfaces/token-payload";
import { User } from "../models/user.model";
export declare function verifyAccessToken(token: string): AccessToken;
export declare function verifyRefreshToken(token: string): RefreshToken;
export declare function buildTokens(user: User): {
    accessToken: string;
    refreshToken: string;
};
export declare function setTokens(res: Response, access: string, refresh?: string): void;
export declare function refreshTokens(current: RefreshToken, tokenVersion: number): {
    accessToken: string;
    refreshToken: string | undefined;
};
export declare function clearTokens(res: Response): void;
