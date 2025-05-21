import { Router } from 'express';
import { validateRequest } from '@repo/validator';
import { faqValidation } from './helpers/faq.validation';
import { faqController } from './faq.controller';

const validation = faqValidation;
const controller = faqController;

const router: Router = Router();

router.get('/', validateRequest(validation.LIST_SCHEMA), controller.list);
router.post('/', validateRequest(validation.CREATE_SCHEMA), controller.create);
router.put('/', validateRequest(validation.UPDATE_SCHEMA), controller.update);
router.delete('/:id', validateRequest(validation.DELETE_SCHEMA), controller.remove);

export const faqRoutes = router; 