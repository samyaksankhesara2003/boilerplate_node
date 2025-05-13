import { Router } from 'express';
import { profileController } from './profile.controller';

const router: Router = Router();

router.get('/', profileController.getProfile);
router.patch('/', profileController.updateProfile);
router.patch('/password', profileController.changePassword);

export const profileRoutes = router;
