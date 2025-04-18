import { Request, Response, NextFunction } from 'express';
import { countryService } from './country.service';

const getCountry = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
  try {
    const { params } = req;
    const data = await countryService.getCountryService({ country_id: parseInt(params.country_id, 10) });
    return res.withData(data, 'SUCCESS', 200);
  } catch (error) {
    next(error);
  }
};

const listCountries = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
  try {
    const { query } = req;
    const data = await countryService.listCountriesService(query);
    return res.withData(data, 'SUCCESS', 200);
  } catch (error) {
    next(error);
  }
};

export const countryController = {
  getCountry,
  listCountries
};