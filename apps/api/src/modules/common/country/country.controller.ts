import { Request, Response, NextFunction } from 'express';
import { StatusCodes, ResponseMessages, sendResponse } from '@repo/response-handler';
import { countryService } from './country.service';

/**
 * @author Jitendra Singh
 * @description Handles GET /countries/:country_id requests.
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
 * @author Jitendra Singh
 * @description Handles GET /countries requests.
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