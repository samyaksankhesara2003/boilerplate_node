import { Router } from 'express';
import { authRoutes } from './auth/auth.routes';
import { profileRoutes } from './profile/profile.routes';
import userAuthMiddleware from '../../middlewares/userAuth.middleware';

const router: Router = Router();

router.use('/auth', authRoutes);
router.use('/profile', userAuthMiddleware, profileRoutes);

export const userRoutes = router;
