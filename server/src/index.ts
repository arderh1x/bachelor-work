import express, { type Application, type Request, type Response } from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';

import { initDB } from './db/database.js';
import { envConfig } from './config.js';
import authRoutes from './routes/authRoutes.js';
import profilesRoutes from './routes/profilesRoutes.js';
import furnitureRoutes from './routes/furnitureRoutes.js';
import ordersRoutes from './routes/ordersRoutes.js';

const app: Application = express();
const PORT = envConfig.port;

initDB();
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));

app.use('/api/auth', authRoutes);
app.use('/api/profiles', profilesRoutes);
app.use('/api/furniture', furnitureRoutes);
app.use('/api/orders', ordersRoutes);

app.get('/api', (req: Request, res: Response) => {
    res.send('RedS7 Server is running');
});


app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`);
});