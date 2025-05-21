import { Router } from 'express';
import { faqRoutes } from './faq/faq.routes';
import { staticPagesRoutes } from './staticPages/staticPages.routes';
import adminAuthMiddleware from '../../middlewares/adminAuth.middleware';

const router: Router = Router();

// FAQ routes
router.use('/faq', adminAuthMiddleware, faqRoutes);

// Static pages routes
router.use('/static-pages', adminAuthMiddleware, staticPagesRoutes);

export const adminRoutes = router;
