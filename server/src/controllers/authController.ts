import type { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import db from '../db/database.js';
import { envConfig } from '../config.js';

const JWT_SECRET = envConfig.jwtSecret;

const cookieConfig = {
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000,
    secure: false // true for production with HTTPS
};

export const toggleMode = async (req: Request, res: Response) => {
    try {
        const userId = req.user.id;
        const user: any = db.prepare('SELECT id, is_producer_mode, username FROM users WHERE id = ?').get(userId);
        if (!user) return res.status(404).json({ error: "User not found" });

        const newStatus = user.is_producer_mode ? 0 : 1;
        if (newStatus === 1) {
            db.prepare(`
                INSERT OR IGNORE INTO producer_profiles (user_id, workshop_name, bio) 
                VALUES (?, ?, ?)
            `).run(userId, `${user.username}'s Workshop`, null);
        }

        db.prepare('UPDATE users SET is_producer_mode = ? WHERE id = ?').run(newStatus, userId);

        const token = jwt.sign(
            {
                id: user.id,
                username: user.username,
                is_producer_mode: !!newStatus
            },
            JWT_SECRET,
            { expiresIn: '1d' }
        );

        res.cookie('token', token, cookieConfig);

        res.json({
            is_producer_mode: !!newStatus,
            user: {
                id: user.id,
                username: user.username,
                is_producer_mode: !!newStatus
            }
        });

    } catch (error: unknown) {
        console.error("ToggleMode Error:", error);
        res.status(500).json({ error: 'Failed to toggle mode.' });
    }
};


export const register = async (req: Request, res: Response) => {
    try {
        const { username, email, password } = req.body;
        if (!username || !email || !password) return res.status(400).json({ error: "Some fields are empty." });

        const hashedPassword = await bcrypt.hash(password, 10);
        try {
            db.exec("BEGIN TRANSACTION");

            const userStmt = db.prepare(`
                INSERT INTO users (username, email, password, is_producer_mode) 
                VALUES (?, ?, ?, 0)
            `);
            const result: any = userStmt.run(username, email, hashedPassword);
            const userId = result.lastInsertRowid;

            db.prepare(`
                INSERT INTO customer_profiles (user_id, bio) 
                VALUES (?, ?)
            `).run(userId, null);

            db.exec("COMMIT");
            res.status(201).json({ message: "User and customer profile successfully created!" });

        } catch (err) {
            db.exec("ROLLBACK");
            throw err;
        }

    } catch (error: any) {
        if (error.message.includes('UNIQUE constraint failed')) {
            return res.status(400).json({ error: "User with that email or username already exists." });
        }
        res.status(500).json({ error: "Server error in registration process." });
    }
};


export const login = async (req: Request, res: Response) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) return res.status(400).json({ error: "Enter your username and password." });

        const user: any = db.prepare('SELECT * FROM users WHERE username = ?').get(username);
        if (!user) return res.status(400).json({ error: "User not found." });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ error: "Incorrect password." });

        const token = jwt.sign(
            { id: user.id, is_producer_mode: !!user.is_producer_mode },
            JWT_SECRET,
            { expiresIn: '1d' }
        );

        res.cookie('token', token, cookieConfig);

        res.json({
            message: "Login is successful.",
            user: {
                id: user.id,
                username: user.username,
                is_producer_mode: !!user.is_producer_mode
            }
        });

    } catch (error) {
        res.status(500).json({ error: "Server error in login process." });
    }
};


export const logout = (req: Request, res: Response) => {
    res.clearCookie('token');
    res.json({ message: "Logout is successful." });
};


export const refresh = async (req: Request, res: Response) => {
    const token = req.cookies.token;
    if (!token) return res.status(401).json({ error: "Token is missing." });

    try {
        const decoded: any = jwt.verify(token, JWT_SECRET);
        const user: any = db.prepare('SELECT id, username, is_producer_mode FROM users WHERE id = ?').get(decoded.id);
        if (!user) throw new Error("User not found");

        const newToken = jwt.sign(
            { id: user.id, username: user.username, is_producer_mode: !!user.is_producer_mode },
            JWT_SECRET,
            { expiresIn: '1d' }
        );

        res.cookie('token', newToken, cookieConfig);

        res.json({
            user: {
                id: user.id,
                username: user.username,
                is_producer_mode: !!user.is_producer_mode
            }
        });

    } catch (error) {
        res.status(403).json({ error: "Invalid token." });
    }
};