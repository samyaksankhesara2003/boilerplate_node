import { Request, Response, NextFunction } from 'express';
import { StatusCodes, ResponseMessages, sendResponse } from '@repo/response-handler';
import { adminfeedbackService } from './admin.feedback.service';

const getAllFeedbacks = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
  try {
    const {...listing_filter} = req.body
    const data = await adminfeedbackService.getAllFeedBackService(listing_filter)
    return sendResponse(res, StatusCodes.SUCCESS, ResponseMessages.FEEDBACK.LIST_SUCCESS, data );
  } catch (error) {
    next(error);
  }
};

export const adminfeedbackController = {
  getAllFeedbacks,
};