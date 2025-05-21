import { Router } from 'express';
import { feedbackController } from './feedback.controller';
import { feedbackValidation } from './helpers/feedback.validation';
import { validateRequest } from '@repo/validator';

const router: Router = Router();

router.post('/create', validateRequest(feedbackValidation.postFeedbackSchema), feedbackController.postFeedback);

export const feedbackRoutes = router;
