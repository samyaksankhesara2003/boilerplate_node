import { sendResponse, StatusCodes } from '@repo/response-handler';
import { Request, Response, Router } from 'express';
import { countryRoutes } from './country/country.routes';
import { notificationRoutes } from './Notification/notification.routes';
import { stateRoutes } from './state/state.routes';

const router: Router = Router();

// Country routes
router.use('/country', countryRoutes);

// State routes
router.use('/state', stateRoutes);

// Notification routes
router.use('/notification', notificationRoutes);

// Catch-all route for 404
router.use((req: Request, res: Response) => sendResponse(res, StatusCodes.NOT_FOUND, `${req.originalUrl} not found`));

export const commonRoutes = router;
