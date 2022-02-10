"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = __importDefault(require("../controllers/auth.controller"));
const authRouter = (0, express_1.Router)();
authRouter.post('/register', auth_controller_1.default.register);
authRouter.post('/login', auth_controller_1.default.login);
authRouter.post('/logout', auth_controller_1.default.logout);
authRouter.post('/logout-all', auth_controller_1.default.logoutAll);
authRouter.post('/refresh', auth_controller_1.default.refresh);
authRouter.get('/me', auth_controller_1.default.me);
exports.default = authRouter;
//# sourceMappingURL=auth.js.map