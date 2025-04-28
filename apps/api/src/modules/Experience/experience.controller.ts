import { Request, Response, NextFunction } from 'express';
import { StatusCodes, ResponseMessages, sendResponse } from '@repo/response-handler';
import  { experienceService } from './experience.service';

const getExperience = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
  try {
    const { params } = req;
    const data = await experienceService.getExperienceService({ experience_id: parseInt(params.experience_id, 10) });
    return sendResponse(res, StatusCodes.SUCCESS, ResponseMessages.EXPERIENCE.FETCH_SUCCESS, data);
  } catch (error) {
    next(error);
  }
};

const listExperience = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
  try {
    const { query } = req;
    const data = await experienceService.listExperienceService(query);
    return sendResponse(res, StatusCodes.SUCCESS, ResponseMessages.EXPERIENCE.LIST_SUCCESS, data);
  } catch (error) {
    next(error);
  }
};

export const experienceController = {
  getExperience,
  listExperience
};