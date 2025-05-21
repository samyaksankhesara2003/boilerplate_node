import { Request, Response, NextFunction } from 'express';
import { StatusCodes, ResponseMessages, sendResponse } from '@repo/response-handler';
import { feedbackService } from './feedback.service';

const postFeedback = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
  try {
    const { body: { ...feedbackPayload }, user } = req;
    
    const data = await feedbackService.postFeedBack({...feedbackPayload, user_id: user?.id} )
    return sendResponse(res, StatusCodes.SUCCESS, ResponseMessages.FEEDBACK.SAVE_SUCCESS, data );
  } catch (error) { 
    next(error);
  }
};

export const feedbackController = {
  postFeedback,
};