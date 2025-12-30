import { Router } from 'express';
import isAuthenticated from '../middlewares/auth.middleware';
import { uploadMedia, getAllMedias } from '../controllers/media.controller';
import { fileUploadMiddleware } from '../middlewares/multer.middleware';

const router = Router();

router.use(isAuthenticated);

router.post('/upload', fileUploadMiddleware, uploadMedia);
router.get('/get', getAllMedias);

export default router;
