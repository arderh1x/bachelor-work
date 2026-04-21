import db from '../db/database.js';
import type { Furniture, CreateFurnitureDTO } from '@shared/types.js';

export const FurnitureModel = {
    create(producerId: number, data: CreateFurnitureDTO, isCustom: number = 0) {
        const stmt = db.prepare(`
            INSERT INTO furniture (producer_id, name, category, price, description, image_url, is_custom)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        `);

        const result = stmt.run(
            producerId,
            data.name,
            data.category,
            Number(data.price),
            data.description ?? null,
            data.image_url ?? null,
            isCustom
        );

        return result.lastInsertRowid;
    },

    getByProducer(producerId: number) {
        const rows = db.prepare(`
            SELECT * FROM furniture 
            WHERE producer_id = ? AND is_custom = 0 
            ORDER BY created_at DESC
        `).all(producerId);

        return rows as unknown as Furniture[];
    },

    getById(id: number) {
        const row = db.prepare('SELECT * FROM furniture WHERE id = ?').get(id);
        return row as unknown as Furniture | undefined;
    },

    update(id: number, producerId: number, data: Partial<CreateFurnitureDTO>) {
        const stmt = db.prepare(`
            UPDATE furniture 
            SET name = ?, price = ?, category = ?, description = ?, image_url = ?
            WHERE id = ? AND producer_id = ?
        `);

        return stmt.run(
            data.name ?? null,
            data.price ? Number(data.price) : null,
            data.category ?? null,
            data.description ?? null,
            data.image_url ?? null,
            id,
            producerId
        );
    },

    delete(id: number, producerId: number) {
        return db.prepare('DELETE FROM furniture WHERE id = ? AND producer_id = ?')
            .run(id, producerId);
    }
};