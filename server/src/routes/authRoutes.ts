import { Router } from 'express';
import { register } from '../controllers/authController.js';

const router = Router();

// Маршрут для реєстрації: POST /api/auth/register
router.post('/register', register);

// Тут пізніше додамо:
// router.post('/login', login);
// router.post('/logout', logout);

export default router;