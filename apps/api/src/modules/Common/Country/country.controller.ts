import { Request, Response, NextFunction } from 'express';
import  { countryService } from './country.service';

const listCountries = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
  try {
    const data = await countryService.listCountriesService();
    return res.withData(data, 'SUCCESS', 200);
  } catch (error) {
    next(error);
  }
};

export const countryController = {
  listCountries
};