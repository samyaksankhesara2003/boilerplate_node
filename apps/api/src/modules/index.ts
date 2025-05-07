import { Router, Request, Response } from 'express';
import { countryRoutes } from './Common/Country/country.routes';
import { stateRoutes } from './Common/State/state.routes';
import { userRoutes } from './User/user.routes';

const router: Router = Router();

// Country routes
router.use('/country', countryRoutes);

// State routes
router.use('/state', stateRoutes);

// Admin routes
// router.use('/admin', adminRoutes);

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

