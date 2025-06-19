"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.middleware = void 0;
const config_1 = require("./config");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const middleware = (req, res, next) => {
    // Debug: Log all headers to see what's being received
    console.log('All headers:', req.headers);
    console.log('Authorization header specifically:', req.headers.authorization);
    // Check both Authorization header and cookies
    const authHeader = req.headers.authorization;
    let token;
    // Extract token from Authorization header
    if (authHeader) {
        // Check if it follows "Bearer <token>" format
        if (authHeader.startsWith('Bearer ')) {
            token = authHeader.substring(7); // Remove "Bearer " prefix
        }
        else {
            // Assume the entire header is the token
            token = authHeader;
        }
    }
    // Also check other possible header names (case variations)
    if (!token) {
        const altHeaders = ['authorization', 'Authorization', 'x-auth-token', 'x-access-token'];
        for (const headerName of altHeaders) {
            const headerValue = req.headers[headerName];
            if (headerValue) {
                console.log(`Found token in ${headerName}:`, headerValue);
                token = headerValue.startsWith('Bearer ') ? headerValue.substring(7) : headerValue;
                break;
            }
        }
    }
    // If no token found in Authorization header, you could also check cookies
    // if (!token && req.cookies?.token) {
    //     token = req.cookies.token;
    // }
    if (!token) {
        console.log('No token found in request');
        res.status(401).json({ message: 'Unauthorized: No token provided' });
        return;
    }
    console.log('Token found:', token);
    try {
        console.log('Verifying token:', token);
        console.log('JWT_SECRET exists:', !!config_1.JWT_SECRET);
        console.log('JWT_SECRET length:', config_1.JWT_SECRET === null || config_1.JWT_SECRET === void 0 ? void 0 : config_1.JWT_SECRET.length);
        const decoded = jsonwebtoken_1.default.verify(token, config_1.JWT_SECRET);
        console.log('Decoded token:', decoded);
        req.user = decoded.userId;
        console.log('Token verified, user ID:', req.user);
        next();
    }
    catch (err) {
        console.log('Token verification failed:', err);
        if (err && typeof err === 'object' && 'name' in err && 'message' in err) {
            const errorObj = err;
            console.log('Error name:', errorObj.name);
            console.log('Error message:', errorObj.message);
            if (errorObj.name === 'TokenExpiredError') {
                res.status(401).json({ message: 'Unauthorized: Token expired' });
            }
            else if (errorObj.name === 'JsonWebTokenError') {
                res.status(401).json({ message: 'Unauthorized: Invalid token' });
            }
            else {
                console.log('Unexpected error in JWT verification:', err);
                res.status(500).json({ message: 'Internal server error in authentication' });
            }
        }
        else {
            res.status(500).json({ message: 'Internal server error in authentication' });
        }
        return;
    }
};
exports.middleware = middleware;
