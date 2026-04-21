import db from '../db/database.js';

export const UserModel = {
    findById(id: number) {
        return db.prepare('SELECT * FROM users WHERE id = ?').get(id) as any | undefined;
    },

    findByUsername(username: string) {
        return db.prepare('SELECT * FROM users WHERE username = ?').get(username) as any | undefined;
    },

    create(username: string, email: string, passwordHash: string) {
        try {
            db.exec("BEGIN TRANSACTION");

            const userStmt = db.prepare(`
                INSERT INTO users (username, email, password, is_producer_mode) 
                VALUES (?, ?, ?, 0)
            `);
            const result = userStmt.run(username, email, passwordHash);
            const userId = result.lastInsertRowid as number;

            db.prepare('INSERT INTO customer_profiles (user_id, bio) VALUES (?, ?)').run(userId, null);

            db.exec("COMMIT");
            return userId;
        } catch (error) {
            db.exec("ROLLBACK");
            throw error;
        }
    },

    updateMode(userId: number, isProducerMode: number) {
        return db.prepare('UPDATE users SET is_producer_mode = ? WHERE id = ?').run(isProducerMode, userId);
    },

    ensureProducerProfile(userId: number, username: string) {
        return db.prepare(`
            INSERT OR IGNORE INTO producer_profiles (user_id, workshop_name, bio) 
            VALUES (?, ?, ?)
        `).run(userId, `${username}'s Workshop`, null);
    }
};