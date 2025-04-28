import { Request, Response, NextFunction } from 'express';
import { StatusCodes, ResponseMessages, sendResponse } from '@repo/response-handler';
import  { experienceCategoryService } from './experienceCategory.service';

const getExperienceCategory = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
  try {
    const { params } = req;
    const data = await experienceCategoryService.getExperienceCategoryService({ experience_category_id: +params.experience_category_id });
    return sendResponse(res, StatusCodes.SUCCESS, ResponseMessages.EXPERIENCE_CATEGORY.FETCH_SUCCESS, data);
  } catch (error) {
    next(error);
  }
};

const listExperienceCategories = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
  try {
    const { query } = req;
    const data = await experienceCategoryService.listExperienceCategoriesService(query);
    return sendResponse(res, StatusCodes.SUCCESS, ResponseMessages.EXPERIENCE_CATEGORY.LIST_SUCCESS, data);
  } catch (error) {
    next(error);
  }
};

export const experienceCategoryController = {
  getExperienceCategory,
  listExperienceCategories
};