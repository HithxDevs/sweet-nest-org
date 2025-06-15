"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.middleware = void 0;
const config_1 = require("./config");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
app.use((0, cookie_parser_1.default)());
const middleware = (req, res, next) => {
    const token = req.cookies.token;
    const user = jsonwebtoken_1.default.verify(token, config_1.JWT_SECRET);
    if (!user) {
        res.status(401).json({ message: 'Unauthorized' });
        return;
    }
    // @ts-ignore
    req.user = user.userId;
    next();
};
exports.middleware = middleware;
