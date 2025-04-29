import { Request, Response, NextFunction } from 'express';
import { StatusCodes, ResponseMessages, sendResponse } from '@repo/response-handler';
import  { experienceBookingService } from './experienceBooking.service';
import { IUser } from '../User/Profile/profile.types';

const getBookingExperience = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
  try {
    const { user, params, language } = req;
    const data = await experienceBookingService.getBookingExperienceService(user as IUser, { experience_booking_id: +params.experience_booking_id });
    return sendResponse(res, StatusCodes.SUCCESS, ResponseMessages.EXPERIENCE_BOOKING.FETCH_SUCCESS, data, language);
  } catch (error) {
    next(error);
  }
};

const listBookingExperience = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
  try {
    const { user, query, language } = req;
    const data = await experienceBookingService.listBookingExperienceService(user as IUser, query);
    return sendResponse(res, StatusCodes.SUCCESS, ResponseMessages.EXPERIENCE_BOOKING.LIST_SUCCESS, data, language);
  } catch (error) {
    next(error);
  }
};

const bookExperience = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
  try {
    const { user, params, body, language } = req;
    const data = await experienceBookingService.bookExperienceService(user as IUser, { experience_id: +params.experience_id }, body);
    return sendResponse(res, StatusCodes.CREATED, ResponseMessages.EXPERIENCE_BOOKING.CREATE_SUCCESS, data, language);
  } catch (error) {
    next(error);
  }
};

const bookingExperiencePaymentVerificationWebhook = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
  try {
    const { language } = req;
    const data = await experienceBookingService.bookingExperiencePaymentVerificationWebhookService(req);
    return sendResponse(res, StatusCodes.SUCCESS, ResponseMessages.EXPERIENCE_BOOKING.FETCH_SUCCESS, data, language);
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