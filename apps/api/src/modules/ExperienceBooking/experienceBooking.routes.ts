import express, { Router } from 'express';
import { experienceBookingController } from './experienceBooking.controller';

const router: Router = Router();

router.get('/:experience_booking_id', experienceBookingController.getBookingExperience);
router.get('/', experienceBookingController.listBookingExperience);
router.post('/:experience_id', experienceBookingController.bookExperience);
router.post('/payment-verification/webhook', express.raw({ type: 'application/json' }), experienceBookingController.bookingExperiencePaymentVerificationWebhook);

export const experienceBookingRoutes = router;
