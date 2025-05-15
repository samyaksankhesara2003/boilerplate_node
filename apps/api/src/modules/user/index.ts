import { Router, Request, Response } from 'express';
import { sendResponse, StatusCodes } from '@repo/response-handler';
import { authRoutes } from './auth/auth.routes';
import { profileRoutes } from './profile/profile.routes';
import userAuthMiddleware from '../../middlewares/userAuth.middleware';

const router: Router = Router();

// User routes
router.use('/auth', authRoutes);
router.use('/profile', userAuthMiddleware, profileRoutes);

// Catch-all route for 404
router.use((req: Request, res: Response) => sendResponse(res, StatusCodes.NOT_FOUND, `${req.originalUrl} not found`));

export const userRoutes = router;

