import { Router, Request, Response } from 'express';
import { authRoutes } from './user/auth/auth.routes';
import { stateRoutes } from './common/state/state.routes';
import { profileRoutes } from './user/profile/profile.routes';
import { countryRoutes } from './common/country/country.routes';
import userAuthMiddleware from '../middlewares/userAuth.middleware';

const router: Router = Router();

// User routes
router.use('/auth', authRoutes);
router.use('/profile', userAuthMiddleware, profileRoutes);

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

export default router;
