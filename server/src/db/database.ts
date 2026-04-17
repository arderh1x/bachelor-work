import { DatabaseSync } from 'node:sqlite';
import path from 'node:path';
import fs from 'node:fs';

const dbFolder = path.resolve(import.meta.dirname, '../../database');
const dbPath = path.join(dbFolder, 'reds7.sqlite');

if (!fs.existsSync(dbFolder)) {
    fs.mkdirSync(dbFolder, { recursive: true });
}
const db = new DatabaseSync(dbPath);

export const initDB = () => {
    try {
        // 1. Основна таблиця аккаунтів
        db.exec(`
            CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                username TEXT UNIQUE NOT NULL,
                email TEXT UNIQUE NOT NULL,
                password TEXT NOT NULL,
                is_producer_mode INTEGER DEFAULT 0,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP
            )
        `);

        // 2. Профіль замовника (для форуму)
        db.exec(`
            CREATE TABLE IF NOT EXISTS customer_profiles (
                user_id INTEGER PRIMARY KEY,
                bio TEXT,
                avatar_url TEXT,
                FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
            )
        `);

        // 3. Профіль виробника (для магазину)
        db.exec(`
            CREATE TABLE IF NOT EXISTS producer_profiles (
                user_id INTEGER PRIMARY KEY,
                workshop_name TEXT,
                bio TEXT,
                specialty TEXT,
                FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
            )
        `);

        // 4. Таблиця товарів (посилається на профіль виробника)
        db.exec(`
            CREATE TABLE IF NOT EXISTS furniture (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                producer_id INTEGER,
                name TEXT NOT NULL,
                description TEXT,
                price REAL NOT NULL,
                category TEXT,
                image_url TEXT,
                FOREIGN KEY (producer_id) REFERENCES producer_profiles(user_id) ON DELETE CASCADE
            )
        `);

        // 5. Таблиця запитів на форумі (посилається на профіль замовника)
        db.exec(`
            CREATE TABLE IF NOT EXISTS forum_requests (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                customer_id INTEGER,
                title TEXT NOT NULL,
                description TEXT NOT NULL,
                budget REAL,
                status TEXT DEFAULT 'open',
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (customer_id) REFERENCES customer_profiles(user_id) ON DELETE CASCADE
            )
        `);

        console.log('Database successfully initialized.');
    } catch (err: any) {
        console.error('Error initializing database:', err.message);
    }
};

export default db;