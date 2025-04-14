import { NextFunction, Request, Response } from 'express';
import  { experiencePriceService } from './experiencePrice.service';

const getExperiencePrice = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
  try {
    const { params } = req;
    const data = await experiencePriceService.getExperiencePriceService({ experience_id: +params.experience_id });
    return res.withData(data, 'SUCCESS', 200);
  } catch (error) {
    next(error);
  }
};

export const experiencePriceController = {
  getExperiencePrice
};