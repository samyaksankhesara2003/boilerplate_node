import { Router } from 'express';
import { authController } from './auth.controller';

const router: Router = Router();

router.post('/signup', authController.signUp);

// router.get('/verify-account/:token',);

router.post('/login', authController.login);

// router.patch('/forget-password',);

// router.patch('/reset-password/:token',);

// router.get('/verify-reset-password-link/:token',);

// router.patch('/resend-account-verification-link',);

export const authRoutes = router;
