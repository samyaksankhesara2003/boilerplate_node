import { Router } from 'express';
import { validateRequest } from '@repo/validator';
import { faqValidation } from './helpers/faq.validation';
import { faqController } from './faq.controller';

const validation = faqValidation;
const controller = faqController;

const router: Router = Router();

router.get('/:id', validateRequest(validation.PARAMS), controller.get);
router.get('/', validateRequest(validation.QUERY), controller.list);
router.post('/', validateRequest(validation.SCHEMA), controller.create);
router.put('/', validateRequest(validation.SCHEMA), controller.update);
router.delete('/:id', validateRequest(validation.PARAMS), controller.remove);

export const faqRoutes = router; 