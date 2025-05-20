import { Router } from 'express';
import {adminfeedbackController} from './admin.feedback.controller';



const router: Router = Router();

router.get('/getAllFeedbacks', adminfeedbackController.getAllFeedbacks);

export const adminfeedbackRoutes = router;
