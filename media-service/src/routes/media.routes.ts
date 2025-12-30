import { Router } from 'express';

import isAuthenticated from '../middlewares/auth.middleware';
import { uploadMedia, getAllMedias } from '../controllers/media.controller';

const router = Router();

router.use(isAuthenticated);

router.post('/upload', uploadMedia);
router.get('/get', getAllMedias);

export default router;
