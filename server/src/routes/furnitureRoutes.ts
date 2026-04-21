import { Router } from 'express';
import { createFurniture, deleteFurniture, getFurnitureById, getFurnitureList, updateFurniture } from '@/controllers/furnitureController.js';
import { verifyToken } from '@/middlewares/authMiddleware.js';

const router = Router();

router.get('/my', verifyToken, getFurnitureList);
router.get('/producer/:producerId', getFurnitureList);
router.get('/:id', getFurnitureById);

router.use(verifyToken);
router.post('/', createFurniture);
router.put('/:id', updateFurniture);
router.delete('/:id', deleteFurniture);

export default router;