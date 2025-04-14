import { Router } from 'express';
import { experiencePriceController } from './experiencePrice.controller';

const router: Router = Router();

router.get('/:experience_id', experiencePriceController.getExperiencePrice);

export const experiencePriceRoutes = router;
