import { Request, Response, NextFunction } from 'express';
import  { experienceCategoryService } from './experienceCategory.service';

const listExperienceCategories = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
  try {
    const data = await experienceCategoryService.listExperienceCategoriesService();
    return res.withData(data, 'SUCCESS', 200);
  } catch (error) {
    next(error);
  }
};

export const experienceCategoryController = {
  listExperienceCategories
};