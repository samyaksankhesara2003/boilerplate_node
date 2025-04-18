import { Router } from 'express';
import { experienceBookingController } from './experienceBooking.controller';

const router: Router = Router();

router.get('/:experience_booking_id', experienceBookingController.getBookingExperience);
router.get('/', experienceBookingController.listBookingExperience);
router.post('/:experience_id', experienceBookingController.bookExperience);

export const experienceBookingRoutes = router;
