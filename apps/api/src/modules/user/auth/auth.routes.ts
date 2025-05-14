import { Router } from 'express';
import { validateRequest } from '@repo/validator';
import { authController } from './auth.controller';
import { authValidation } from './helpers/auth.validation';

const router: Router = Router();

router.post('/signup', validateRequest(authValidation.signupSchema), authController.signUp);
router.post('/login', validateRequest(authValidation.loginSchema), authController.login);

export const authRoutes = router;
