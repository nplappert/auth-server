import { CookieOptions, Response } from "express";
import jwt from "jsonwebtoken";
import { AccessToken, AccessTokenPayload, Cookies, RefreshToken, RefreshTokenPayload } from "../interfaces/token-payload";
import { User } from "../models/user.model";

enum TokenExpiration {
    Access = 5 * 60,
    Refresh = 7 * 24 * 60 * 60,
    RefreshIfLessThan = 4 * 24 * 60 * 60,
}

function signAccessToken(payload: AccessTokenPayload) {
    return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET!, { expiresIn: TokenExpiration.Access });
}

function signRefreshToken(payload: RefreshTokenPayload) {
    return jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET!, { expiresIn: TokenExpiration.Refresh });
}

const defaultCookieOptions: CookieOptions = {
    httpOnly: true,
    path: '/',
}
  
const refreshTokenCookieOptions: CookieOptions = {
    ...defaultCookieOptions,
    maxAge: TokenExpiration.Refresh * 1000,
}

const accessTokenCookieOptions: CookieOptions = {
    ...defaultCookieOptions,
    maxAge: TokenExpiration.Access * 1000,
}

export function verifyAccessToken(token: string) {
    return jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!) as AccessToken;
}
  
export function verifyRefreshToken(token: string) {
    return jwt.verify(token, process.env.REFRESH_TOKEN_SECRET!) as RefreshToken;
}
  

export function buildTokens(user: User) {
    const accessPayload: AccessTokenPayload = { userId: user.entityId };
    const refreshPayload: RefreshTokenPayload = { userId: user.entityId, version: user.tokenVersion };

    const accessToken = signAccessToken(accessPayload);
    const refreshToken = refreshPayload && signRefreshToken(refreshPayload);

    return { accessToken, refreshToken }
}

export function setTokens(res: Response, access: string, refresh?: string) {
    res.cookie(Cookies.AccessToken, access, accessTokenCookieOptions);
    if (refresh) res.cookie(Cookies.RefreshToken, refresh, refreshTokenCookieOptions);
}

export function refreshTokens(current: RefreshToken, tokenVersion: number) {
    if (tokenVersion !== current.version) throw 'Token revoked';

    const accessPayload: AccessTokenPayload = { userId: current.userId };
    let refreshPayload: RefreshTokenPayload | undefined;

    const expiration = new Date(current.exp * 1000);
    const now = new Date();
    const secondsUntilExpiration = (expiration.getTime() - now.getTime()) / 1000;

    if (secondsUntilExpiration < TokenExpiration.RefreshIfLessThan) {
        refreshPayload = { userId: current.userId, version: tokenVersion };
    }

    const accessToken = signAccessToken(accessPayload);
    const refreshToken = refreshPayload && signRefreshToken(refreshPayload);

    return {accessToken, refreshToken}
}

export function clearTokens(res: Response) {
    res.cookie(Cookies.AccessToken, '', { ...defaultCookieOptions, maxAge: 0 });
    res.cookie(Cookies.RefreshToken, '', { ...defaultCookieOptions, maxAge: 0 });
}