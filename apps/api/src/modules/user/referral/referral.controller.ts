import { ResponseMessages, sendResponse, StatusCodes } from '@repo/response-handler';
import { NextFunction, Request, Response } from 'express';
import { referralService } from './referral.service';

/**
 * @author Sanjay Balai
 * @description Get user's referral history
 */
const getReferralHistory = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { query, user, language } = req;
    const data = await referralService.getReferralHistoryService({ ...query, user_id: user?.id });
    return sendResponse(res, StatusCodes.SUCCESS, ResponseMessages.REFERRAL.LIST_SUCCESS, data, language);
  } catch (error) {
    next(error);
  }
};

export const referralController = {
  getReferralHistory,
}; 