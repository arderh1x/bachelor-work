import { Router } from 'express';
import { getAllProducers, getProducerById } from '../controllers/profileController.js';

const router = Router();

router.get('/producers', getAllProducers);
router.get('/producers/:id', getProducerById);

export default router;