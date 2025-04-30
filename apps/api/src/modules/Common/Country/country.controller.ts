import { Request, Response, NextFunction } from 'express';
import { StatusCodes, ResponseMessages, sendResponse } from '@repo/response-handler';
import { countryService } from './country.service';

/**
 * @description Handles GET /countries/:country_id requests.
 * @param {Request} req - The Express request object.
 * @param {Response} res - The Express response object.
 * @param {NextFunction} next - The Express next function.
 * @returns {Promise<Response | void>} A Promise that resolves to an Express response object or void.
 */
const getCountry = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
  try {
    const { params, language } = req;
    const data = await countryService.getCountryService({ country_id: parseInt(params.country_id, 10) });
    return sendResponse(res, StatusCodes.SUCCESS, ResponseMessages.COUNTRY.FETCH_SUCCESS, data, language);
  } catch (error) {
    next(error);
  }
};

/**
 * @description Handles GET /countries requests.
 * @param {Request} req - The Express request object.
 * @param {Response} res - The Express response object.
 * @param {NextFunction} next - The Express next function.
 * @returns {Promise<Response | void>} A Promise that resolves to an Express response object or void.
 */
const listCountries = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
  try {
    const { query, language } = req;
    const data = await countryService.listCountriesService(query);
    return sendResponse(res, StatusCodes.SUCCESS, ResponseMessages.COUNTRY.LIST_SUCCESS, data, language);
  } catch (error) {
    next(error);
  }
};

export const countryController = {
  getCountry,
  listCountries
};