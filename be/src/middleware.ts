import { Request, Response, NextFunction } from 'express';
import { JWT_SECRET } from './config';
import jwt from 'jsonwebtoken';
import cookieParser from 'cookie-parser';
import express from 'express';
const app = express();

app.use(cookieParser());
export const middleware  = (req : Request, res : Response, next : NextFunction) => {
    const token = req.cookies.token;
    const user = jwt.verify(token as string ,JWT_SECRET);
    if(!user) {
        res.status(401).json({ message: 'Unauthorized' });
        return;
    }


    // @ts-ignore
    req.user = user.userId;
    next();
};