import express, { type Application, type Request, type Response } from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';

import { initDB } from './db/database.js';
import authRoutes from './routes/authRoutes.js';

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 5000;

initDB();

// Middleware згідно з ТЗ
app.use(express.json()); // Обробка JSON
app.use(cookieParser()); // Робота з сесіями (cookies) 
app.use(cors({ origin: 'http://localhost:5173', credentials: true })); // Зв'язок з Vite

// Маршрути
app.use('/api/auth', authRoutes);

// Базовий роут для перевірки
app.get('/api', (req: Request, res: Response) => {
    res.send('RedS7 Server is running');
});


app.listen(PORT, () => {
    console.log(`Сервер запущено на http://localhost:${PORT}`);
});