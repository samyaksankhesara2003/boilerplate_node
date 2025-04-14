import { Router, Request, Response } from 'express';
import { countryRoutes } from './Common/Country/country.routes';
import { stateRoutes } from './Common/State/state.routes';
import { experienceCategoryRoutes } from '../modules/ExperienceCategory/experienceCategory.routes';
import { experienceRoutes } from '../modules/Experience/experience.routes';
import { experiencePriceRoutes } from '../modules/ExperiencePrice/experiencePrice.routes';

const router: Router = Router();

// Country routes
router.use('/country', countryRoutes);

// State routes
router.use('/state', stateRoutes);

// Admin routes
// router.use('/admin', adminRoutes);

// User routes
// router.use('/user', userRoutes);

// Experience category routes
router.use('/experience-categories', experienceCategoryRoutes);

// Experience routes
router.use('/experience', experienceRoutes);

// Experience price routes
router.use('/experience-price', experiencePriceRoutes);

// Catch-all route for 404
router.use((req: Request, res: Response) => {
    res.status(404).json({
        error: 'Not found',
        path: req.originalUrl,
    });
});

export default router;

