import type { RequestHandler } from 'express';
import jwt from 'jsonwebtoken';
import { envConfig } from '../config.js';

const JWT_SECRET = envConfig.jwtSecret;

export const verifyToken: RequestHandler = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ error: "Access denied - No token provided." });

    try {
        const decoded = jwt.verify(token, JWT_SECRET) as any;
        req.user = {
            id: decoded.id,
            username: decoded.username,
            is_producer_mode: !!decoded.is_producer_mode
        };

        next();
    } catch (error) {
        console.error('[AuthMiddleware: verifyToken] Invalid token:', error);
        res.status(403).json({ error: "Invalid or expired token." });
    }
};


export const verifyProducer: RequestHandler = (req, res, next) => {
    if (!req.user?.is_producer_mode) {
        return res.status(403).json({ error: "Access denied - Producer mode required." });
    }
    next();
};