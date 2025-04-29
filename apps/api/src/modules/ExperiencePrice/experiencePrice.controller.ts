import { Request, Response, NextFunction } from 'express';
import { StatusCodes, ResponseMessages, sendResponse } from '@repo/response-handler';
import  { experiencePriceService } from './experiencePrice.service';

const getExperiencePrice = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
  try {
    const { params, language } = req;
    const data = await experiencePriceService.getExperiencePriceService({ experience_id: +params.experience_id });
    return sendResponse(res, StatusCodes.SUCCESS, ResponseMessages.EXPERIENCE_PRICE.FETCH_SUCCESS, data, language);
  } catch (error) {
    next(error);
  }
};

export const experiencePriceController = {
  getExperiencePrice
};