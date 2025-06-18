import { Request, Response, NextFunction } from 'express';
import { JWT_SECRET } from './config';
import jwt from 'jsonwebtoken';

// Extend Express Request type
declare global {
    namespace Express {
        interface Request {
            user?: string;
        }
    }
}

export const middleware = (req: Request, res: Response, next: NextFunction) => {
    // Check both Authorization header and cookies
    let token: string | undefined;
    
    // First, try to get token from Authorization header
    const authHeader = req.headers.authorization;
    
    
    token = authHeader as string;
    console.log('Token found:', authHeader);
    try {
        console.log('Verifying token:', token);
        const decoded = jwt.verify(token, JWT_SECRET) as any;
        req.user = decoded.userId;
        console.log('Token verified, user ID:', req.user);
        next();
    } catch (err) {
        res.status(401).json({ message: 'Unauthorized: Invalid token' });
        return
    }
};