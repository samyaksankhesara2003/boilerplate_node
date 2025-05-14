import { Router } from 'express';
import { validateRequest } from '@repo/validator';
import { profileController } from './profile.controller';
import { profileValidation } from './helpers/profile.validation';

const router: Router = Router();

router.get('/', profileController.getProfile);
router.patch('/', validateRequest(profileValidation.updateProfileSchema), profileController.updateProfile);
router.patch('/password', validateRequest(profileValidation.changePasswordSchema), profileController.changePassword);

export const profileRoutes = router;
