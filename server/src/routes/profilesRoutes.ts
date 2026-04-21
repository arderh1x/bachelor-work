import { Router } from 'express';
import { getAllProducers, getMyProfile, getProducerById, updateProfile } from '@/controllers/profilesController.js';
import { verifyToken } from '@/middlewares/authMiddleware.js';

const router = Router();

router.get('/producers', getAllProducers);
router.get('/producers/:id', getProducerById);

router.use(verifyToken);
router.get('/me', getMyProfile);
router.put('/me', updateProfile);

export default router;