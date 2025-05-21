import { Router } from 'express';
import { stateRoutes } from './state/state.routes';
import { countryRoutes } from './country/country.routes';
import { faqRoutes } from './faq/faq.routes';
import { activityRoutes } from './activity/activity.routes';
import { staticPagesRoutes } from './staticPages/staticPages.routes';
const router: Router = Router();

// Country routes
router.use('/country', countryRoutes);

// State routes
router.use('/state', stateRoutes);

// FAQ routes
router.use('/faq', faqRoutes);

// Static pages routes
router.use('/static-pages', staticPagesRoutes);

// Activity routes
router.use('/activity-log', activityRoutes);

export const commonRoutes = router;
