import { Request, Response, NextFunction } from 'express';
import  { experienceService } from './experience.service';

const getExperience = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
  try {
    const { params } = req;
    const data = await experienceService.getExperienceService({ experience_id: parseInt(params.experience_id, 10) });
    return res.withData(data, 'SUCCESS', 200);
  } catch (error) {
    next(error);
  }
};

const listExperience = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
  try {
    const { query } = req;
    const data = await experienceService.listExperienceService(query);
    return res.withData(data, 'SUCCESS', 200);
  } catch (error) {
    next(error);
  }
};

export const experienceController = {
  getExperience,
  listExperience
};