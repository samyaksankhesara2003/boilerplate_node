import { Router, Request, Response } from 'express';
import { sendResponse, StatusCodes } from '@repo/response-handler';
import { commonRoutes } from './common/index';
import { userRoutes } from './user';
import { adminRoutes } from './admin';

const router: Router = Router();

// Country routes
router.use('/common', commonRoutes);

// User routes
router.use('/user', userRoutes);

// Admin routes
router.use('/admin',adminRoutes);

// Catch-all route for 404
router.use((req: Request, res: Response) => sendResponse(res, StatusCodes.NOT_FOUND, `${req.originalUrl} not found`));

export default router;
    