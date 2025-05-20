import { Router, Request, Response } from 'express';
import { sendResponse, StatusCodes } from '@repo/response-handler';
import { stateRoutes } from './state/state.routes';
import { countryRoutes } from './country/country.routes';
import { activityRoutes } from './activity/activity.routes';

const router: Router = Router();

// Country routes
router.use('/country', countryRoutes);

// State routes
router.use('/state', stateRoutes);

// Activity routes
router.use('/activity-log', activityRoutes);

// Catch-all route for 404
router.use((req: Request, res: Response) => sendResponse(res, StatusCodes.NOT_FOUND, `${req.originalUrl} not found`));

export const commonRoutes = router;
