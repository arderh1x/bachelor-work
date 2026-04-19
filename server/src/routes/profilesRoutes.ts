import { Router } from 'express';
import { getAllProducers, getMyProfile, getProducerById, updateProfile } from '../controllers/profilesController.js';
import { verifyToken } from '@/middlewares/authMiddlewares.js';

const router = Router();

router.get('/producers', getAllProducers);
router.get('/producers/:id', getProducerById);

router.get('/me', verifyToken, getMyProfile);
router.put('/me', verifyToken, updateProfile);

export default router;