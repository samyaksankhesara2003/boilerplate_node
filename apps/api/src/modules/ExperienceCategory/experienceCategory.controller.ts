import { Request, Response, NextFunction } from 'express';
import  { experienceCategoryService } from './experienceCategory.service';

const listExperienceCategories = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
  try {
    const { query } = req;
    const data = await experienceCategoryService.listExperienceCategoriesService(query);
    return res.withData(data, 'SUCCESS', 200);
  } catch (error) {
    next(error);
  }
};

export const experienceCategoryController = {
  listExperienceCategories
};