import { Router } from 'express';
import { validateRequest } from '@repo/validator';
import { faqValidation } from './helpers/faq.validation';
import { faqController } from './faq.controller';

const router: Router = Router();

router.get('/', validateRequest(faqValidation.querySchema), faqController.list);

export const faqRoutes = router;
