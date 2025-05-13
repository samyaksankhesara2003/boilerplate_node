import { Request, Response, NextFunction } from 'express';
import { StatusCodes, ResponseMessages, sendResponse } from '@repo/response-handler';
import  { profileService } from './profile.service';
import { IUser } from './profile.types';

/**
 * @author Jitendra Singh
 * @description Retrieves the profile information for the authenticated user.
 * @param {Request} req - The Express request object containing user details.
 * @param {Response} res - The Express response object for sending the response.
 * @param {NextFunction} next - The Express next function for error handling.
 * @returns {Promise<Response | void>} A Promise that resolves with the user's profile data or passes an error to the next middleware.
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
 * @param {Request} req - The Express request object containing user and body details.
 * @param {Response} res - The Express response object for sending the response.
 * @param {NextFunction} next - The Express next function for error handling.
 * @returns {Promise<Response | void>} A Promise that resolves with the updated user's profile data or passes an error to the next middleware.
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
 * @param {Request} req - The Express request object containing user and body details.
 * @param {Response} res - The Express response object for sending the response.
 * @param {NextFunction} next - The Express next function for error handling.
 * @returns {Promise<Response | void>} A Promise that resolves with the response message or passes an error to the next middleware.
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