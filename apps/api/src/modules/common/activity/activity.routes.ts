import { Router } from 'express';
import { activityController } from './activity.controller';

const router: Router = Router();

router.get('/', activityController.listActivityLogs);

export const activityRoutes = router;
