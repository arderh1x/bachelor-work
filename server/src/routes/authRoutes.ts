import { Router } from 'express';
import { login, logout, refresh, register, toggleMode } from '@/controllers/authController.js';
import { verifyToken } from '@/middlewares/authMiddleware.js';

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);
router.get('/refresh', refresh);
router.post('/toggle-mode', verifyToken, toggleMode);

export default router;