import { DatabaseSync } from 'node:sqlite';
import path from 'node:path';
import fs from 'node:fs';

// 1. Визначаємо шлях (використовуємо 2 переходи вгору, щоб папка була в server/database)
const dbFolder = path.resolve(import.meta.dirname, '../../database');
const dbPath = path.join(dbFolder, 'reds7.sqlite');

// 2. Гарантуємо існування папки (щоб не було SQLITE_CANTOPEN)
if (!fs.existsSync(dbFolder)) {
    fs.mkdirSync(dbFolder, { recursive: true });
}

// 3. Створюємо екземпляр бази (це автоматично відкриває підключення)
const db = new DatabaseSync(dbPath);

export const initDB = () => {
    try {
        // У node:sqlite не потрібен db.serialize(), запити йдуть один за одним синхронно
        
        // Таблиця користувачів
        db.exec(`
            CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                username TEXT UNIQUE NOT NULL,
                email TEXT UNIQUE NOT NULL,
                password TEXT NOT NULL,
                role TEXT DEFAULT 'buyer',
                created_at DATETIME DEFAULT CURRENT_TIMESTAMP
            )
        `);

        // Таблиця товарів (меблі)
        db.exec(`
            CREATE TABLE IF NOT EXISTS furniture (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                owner_id INTEGER,
                title TEXT NOT NULL,
                description TEXT,
                price REAL NOT NULL,
                FOREIGN KEY (owner_id) REFERENCES users(id)
            )
        `);

        console.log('✅ База даних SQLite (node:sqlite) успішно ініціалізована.');
    } catch (err: any) {
        console.error('❌ Помилка ініціалізації БД:', err.message);
    }
};

export default db;