"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.clearTokens = exports.refreshTokens = exports.setTokens = exports.buildTokens = exports.verifyRefreshToken = exports.verifyAccessToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const token_payload_1 = require("../interfaces/token-payload");
var TokenExpiration;
(function (TokenExpiration) {
    TokenExpiration[TokenExpiration["Access"] = 300] = "Access";
    TokenExpiration[TokenExpiration["Refresh"] = 604800] = "Refresh";
    TokenExpiration[TokenExpiration["RefreshIfLessThan"] = 345600] = "RefreshIfLessThan";
})(TokenExpiration || (TokenExpiration = {}));
function signAccessToken(payload) {
    return jsonwebtoken_1.default.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: TokenExpiration.Access });
}
function signRefreshToken(payload) {
    return jsonwebtoken_1.default.sign(payload, process.env.REFRESH_TOKEN_SECRET, { expiresIn: TokenExpiration.Refresh });
}
const defaultCookieOptions = {
    httpOnly: true,
    path: '/',
};
const refreshTokenCookieOptions = {
    ...defaultCookieOptions,
    maxAge: TokenExpiration.Refresh * 1000,
};
const accessTokenCookieOptions = {
    ...defaultCookieOptions,
    maxAge: TokenExpiration.Access * 1000,
};
function verifyAccessToken(token) {
    return jsonwebtoken_1.default.verify(token, process.env.ACCESS_TOKEN_SECRET);
}
exports.verifyAccessToken = verifyAccessToken;
function verifyRefreshToken(token) {
    return jsonwebtoken_1.default.verify(token, process.env.REFRESH_TOKEN_SECRET);
}
exports.verifyRefreshToken = verifyRefreshToken;
function buildTokens(user) {
    const accessPayload = { userId: user.entityId };
    const refreshPayload = { userId: user.entityId, version: user.tokenVersion };
    const accessToken = signAccessToken(accessPayload);
    const refreshToken = refreshPayload && signRefreshToken(refreshPayload);
    return { accessToken, refreshToken };
}
exports.buildTokens = buildTokens;
function setTokens(res, access, refresh) {
    res.cookie(token_payload_1.Cookies.AccessToken, access, accessTokenCookieOptions);
    if (refresh)
        res.cookie(token_payload_1.Cookies.RefreshToken, refresh, refreshTokenCookieOptions);
}
exports.setTokens = setTokens;
function refreshTokens(current, tokenVersion) {
    if (tokenVersion !== current.version)
        throw 'Token revoked';
    const accessPayload = { userId: current.userId };
    let refreshPayload;
    const expiration = new Date(current.exp * 1000);
    const now = new Date();
    const secondsUntilExpiration = (expiration.getTime() - now.getTime()) / 1000;
    if (secondsUntilExpiration < TokenExpiration.RefreshIfLessThan) {
        refreshPayload = { userId: current.userId, version: tokenVersion };
    }
    const accessToken = signAccessToken(accessPayload);
    const refreshToken = refreshPayload && signRefreshToken(refreshPayload);
    return { accessToken, refreshToken };
}
exports.refreshTokens = refreshTokens;
function clearTokens(res) {
    res.cookie(token_payload_1.Cookies.AccessToken, '', { ...defaultCookieOptions, maxAge: 0 });
    res.cookie(token_payload_1.Cookies.RefreshToken, '', { ...defaultCookieOptions, maxAge: 0 });
}
exports.clearTokens = clearTokens;
//# sourceMappingURL=token.utils.js.map