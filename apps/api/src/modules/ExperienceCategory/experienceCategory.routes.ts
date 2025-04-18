import { Router } from 'express';
import { experienceCategoryController } from './experienceCategory.controller';

const router: Router = Router();

router.get('/:experience_category_id', experienceCategoryController.getExperienceCategory);
router.get('/', experienceCategoryController.listExperienceCategories);

export const experienceCategoryRoutes = router;

