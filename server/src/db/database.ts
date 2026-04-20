import { DatabaseSync } from 'node:sqlite';
import path from 'node:path';
import fs from 'node:fs';
import { envConfig } from '../config.js';

const dbFolder = path.resolve(import.meta.dirname, '../../database');
const dbPath = path.join(dbFolder, envConfig.dbPath);

if (!fs.existsSync(dbFolder)) fs.mkdirSync(dbFolder, { recursive: true });

const db = new DatabaseSync(dbPath);
export const initDB = () => {
    try {
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

        db.exec(`
            CREATE TABLE IF NOT EXISTS customer_profiles (
                user_id INTEGER PRIMARY KEY,
                bio TEXT,
                avatar_url TEXT,
                FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
            )
        `);

        db.exec(`
            CREATE TABLE IF NOT EXISTS producer_profiles (
                user_id INTEGER PRIMARY KEY,
                workshop_name TEXT,
                bio TEXT,
                payment_methods TEXT;
                avatar_url TEXT,
                FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
            )
        `);

        db.exec(`
            CREATE TABLE IF NOT EXISTS furniture (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                producer_id INTEGER NOT NULL,
                is_custom INTEGER DEFAULT 0,
                name TEXT NOT NULL,
                description TEXT,
                price REAL NOT NULL,
                category TEXT,
                image_url TEXT,
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (producer_id) REFERENCES producer_profiles(user_id) ON DELETE CASCADE
            )
        `);

        db.exec(`
            CREATE TABLE IF NOT EXISTS orders (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                customer_id INTEGER NOT NULL,
                producer_id INTEGER NOT NULL,
                furniture_id INTEGER NOT NULL,
                quantity INTEGER DEFAULT 1,
                price_at_order REAL NOT NULL,
                comment TEXT,
                phone TEXT NOT NULL,
                delivery_address TEXT NOT NULL,
                status TEXT DEFAULT 'pending', -- pending, accepted, rejected, payed, completed
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (customer_id) REFERENCES users(id) ON DELETE CASCADE,
                FOREIGN KEY (producer_id) REFERENCES producer_profiles(user_id) ON DELETE CASCADE,
                FOREIGN KEY (furniture_id) REFERENCES furniture(id) ON DELETE SET NULL
            )
        `);

        console.log('Database successfully initialized.');
    } catch (err: any) {
        console.error('Error initializing database:', err.message);
    }
};

export default db;