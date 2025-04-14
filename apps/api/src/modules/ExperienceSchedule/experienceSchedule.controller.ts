import { Request, Response, NextFunction } from 'express';
import  { experienceScheduleService } from './experienceSchedule.service';

const listExperienceSchedule = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
  try {
    const { params } = req;
    const data = await experienceScheduleService.listExperienceScheduleService({ experience_id: +params.experience_id });
    return res.withData(data, 'SUCCESS', 200);
  } catch (error) {
    next(error);
  }
};

export const experienceScheduleController = {
  listExperienceSchedule
};