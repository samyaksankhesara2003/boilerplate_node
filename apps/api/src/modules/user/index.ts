import { sendResponse, StatusCodes } from '@repo/response-handler';
import { Request, Response, Router } from 'express';
import userAuthMiddleware from '../../middlewares/userAuth.middleware';
import { authRoutes } from './auth/auth.routes';
import { bookmarkRoutes } from './bookmark/bookmark.routes';
import { feedbackRoutes } from './feedback/feedback.routes';
import { profileRoutes } from './profile/profile.routes';
import { referralRoutes } from './referral/referral.routes';
import { subscriptionRoutes } from './subscription/subscription.routes';

const router: Router = Router();

// Auth routes
router.use('/auth', authRoutes);

// Profile routes
router.use('/profile', userAuthMiddleware, profileRoutes);

// Subscription routes
router.use('/subscription', subscriptionRoutes);

// Feedback routes
router.use('/feedback', userAuthMiddleware, feedbackRoutes);
router.use('/referrals', userAuthMiddleware, referralRoutes);
router.use('/bookmark', userAuthMiddleware, bookmarkRoutes);

// Catch-all route for 404
router.use((req: Request, res: Response) => sendResponse(res, StatusCodes.NOT_FOUND, `${req.originalUrl} not found`));

export const userRoutes = router;
