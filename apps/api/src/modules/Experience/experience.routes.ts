import { Router } from 'express';
import { experienceController } from './experience.controller';

const router: Router = Router();

router.get('/:experience_id', experienceController.getExperience);
router.get('/', experienceController.listExperience);

export const experienceRoutes = router;

