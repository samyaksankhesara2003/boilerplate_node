import { NextFunction, Request, Response } from 'express';
import  { experienceService } from './experience.service';

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
  listExperience
};