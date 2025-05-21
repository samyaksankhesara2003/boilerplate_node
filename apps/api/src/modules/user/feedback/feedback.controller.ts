import { Request, Response, NextFunction } from 'express';
import { StatusCodes, ResponseMessages, sendResponse } from '@repo/response-handler';
import { feedbackService } from './feedback.service';

/**
 * @author Yagnesh Acharya
 * @description Posts feedback by module and type 
 */
const postFeedback = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { body: { ...feedbackPayload }, user } = req;
    
    const data = await feedbackService.postFeedbackService({...feedbackPayload, user_id: user?.id} )
    return sendResponse(res, StatusCodes.SUCCESS, ResponseMessages.FEEDBACK.SAVE_SUCCESS, data );
  } catch (error) { 
    next(error);
  }
};

export const feedbackController = {
  postFeedback,
};