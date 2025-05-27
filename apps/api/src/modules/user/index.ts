import { Request, Response, Router } from 'express';
import { sendResponse, StatusCodes } from '@repo/response-handler';
import userAuthMiddleware from '../../middlewares/userAuth.middleware';
import { authRoutes } from './auth/auth.routes';
import { profileRoutes } from './profile/profile.routes';
import { feedbackRoutes } from './feedback/feedback.routes';
import { bookmarkRoutes } from './bookmark/bookmark.routes';

const router: Router = Router();

// User routes
router.use('/auth', authRoutes);
router.use('/profile', userAuthMiddleware, profileRoutes);
router.use('/feedback', userAuthMiddleware, feedbackRoutes);
router.use('/bookmark', userAuthMiddleware, bookmarkRoutes);

// Catch-all route for 404
router.use((req: Request, res: Response) => sendResponse(res, StatusCodes.NOT_FOUND, `${req.originalUrl} not found`));

export const userRoutes = router;
