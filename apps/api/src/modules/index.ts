import { Router, Request, Response } from 'express';
import { countryRoutes } from './Common/Country/country.routes';
import { stateRoutes } from './Common/State/state.routes';
import { userRoutes } from './User/user.routes';
import { experienceCategoryRoutes } from '../modules/ExperienceCategory/experienceCategory.routes';
import { experienceRoutes } from '../modules/Experience/experience.routes';
import { experiencePriceRoutes } from '../modules/ExperiencePrice/experiencePrice.routes';
import { experienceScheduleRoutes } from '../modules/ExperienceSchedule/experienceSchedule.routes';
import { experienceBookingRoutes } from './ExperienceBooking/experienceBooking.routes';
import userAuthMiddleware from '../middlewares/userAuth.middleware';

const router: Router = Router();

// Country routes
router.use('/country', countryRoutes);

// State routes
router.use('/state', stateRoutes);

// Admin routes
// router.use('/admin', adminRoutes);

// User routes
router.use('/user', userRoutes);

// Experience category routes
router.use('/experience-category', experienceCategoryRoutes);

// Experience routes
router.use('/experience', experienceRoutes);

// Experience Booking routes
router.use('/experience-booking', userAuthMiddleware, experienceBookingRoutes);

// Experience price routes
router.use('/experience-price', experiencePriceRoutes);

// Experience Schedule routes
router.use('/experience-schedule', experienceScheduleRoutes);

// Catch-all route for 404
router.use((req: Request, res: Response) => {
    res.status(404).json({
        error: 'Not found',
        path: req.originalUrl,
    });
});

export default router;

