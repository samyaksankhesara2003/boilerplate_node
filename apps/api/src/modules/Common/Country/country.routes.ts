import { Router } from 'express';
import { countryController } from './country.controller';

const router: Router = Router();

router.get('/', countryController.listCountries);

export const countryRoutes = router;

