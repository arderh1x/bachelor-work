import { Router } from 'express';
import { createFurniture, deleteFurniture, getFurnitureList, updateFurniture } from '@/controllers/furnitureController.js';
import { verifyToken } from '@/middlewares/authMiddlewares.js';

const router = Router();

router.get('/producer/:producerId', getFurnitureList);

router.use(verifyToken);

router.post('/', createFurniture);
router.get('/my', getFurnitureList);
router.delete('/:id', deleteFurniture);
router.put('/:id', verifyToken, updateFurniture);

export default router;