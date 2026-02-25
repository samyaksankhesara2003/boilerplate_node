import { validateRequest } from '@repo/validator';
import { Router } from 'express';
import { checkModuleAccess } from '../../../middlewares/rbacPermission.middleware';
import { faqController } from './faq.controller';
import { faqValidation } from './helpers/faq.validation';

const router: Router = Router();

router.get('/', checkModuleAccess('faq', ['get']), validateRequest(faqValidation.listSchema), faqController.list);
router.post('/', checkModuleAccess('faq', ['create']), validateRequest(faqValidation.createSchema), faqController.create);
router.put('/', checkModuleAccess('faq', ['edit']), validateRequest(faqValidation.updateSchema), faqController.update);
router.delete('/:id', checkModuleAccess('faq', ['delete']), validateRequest(faqValidation.deleteSchema), faqController.remove);

export const faqRoutes = router;
