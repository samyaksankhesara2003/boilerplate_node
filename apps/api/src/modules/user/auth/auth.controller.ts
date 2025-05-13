import { Request, Response, NextFunction } from 'express';
import { StatusCodes, ResponseMessages, sendResponse } from '@repo/response-handler';
import { authService } from './auth.service';

/**
 * @author Jitendra Singh
 * @description Creates a new user.
 */
const signUp = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
  try {
    const { body, language } = req;
    const data = await authService.signUpService(body);
    return sendResponse(res, StatusCodes.CREATED, ResponseMessages.USER.SIGNUP_SUCCESS, data, language);
  } catch (error) {
    next(error);
  }
};

/**
 * @author Jitendra Singh
 * @description Logs in a user.
 */
const login = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
  try {
    const { body, language } = req;
    const data = await authService.loginService(body);
    return sendResponse(res, StatusCodes.SUCCESS, ResponseMessages.AUTH.LOGIN_SUCCESS, data, language);
  } catch (error) {
    next(error);
  }
};

export const authController = {
  signUp,
  login
};