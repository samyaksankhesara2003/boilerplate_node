import { validateRequest } from '@repo/validator';
import { Router } from 'express';
import { checkModuleAccess } from '../../../middlewares/rbacPermission.middleware';
import { faqController } from './faq.controller';
import { faqValidation } from './helpers/faq.validation';

const validation = faqValidation;
const controller = faqController;

const router: Router = Router();

router.get('/',checkModuleAccess(['faq_list']), validateRequest(validation.ListSchema), controller.list);
router.post('/', checkModuleAccess(['faq_create_edit']), validateRequest(validation.CreateSchema), controller.create);
router.put('/', checkModuleAccess(['faq_create_edit']), validateRequest(validation.UpdateSchema), controller.update);
router.delete('/:id', checkModuleAccess(['faq_delete']), validateRequest(validation.DeleteSchema), controller.remove);

export const faqRoutes = router; 