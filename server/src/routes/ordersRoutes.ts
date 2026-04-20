import { createOrder, getOrders } from '@/controllers/ordersController.js';
import { verifyToken } from '@/middlewares/authMiddlewares.js';
import { Router } from 'express';

const router = Router();

router.post('/', verifyToken, createOrder);
router.get('/', verifyToken, getOrders);

export default router;