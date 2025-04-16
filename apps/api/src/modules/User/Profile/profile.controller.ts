import { Request, Response, NextFunction } from 'express';
import  { profileService } from './profile.service';
import { IUser } from './profile.types';

const getProfile = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
  try {
    const { user } = req;
    const data = await profileService.getProfileService(user as IUser);
    return res.withData(data, 'SUCCESS', 200);
  } catch (error) {
    next(error);
  }
};

const updateProfile = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
  try {
    const { user, body } = req;
    const data = await profileService.updateProfileService(user as IUser, body);
    return res.withData(data, 'Profile updated', 200);
  } catch (error) {
    next(error);
  }
};

const changePassword = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
  try {
    const { user, body } = req;
    const data = await profileService.changePasswordService(user as IUser, body);
    return res.withData(data, 'Password updated', 200);
  } catch (error) {
    next(error);
  }
};

export const profileController = {
  getProfile,
  updateProfile,
  changePassword
};