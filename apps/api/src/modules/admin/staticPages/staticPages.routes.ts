import { Router } from 'express';
import { validateRequest } from '@repo/validator';
import { staticPagesValidation } from './helpers/staticPages.validation';
import { staticPagesController } from './staticPages.controller';

const router: Router = Router();

router.get('/:page', validateRequest(staticPagesValidation.paramsSchema), staticPagesController.get);
router.get('/', validateRequest(staticPagesValidation.querySchema), staticPagesController.list);
router.put('/', validateRequest(staticPagesValidation.createOrUpdateSchema), staticPagesController.createOrUpdate);
router.delete('/:page', validateRequest(staticPagesValidation.paramsSchema), staticPagesController.remove);

export const staticPagesRoutes = router;
