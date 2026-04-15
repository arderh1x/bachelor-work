import type { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import db from '../db/database.js';

export const register = async (req: Request, res: Response) => {
    try {
        const { username, email, password, role } = req.body;

        // 1. Перевірка, чи не порожні дані
        if (!username || !email || !password) {
            return res.status(400).json({ error: "Усі поля обов'язкові" });
        }

        // 2. Хешування пароля (10 раундів — золотий стандарт)
        const hashedPassword = await bcrypt.hash(password, 10);

        // 3. Запис у базу даних за допомогою підготовленого запиту (захист від SQL-ін'єкцій)
        const query = db.prepare(`
            INSERT INTO users (username, email, password, role) 
            VALUES (?, ?, ?, ?)
        `);

        // Виконуємо запит
        query.run(username, email, hashedPassword, role || 'buyer');

        res.status(201).json({ message: "Користувача успішно зареєстровано" });
    } catch (error: any) {
        if (error.message.includes('UNIQUE constraint failed')) {
            return res.status(400).json({ error: "Користувач з таким email або логіном вже існує" });
        }
        res.status(500).json({ error: "Помилка сервера при реєстрації" });
    }
};


export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        // 1. Пошук користувача
        const query = db.prepare('SELECT * FROM users WHERE email = ?');
        const user: any = query.get(email);

        if (!user) {
            return res.status(400).json({ error: "Користувача не знайдено" });
        }

        // 2. Перевірка пароля
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: "Невірний пароль" });
        }

        // 3. Створення JWT (секретний ключ краще винести в .env, але поки напишемо так)
        const token = jwt.sign(
            { id: user.id, role: user.role },
            'SUPER_SECRET_KEY',
            { expiresIn: '1d' }
        );

        // 4. Відправка токена в HTTP-only куки (захист від XSS атак)
        res.cookie('token', token, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000 // 1 день
        });

        res.json({
            message: "Вхід успішний",
            user: { username: user.username, role: user.role }
        });

    } catch (error) {
        res.status(500).json({ error: "Помилка сервера при вході" });
    }
};


export const logout = (req: Request, res: Response) => {
    // Очищуємо куку 'token'
    res.clearCookie('token');
    res.json({ message: "Вихід успішний" });
};


export const refresh = async (req: Request, res: Response) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ error: "Токен відсутній" });
    }

    try {
        // Перевіряємо старий токен
        const decoded: any = jwt.verify(token, 'SUPER_SECRET_KEY');

        // Створюємо новий токен з тими ж даними
        const newToken = jwt.sign(
            { id: decoded.id, role: decoded.role },
            'SUPER_SECRET_KEY',
            { expiresIn: '1d' }
        );

        // Перезаписуємо куку
        res.cookie('token', newToken, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000
        });

        res.json({ user: { id: decoded.id, role: decoded.role } });
    } catch (error) {
        res.status(403).json({ error: "Недійсний токен" });
    }
};