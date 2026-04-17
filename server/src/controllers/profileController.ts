import type { Request, Response } from 'express';
import db from '../db/database.js';

export const getAllProducers = (req: Request, res: Response) => {
    try {
        const producers = db.prepare(`
            SELECT user_id, workshop_name, bio, avatar_url 
            FROM producer_profiles
        `).all();

        res.json(producers);
    } catch (error) {
        console.error('Error fetching producers:', error);
        res.status(500).json({ error: "Error getting list of producers" });
    }
};

export const getProducerById = (req: Request, res: Response) => {
    const { id } = req.params;
    if (!id) return res.status(400).json({ error: "ID is required" });

    try {
        const producer: any = db.prepare(`
            SELECT user_id, workshop_name, bio, avatar_url 
            FROM producer_profiles 
            WHERE user_id = ?
        `).get(Number(id));

        if (!producer) return res.status(404).json({ error: "Producer not found." });
        res.json(producer);

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error." });
    }
};