import { Router } from 'express';
import { faqRoutes } from './faq/faq.routes';
import { staticPagesRoutes } from './staticPages/staticPages.routes';
import { adminFeedbackRoutes } from './feedback/admin.feedback.routes';
import adminAuthMiddleware from '../../middlewares/adminAuth.middleware';

const router: Router = Router();

// FAQ routes
router.use('/faq', adminAuthMiddleware, faqRoutes);

// Static pages routes
router.use('/static-pages', adminAuthMiddleware, staticPagesRoutes);

// admin routes
router.use('/feedback', adminAuthMiddleware , adminFeedbackRoutes);

export const adminRoutes = router;

