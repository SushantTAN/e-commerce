import { Router } from 'express';
import { getProfile, updateProfile } from '../controllers/user';
import { auth } from '../middlewares/auth';

const router = Router();

router.get('/profile', auth, getProfile);
router.put('/profile', auth, updateProfile);

export default router;
