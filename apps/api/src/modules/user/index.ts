import { Router, Request, Response } from 'express';
import { sendResponse, StatusCodes } from '@repo/response-handler';
import { authRoutes } from './auth/auth.routes';
import { profileRoutes } from './profile/profile.routes';
import { feedbackRoutes } from './feedback/feedback.routes';
import { subscriptionRoutes } from './subscription/subscription.routes';
import userAuthMiddleware from '../../middlewares/userAuth.middleware';

const router: Router = Router();

// Auth routes
router.use('/auth', authRoutes);

// Profile routes
router.use('/profile', userAuthMiddleware, profileRoutes);

// Subscription routes
router.use('/subscription', subscriptionRoutes);

// Feedback routes
router.use('/feedback', userAuthMiddleware, feedbackRoutes);

// Catch-all route for 404
router.use((req: Request, res: Response) => sendResponse(res, StatusCodes.NOT_FOUND, `${req.originalUrl} not found`));

export const userRoutes = router;
