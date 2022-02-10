"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const token_payload_1 = require("../interfaces/token-payload");
const token_utils_1 = require("../utils/token.utils");
function authMiddleware(req, res, next) {
    const token = (0, token_utils_1.verifyAccessToken)(req.cookies[token_payload_1.Cookies.AccessToken]);
    if (!token) {
        res.status(401);
        return next(new Error('Not Signed in'));
    }
    res.locals.token = token;
    next();
}
exports.authMiddleware = authMiddleware;
//# sourceMappingURL=auth-middleware.js.map