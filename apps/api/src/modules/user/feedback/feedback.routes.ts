import { Router } from 'express';
import {feedbackController} from './feedback.controller';



const router: Router = Router();

router.post('/create', feedbackController.postFeedback);

export const feedbackRoutes = router;
