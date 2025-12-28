import { Router } from 'express';
import { loginUser, refreshTokenUser, registerUser } from '../controllers/identity.controller';

const router = Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/refresh-token', refreshTokenUser);

export default router;
