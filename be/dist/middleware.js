"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.middleware = void 0;
const config_1 = require("./config");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const middleware = (req, res, next) => {
    // Check both Authorization header and cookies
    let token;
    // First, try to get token from Authorization header
    const authHeader = req.headers.authorization;
    token = authHeader;
    console.log('Token found:', authHeader);
    try {
        console.log('Verifying token:', token);
        const decoded = jsonwebtoken_1.default.verify(token, config_1.JWT_SECRET);
        req.user = decoded.userId;
        console.log('Token verified, user ID:', req.user);
        next();
    }
    catch (err) {
        res.status(401).json({ message: 'Unauthorized: Invalid token' });
        return;
    }
};
exports.middleware = middleware;
