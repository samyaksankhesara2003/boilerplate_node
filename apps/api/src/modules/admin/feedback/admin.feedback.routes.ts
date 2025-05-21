import { Router } from "express";
import { adminFeedbackController } from "./admin.feedback.controller";

const router: Router = Router();

router.get("/", adminFeedbackController.getAllFeedbacks);

export const adminFeedbackRoutes = router;
