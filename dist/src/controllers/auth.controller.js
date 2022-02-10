"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_service_1 = __importDefault(require("../services/user.service"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const token_utils_1 = require("../utils/token.utils");
const token_payload_1 = require("../interfaces/token-payload");
exports.default = new class AuthController {
    async register(req, res) {
        try {
            const { email, password } = req.body;
            // Validate if user already exists
            const user = await user_service_1.default.getUserByEmail(email);
            if (user) {
                return res.status(400).json({
                    errors: "This user already exits",
                });
            }
            // Create user
            const hashedPassword = await bcrypt_1.default.hash(password, 10);
            const userId = await user_service_1.default.createUser(email, hashedPassword);
            res.json({ Id: userId });
        }
        catch (error) {
            res.status(400).send({ error: error });
        }
    }
    async login(req, res) {
        const { email, password } = req.body;
        const user = await user_service_1.default.getUserByEmail(email);
        let isMatch = false;
        if (user) {
            isMatch = await bcrypt_1.default.compare(password, user.password);
        }
        if (!isMatch) {
            res.status(400).json({
                msg: "Invalid credentials",
            });
        }
        res.status(200).json({
            msg: "User logged in"
        });
    }
    async logout(_req, res) {
        (0, token_utils_1.clearTokens)(res);
        res.end();
    }
    async logoutAll(_req, res) {
        await increaseTokenVersion(res.locals.token.userId);
        (0, token_utils_1.clearTokens)(res);
        res.end();
    }
    async refresh(req, res) {
        try {
            const current = (0, token_utils_1.verifyRefreshToken)(req.cookies[token_payload_1.Cookies.RefreshToken]);
            const user = await user_service_1.default.getUserById(current.userId);
            if (!user)
                throw 'User not found';
            const { accessToken, refreshToken } = (0, token_utils_1.refreshTokens)(current, user.tokenVersion);
            (0, token_utils_1.setTokens)(res, accessToken, refreshToken);
        }
        catch (error) {
            (0, token_utils_1.clearTokens)(res);
        }
        res.end();
    }
    async me(_req, res) {
        const user = await user_service_1.default.getUserById(res.locals.token.userId);
        res.json(user);
    }
};
function increaseTokenVersion(userId) {
    throw new Error("Function not implemented.");
}
//# sourceMappingURL=auth.controller.js.map