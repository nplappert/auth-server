"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_1 = __importDefault(require("./auth"));
const routes = (0, express_1.Router)();
routes.use('/api/auth', auth_1.default);
routes.use('/', (_req, res) => {
    res.status(200).json({
        status: 'OK',
        name: 'Authentication server',
        version: '1.0.0'
    });
});
exports.default = routes;
//# sourceMappingURL=index.js.map