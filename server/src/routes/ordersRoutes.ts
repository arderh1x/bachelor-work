import { createOrder, getOrders, updateOrderStatus } from '@/controllers/ordersController.js';
import { verifyToken } from '@/middlewares/authMiddlewares.js';
import { Router } from 'express';

const router = Router();

router.use(verifyToken);

router.post('/', createOrder);
router.get('/', getOrders);

router.patch('/:id/status', updateOrderStatus);

export default router;