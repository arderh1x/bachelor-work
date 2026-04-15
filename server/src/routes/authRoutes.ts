import { Router } from 'express';
import { login, logout, refresh, register } from '../controllers/authController.js';
import { verifyToken } from '../middlewares/authMiddlewares.js';

const router = Router();

// Маршрут для реєстрації: POST /api/auth/register
router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);

router.get('/me', verifyToken, (req: any, res) => {
    res.json({ user: req.user });
});
router.get('/refresh', refresh);


export default router;