import { Router, Request, Response } from 'express';
import { sendResponse, StatusCodes } from '@repo/response-handler';
import { adminfeedbackRoutes } from './feedback/admin.feedback.routes';

const router: Router = Router();

// admin routes
router.use('/feedback', adminfeedbackRoutes);

// Catch-all route for 404
router.use((req: Request, res: Response) => sendResponse(res, StatusCodes.NOT_FOUND, `${req.originalUrl} not found`));

export const adminRoutes = router;

