import { Router } from 'express';
import { validateRequest } from '@repo/validator';
import { staticPagesValidation } from './helpers/staticPages.validation';
import { staticPagesController } from './staticPages.controller';

const router: Router = Router();

router.get('/:page', validateRequest(staticPagesValidation.paramsSchema), staticPagesController.get);

export const staticPagesRoutes = router;
