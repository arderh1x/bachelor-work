import type { RequestHandler } from 'express';
import { FurnitureModel } from '../models/furnitureModel.js';
import type { CreateFurnitureDTO } from '@shared/types.js';

export const insertFurniture = (producerId: number, data: CreateFurnitureDTO, isCustom: number = 0) => {
    return FurnitureModel.create(producerId, data, isCustom);
};

export const createFurniture: RequestHandler<{}, any, CreateFurnitureDTO> = (req, res) => {
    try {
        const id = FurnitureModel.create(req.user.id, req.body);
        res.status(201).json({ id, message: 'Furniture created successfully!' });
    } catch (error) {
        console.error('[FurnitureController: createFurniture] Error:', error);
        res.status(500).json({ error: 'Internal server error while creating furniture.' });
    }
};

export const getFurnitureList: RequestHandler = (req, res) => {
    const producerId = req.params.producerId ? Number(req.params.producerId) : req.user?.id;
    if (!producerId) return res.status(400).json({ error: 'Producer ID is required.' });

    try {
        const items = FurnitureModel.getByProducer(producerId);
        res.json(items);
    } catch (error) {
        console.error('[FurnitureController: getFurnitureList] Error:', error);
        res.status(500).json({ error: 'Internal server error while fetching furniture list.' });
    }
};

export const getFurnitureById: RequestHandler<{ id: string }> = (req, res) => {
    try {
        const item = FurnitureModel.getById(Number(req.params.id));
        if (!item) return res.status(404).json({ error: 'Furniture item not found.' });
        res.json(item);
    } catch (error) {
        console.error('[FurnitureController: getFurnitureById] Error:', error);
        res.status(500).json({ error: 'Internal server error while fetching furniture item.' });
    }
};

export const updateFurniture: RequestHandler<{ id: string }> = (req, res) => {
    try {
        const result = FurnitureModel.update(Number(req.params.id), req.user.id, req.body);
        if (result.changes === 0) return res.status(404).json({ error: 'Furniture not found or access denied.' });
        res.json({ message: 'Furniture updated successfully.' });
    } catch (error) {
        console.error('[FurnitureController: updateFurniture] Error:', error);
        res.status(500).json({ error: 'Internal server error while updating furniture.' });
    }
};

export const deleteFurniture: RequestHandler<{ id: string }> = (req, res) => {
    try {
        const result = FurnitureModel.delete(Number(req.params.id), req.user.id);
        if (result.changes === 0) return res.status(404).json({ error: 'Furniture not found or access denied.' });
        res.sendStatus(204);
    } catch (error) {
        console.error('[FurnitureController: deleteFurniture] Error:', error);
        res.status(500).json({ error: 'Internal server error while deleting furniture.' });
    }
};