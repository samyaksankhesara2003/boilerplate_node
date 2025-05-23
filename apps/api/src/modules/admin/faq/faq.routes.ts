import { Router } from 'express';
import { validateRequest } from '@repo/validator';
import { faqValidation } from './helpers/faq.validation';
import { faqController } from './faq.controller';

const validation = faqValidation;
const controller = faqController;

const router: Router = Router();

router.get('/', validateRequest(validation.ListSchema), controller.list);
router.post('/', validateRequest(validation.CreateSchema), controller.create);
router.put('/', validateRequest(validation.UpdateSchema), controller.update);
router.delete('/:id', validateRequest(validation.DeleteSchema), controller.remove);

export const faqRoutes = router;
