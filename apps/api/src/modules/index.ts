import { Router, Request, Response } from 'express';
import { countryRoutes } from './common/country/country.routes';
import { stateRoutes } from './common/state/state.routes';
import { userRoutes } from './user/user.routes';

const router: Router = Router();

// Country routes
router.use('/country', countryRoutes);

// State routes
router.use('/state', stateRoutes);

// User routes
router.use('/user', userRoutes);

// Catch-all route for 404
router.use((req: Request, res: Response) => {
    res.status(404).json({
        error: 'Not found',
        path: req.originalUrl,
    });
});

export default router;

