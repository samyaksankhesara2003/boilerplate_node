import { Router } from 'express';
import { faqRoutes } from './faq/faq.routes';
import { authRoutes } from './auth/auth.routes';
import { staticPagesRoutes } from './staticPages/staticPages.routes';
import { adminFeedbackRoutes } from './feedback/admin.feedback.routes';
import { userRoutes } from './user/user.routes';
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

//admin user management routes
router.use('/user', adminAuthMiddleware, userRoutes);

export const adminRoutes = router;
