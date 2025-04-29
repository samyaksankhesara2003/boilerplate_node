import { Request, Response, NextFunction } from 'express';
import { StatusCodes, ResponseMessages, sendResponse } from '@repo/response-handler';
import  { experienceScheduleService } from './experienceSchedule.service';

const listExperienceSchedule = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
  try {
    const { params, language } = req;
    const data = await experienceScheduleService.listExperienceScheduleService({ experience_id: +params.experience_id });
    return sendResponse(res, StatusCodes.SUCCESS, ResponseMessages.EXPERIENCE_SCHEDULE.LIST_SUCCESS, data, language);
  } catch (error) {
    next(error);
  }
};

export const experienceScheduleController = {
  listExperienceSchedule
};