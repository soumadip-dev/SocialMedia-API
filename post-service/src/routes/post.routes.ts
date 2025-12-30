import { Router } from 'express';
import { createPost, getAllPost, getPost, deletePost } from '../controllers/post.controller';
import isAuthenticated from '../middlewares/auth.middleware';

const router = Router();

router.use(isAuthenticated);

router.post('/create-post', createPost);
router.get('/posts', getAllPost);
router.get('/:id', getPost);
router.delete('/:id', deletePost);

export default router;
