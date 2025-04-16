import { Router } from 'express';
import { authRoutes } from './Auth/auth.routes';
import { profileRoutes } from './Profile/profile.routes';
import userAuthMiddleware from '../../middlewares/userAuth.middleware';

const router: Router = Router();

router.use('/auth', authRoutes);

router.use('/profile', userAuthMiddleware, profileRoutes);

export const userRoutes = router;
