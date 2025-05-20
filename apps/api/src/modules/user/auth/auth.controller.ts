import { Request, Response, NextFunction } from 'express';
import { StatusCodes, ResponseMessages, sendResponse } from '@repo/response-handler';
import { authService } from './auth.service';

/**
 * @author Jitendra Singh
 * @description Authenticates a user via social media (Google, Facebook, Apple), email and password, or phone.
 */
const socialSignIn = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { body, language } = req;
    const data = await authService.socialSignInService(body);
    return sendResponse(res, StatusCodes.SUCCESS, ResponseMessages.AUTH.LOGIN_SUCCESS, data, language);
  } catch (error) {
    next(error);
  }
};

export const authController = {
  socialSignIn
};