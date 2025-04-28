import { Request, Response, NextFunction } from 'express';
import  { experienceBookingService } from './experienceBooking.service';
import { IUser } from '../User/Profile/profile.types';

const getBookingExperience = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
  try {
    const { user, params } = req;
    const data = await experienceBookingService.getBookingExperienceService(user as IUser, { experience_booking_id: +params.experience_booking_id });
    return res.withData(data, 'SUCCESS', 200);
  } catch (error) {
    next(error);
  }
};

const listBookingExperience = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
  try {
    const { user, query } = req;
    const data = await experienceBookingService.listBookingExperienceService(user as IUser, query);
    return res.withData(data, 'SUCCESS', 200);
  } catch (error) {
    next(error);
  }
};

const bookExperience = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
  try {
    const { user, params, body } = req;
    const data = await experienceBookingService.bookExperienceService(user as IUser, { experience_id: +params.experience_id }, body);
    return res.withData(data, 'SUCCESS', 201);
  } catch (error) {
    next(error);
  }
};

const bookingExperiencePaymentVerificationWebhook = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
  try {
    const data = await experienceBookingService.bookingExperiencePaymentVerificationWebhookService(req);
    return res.withData(data, 'SUCCESS', 200);
  } catch (error) {
    next(error);
  }
};

export const experienceBookingController = {
  getBookingExperience,
  listBookingExperience,
  bookExperience,
  bookingExperiencePaymentVerificationWebhook
};