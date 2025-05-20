import { Router } from 'express';
import { stateRoutes } from './state/state.routes';
import { countryRoutes } from './country/country.routes';
import { faqRoutes } from './faq/faq.routes';

const router: Router = Router();

// Country routes
router.use('/country', countryRoutes);

// State routes
router.use('/state', stateRoutes);

// FAQ routes
router.use('/faq', faqRoutes);

export const commonRoutes = router;
