import type { RequestHandler } from 'express';
import { ProfileModel } from '../models/profileModel.js';

export const getAllProducers: RequestHandler = (req, res) => {
    try {
        const producers = ProfileModel.getAllProducers();
        res.json(producers);
    } catch (error) {
        console.error('[ProfilesController: getAllProducers] Error:', error);
        res.status(500).json({ error: "Internal server error while fetching producers list." });
    }
};

export const getProducerById: RequestHandler<{ id: string }> = (req, res) => {
    const { id } = req.params;
    if (!id) return res.status(400).json({ error: "Producer ID is required." });

    try {
        const producer = ProfileModel.getProducerById(Number(id));
        if (!producer) {
            return res.status(404).json({ error: "Producer not found." });
        }
        res.json(producer);
    } catch (error) {
        console.error('[ProfilesController: getProducerById] Error:', error);
        res.status(500).json({ error: "Internal server error while fetching producer profile." });
    }
};

export const getMyProfile: RequestHandler = (req, res) => {
    try {
        const userId = req.user.id;
        const isProducer = req.user.is_producer_mode;

        const profile = isProducer
            ? ProfileModel.getProducerById(userId)
            : ProfileModel.getCustomerById(userId);

        if (!profile) {
            return res.status(404).json({ error: "Profile not found." });
        }

        res.json(profile);
    } catch (error) {
        console.error('[ProfilesController: getMyProfile] Error:', error);
        res.status(500).json({ error: "Internal server error while fetching your profile." });
    }
};

export const updateProfile: RequestHandler = (req, res) => {
    const userId = req.user.id;
    const isProducer = req.user.is_producer_mode;

    try {
        if (isProducer) {
            ProfileModel.updateProducer(userId, req.body);
        } else {
            ProfileModel.updateCustomer(userId, req.body);
        }

        res.json({ message: "Profile updated successfully!" });
    } catch (error) {
        console.error('[ProfilesController: updateProfile] Error:', error);
        res.status(500).json({ error: "Internal server error while updating profile." });
    }
};