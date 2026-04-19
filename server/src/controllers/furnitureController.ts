import db from '../db/database.js';
import type { RequestHandler } from 'express';
import type { CreateFurnitureDTO } from '@shared/types.js';

export const createFurniture: RequestHandler<{}, any, CreateFurnitureDTO> = (req, res) => {
    const { name, category, price, description } = req.body;
    const producer_id = req.user.id;

    try {
        const stmt = db.prepare(`
            INSERT INTO furniture (producer_id, name, category, price, description)
            VALUES (?, ?, ?, ?, ?)
        `);

        const result = stmt.run(producer_id, name, category, Number(price), description ?? null);

        res.status(201).json({
            id: result.lastInsertRowid,
            message: 'Furniture successfully created!'
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error on creating furniture.' });
    }
};


export const getFurnitureList: RequestHandler = (req, res) => {
    const targetProducerId = req.params.producerId
        ? Number(req.params.producerId)
        : req.user?.id;

    if (!targetProducerId) return res.status(400).json({ error: 'Producer ID is required.' });

    try {
        const items = db.prepare(`SELECT * FROM furniture WHERE producer_id = ? ORDER BY created_at DESC`)
            .all(targetProducerId);
        res.json(items);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error on getting furniture list.' });
    }
};


export const deleteFurniture: RequestHandler<{ id: string }> = (req, res) => {
    const { id } = req.params;
    const producer_id = req.user.id;

    try {
        const result = db.prepare('DELETE FROM furniture WHERE id = ? AND producer_id = ?')
            .run(Number(id), producer_id);

        if (result.changes === 0) {
            res.status(404).json({ error: 'Product not found or access denied.' });
            return;
        }

        res.sendStatus(204);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error on deleting furniture.' });
    }
};


export const updateFurniture: RequestHandler<{ id: string }> = (req, res) => {
    const { id } = req.params;
    const { name, price, category, description, image_url } = req.body;
    const producer_id = req.user.id;

    try {
        const result = db.prepare(`
            UPDATE furniture 
            SET name = ?, price = ?, category = ?, description = ?, image_url = ?
            WHERE id = ? AND producer_id = ?
        `).run(name, price, category, description, image_url, Number(id), producer_id);

        if (result.changes === 0) {
            res.status(404).json({ error: 'Product not found or access denied.' });
            return;
        }

        res.json({ message: 'Product updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error on updating furniture.' });
    }
};