import { Router, Request, Response } from 'express';
import { stateRoutes } from './state/state.routes';
import { countryRoutes } from './country/country.routes';

const router: Router = Router();

// Country routes
router.use('/country', countryRoutes);

// State routes
router.use('/state', stateRoutes);

// Catch-all route for 404
router.use((req: Request, res: Response) => {
    res.status(404).json({
        error: 'Not found',
        path: req.originalUrl,
    });
});

export const commonRoutes = router;
