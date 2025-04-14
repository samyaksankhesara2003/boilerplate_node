import { Router } from 'express';
import { countryRoutes } from '../modules/Common/Country/country.routes';
import { stateRoutes } from '../modules/Common/State/state.routes';

const router: Router = Router();

router.use('/country', countryRoutes);
router.use('/state', stateRoutes);

export const commonRoutes = router;
