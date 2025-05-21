import { Router , Request , Response } from 'express';
import { sendResponse, StatusCodes } from '@repo/response-handler';
import { faqRoutes } from './faq/faq.routes';
import { staticPagesRoutes } from './staticPages/staticPages.routes';
import adminAuthMiddleware from '../../middlewares/adminAuth.middleware';
import { adminfeedbackRoutes } from './feedback/admin.feedback.routes';

const router: Router = Router();

// FAQ routes
router.use('/faq', adminAuthMiddleware, faqRoutes);

// Static pages routes
router.use('/static-pages', adminAuthMiddleware, staticPagesRoutes);

// admin routes
router.use('/feedback', adminfeedbackRoutes);

// Catch-all route for 404
router.use((req: Request, res: Response) => sendResponse(res, StatusCodes.NOT_FOUND, `${req.originalUrl} not found`));

export const adminRoutes = router;

