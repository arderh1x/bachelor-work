import type { RequestHandler } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { UserModel } from '../models/userModel.js';
import { envConfig } from '../config.js';

const JWT_SECRET = envConfig.jwtSecret;

const cookieConfig = {
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000,
    secure: process.env.NODE_ENV === 'production'
};

const generateToken = (payload: object) => {
    return jwt.sign(payload, JWT_SECRET, { expiresIn: '1d' });
};

export const register: RequestHandler = async (req, res) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
        return res.status(400).json({ error: "All fields are required." });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        UserModel.create(username, email, hashedPassword);

        res.status(201).json({ message: "User registered successfully!" });
    } catch (error: any) {
        console.error("[AuthController: register] Error:", error);
        if (error.message?.includes('UNIQUE constraint failed')) {
            return res.status(400).json({ error: "Username or email already exists." });
        }
        res.status(500).json({ error: "Internal server error during registration." });
    }
};

export const login: RequestHandler = async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = UserModel.findByUsername(username);
        if (!user) return res.status(400).json({ error: "Invalid credentials." });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ error: "Invalid credentials." });

        const isProducer = !!user.is_producer_mode;
        const token = generateToken({ id: user.id, username: user.username, is_producer_mode: isProducer });

        res.cookie('token', token, cookieConfig);
        res.json({
            message: "Login successful.",
            user: { id: user.id, username: user.username, is_producer_mode: isProducer }
        });
    } catch (error) {
        console.error("[AuthController: login] Error:", error);
        res.status(500).json({ error: "Internal server error during login." });
    }
};

export const toggleMode: RequestHandler = async (req, res) => {
    try {
        const userId = req.user.id;
        const user = UserModel.findById(userId);
        if (!user) return res.status(404).json({ error: "User not found." });

        const newStatus = user.is_producer_mode ? 0 : 1;

        if (newStatus === 1) {
            UserModel.ensureProducerProfile(userId, user.username);
        }

        UserModel.updateMode(userId, newStatus);

        const token = generateToken({
            id: user.id,
            username: user.username,
            is_producer_mode: !!newStatus
        });

        res.cookie('token', token, cookieConfig);
        res.json({
            is_producer_mode: !!newStatus,
            user: { id: user.id, username: user.username, is_producer_mode: !!newStatus }
        });
    } catch (error) {
        console.error("[AuthController: toggleMode] Error:", error);
        res.status(500).json({ error: "Internal server error while toggling mode." });
    }
};

export const refresh: RequestHandler = async (req, res) => {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ error: "Session expired." });

    try {
        const decoded = jwt.verify(token, JWT_SECRET) as any;
        const user = UserModel.findById(decoded.id);
        if (!user) return res.status(404).json({ error: "User not found." });

        const isProducer = !!user.is_producer_mode;
        const newToken = generateToken({ id: user.id, username: user.username, is_producer_mode: isProducer });

        res.cookie('token', newToken, cookieConfig);
        res.json({
            user: { id: user.id, username: user.username, is_producer_mode: isProducer }
        });
    } catch (error) {
        res.status(403).json({ error: "Invalid session." });
    }
};

export const logout: RequestHandler = (req, res) => {
    res.clearCookie('token');
    res.json({ message: "Logged out successfully." });
};