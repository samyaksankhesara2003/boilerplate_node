import { Router } from 'express';
import { experienceScheduleController } from './experienceSchedule.controller';

const router: Router = Router();

router.get('/:experience_id', experienceScheduleController.listExperienceSchedule);

export const experienceScheduleRoutes = router;
