import express, { type Application, type Request, type Response } from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';

import { initDB } from './db/database.js';
import authRoutes from './routes/authRoutes.js';
//import furnitureRoutes from './routes/furnitureRoutes.js';

dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 5000;

initDB();
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));

app.use('/api/auth', authRoutes);
//app.use('/api/furniture', furnitureRoutes);

app.get('/api', (req: Request, res: Response) => {
    res.send('RedS7 Server is running');
});


app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`);
});