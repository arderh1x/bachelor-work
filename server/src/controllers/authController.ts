import type { Request, Response } from 'express';
import bcrypt from 'bcrypt';
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