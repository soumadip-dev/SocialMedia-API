import { Router } from 'express';
import { searchPostController } from '../controllers/search.controller';
import isAuthenticated from '../middlewares/auth.middleware';

const router = Router();

router.use(isAuthenticated);

router.get('/posts', searchPostController);

export default router;
