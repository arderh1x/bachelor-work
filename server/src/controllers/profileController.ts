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


export const getMyProfile = (req: Request, res: Response) => {
    try {
        const userId = req.user.id;
        const isProducer = req.user.is_producer_mode;

        let profile;
        if (isProducer) profile = db.prepare('SELECT workshop_name, bio, avatar_url FROM producer_profiles WHERE user_id = ?')
            .get(userId);
        else profile = db.prepare('SELECT bio, avatar_url FROM customer_profiles WHERE user_id = ?')
            .get(userId);

        if (!profile) return res.status(404).json({ error: "Profile not found" });

        res.json(profile);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to fetch profile" });
    }
};


export const updateProfile = (req: Request, res: Response) => {
    const userId = req.user.id;
    const { workshop_name, bio, avatar_url } = req.body;

    const user = db.prepare('SELECT is_producer_mode FROM users WHERE id = ?').get(userId);
    if (!user) return res.status(404).json({ error: 'User not found.' });

    if (user.is_producer_mode) {
        db.prepare(`
            UPDATE producer_profiles 
            SET workshop_name = ?, bio = ?, avatar_url = ? 
            WHERE user_id = ?
        `).run(workshop_name, bio, avatar_url, userId);
    } else {
        db.prepare(`
            UPDATE customer_profiles 
            SET bio = ?, avatar_url = ? 
            WHERE user_id = ?
        `).run(bio, avatar_url, userId);
    }

    res.json({ message: "Profile successfully updated!" });
};