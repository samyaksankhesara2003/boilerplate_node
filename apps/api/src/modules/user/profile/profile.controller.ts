import { Request, Response, NextFunction } from 'express';
import { StatusCodes, ResponseMessages, sendResponse } from '@repo/response-handler';
import { IUser } from './helpers/profile.types';
import { profileService } from './profile.service';

/**
 * @author Jitendra Singh
 * @description Retrieves the profile information for the authenticated user.
 */
const getProfile = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
  try {
    const { user, language } = req;
    const data = await profileService.getProfileService(user as IUser);
    return sendResponse(res, StatusCodes.SUCCESS, ResponseMessages.PROFILE.FETCH_SUCCESS, data, language);
  } catch (error) {
    next(error);
  }
};

/**
 * @author Jitendra Singh
 * @description Updates the profile information for the authenticated user.
 */
const updateProfile = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
  try {
    const { user, body, language } = req;
    const data = await profileService.updateProfileService(user as IUser, body);
    return sendResponse(res, StatusCodes.SUCCESS, ResponseMessages.PROFILE.UPDATE_SUCCESS, data, language);
  } catch (error) {
    next(error);
  }
};

/**
 * @author Jitendra Singh
 * @description Updates the password for the authenticated user.
 */
const changePassword = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
  try {
    const { user, body, language } = req;
    const data = await profileService.changePasswordService(user as IUser, body);
    return sendResponse(res, StatusCodes.SUCCESS, ResponseMessages.PASSWORD.PASSWORD_CANNOT_BE_SAME_AS_CURRENT, data, language);
  } catch (error) {
    next(error);
  }
};

export const profileController = {
  getProfile,
  updateProfile,
  changePassword
};