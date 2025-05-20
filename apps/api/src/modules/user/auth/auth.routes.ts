import { Router } from 'express';
import { validateRequest } from '@repo/validator';
import { verifyFirebaseToken } from '@repo/firebase-auth';
import { authController } from './auth.controller';
import { authValidation } from './helpers/auth.validation';

const router: Router = Router();

router.post('/social-signin', verifyFirebaseToken, validateRequest(authValidation.socialSignInSchema), authController.socialSignIn);

export const authRoutes = router;
