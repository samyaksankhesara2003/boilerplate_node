import { Router, Request, Response } from 'express';
import { sendResponse, StatusCodes } from '@repo/response-handler';
import { userRoutes } from './user';
import { adminRoutes } from './admin';
import { commonRoutes } from './common';
import { restaurantMenuRoutes } from './restaurantMenu/restaurantMenu.routes';

const router: Router = Router();

// User routes
router.use('/user', userRoutes);

// Admin routes
router.use('/admin', adminRoutes);

// Common routes
router.use('/common', commonRoutes);

//restaurantMenu routes
router.use('/restaurant-menu', restaurantMenuRoutes);

// Catch-all route for 404
router.use((req: Request, res: Response) => sendResponse(res, StatusCodes.NOT_FOUND, `${req.originalUrl} not found`));

export default router;
