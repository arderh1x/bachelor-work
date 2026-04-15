import type { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const verifyToken = (req: any, res: Response, next: NextFunction) => {
    // 1. Беремо токен з кук, які розпарсив cookie-parser
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ error: "Доступ заборонено. Ви не авторизовані." });
    }

    try {
        // 2. Перевіряємо підпис токена
        const decoded = jwt.verify(token, 'SUPER_SECRET_KEY');
        
        // 3. Додаємо дані користувача в об'єкт запиту, щоб контролери могли їх бачити
        req.user = decoded;
        
        // 4. Йдемо далі до контролера
        next();
    } catch (error) {
        res.status(403).json({ error: "Недійсний токен" });
    }
};