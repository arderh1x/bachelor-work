import dotenv from 'dotenv';
dotenv.config();

export const envConfig = {
    jwtSecret: process.env.JWT_SECRET || 'default_fallback_secret',
    port: process.env.PORT || 5000,
    dbPath: process.env.DB_PATH || "reds7.sqlite",
    frontendUrl: process.env.FRONTEND_URL || "http://localhost:5173",
};