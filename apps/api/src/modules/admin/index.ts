import { Router } from 'express';
import { faqRoutes } from './faq/faq.routes';
import { authRoutes } from './auth/auth.routes';
import { userRoutes } from './user/user.routes';
import { staticPagesRoutes } from './staticPages/staticPages.routes';
import { adminFeedbackRoutes } from './feedback/admin.feedback.routes';
import { promoCodeRoutes } from './promoCode/promoCode.routes';
import { subscriptionRoutes } from './subscription/subscription.routes';
import adminAuthMiddleware from '../../middlewares/adminAuth.middleware';

const router: Router = Router();

// Auth routes
router.use('/auth', authRoutes);

// FAQ routes
router.use('/faq', adminAuthMiddleware, faqRoutes);

// Static pages routes
router.use('/static-pages', adminAuthMiddleware, staticPagesRoutes);

// Feedback routes
router.use('/feedback', adminAuthMiddleware, adminFeedbackRoutes);

//User management routes
router.use('/user', adminAuthMiddleware, userRoutes);

// PromoCode management routes
router.use('/promo-code', adminAuthMiddleware, promoCodeRoutes);

//Subscription management routes
router.use('/subscription', adminAuthMiddleware, subscriptionRoutes);

export const adminRoutes = router;
