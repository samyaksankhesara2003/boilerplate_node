import { Request, Response, NextFunction } from 'express';
import { StatusCodes, ResponseMessages, sendResponse } from '@repo/response-handler';
import { countryService } from './country.service';

const getCountry = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
  try {
    const { params } = req;
    const data = await countryService.getCountryService({ country_id: parseInt(params.country_id, 10) });
    return sendResponse(res, StatusCodes.SUCCESS, ResponseMessages.COUNTRY.FETCH_SUCCESS, data);
  } catch (error) {
    next(error);
  }
};

const listCountries = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
  try {
    const { query } = req;
    const data = await countryService.listCountriesService(query);
    return sendResponse(res, StatusCodes.SUCCESS, ResponseMessages.COUNTRY.LIST_SUCCESS, data);
  } catch (error) {
    next(error);
  }
};

export const countryController = {
  getCountry,
  listCountries
};