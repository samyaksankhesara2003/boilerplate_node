import { Request, Response, NextFunction } from 'express';
import  { stateService } from './state.service';

const listStates = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
  try {
    const { params, query } = req;
    const data = await stateService.listStatesService(params, query);
    return res.withData(data, 'SUCCESS', 200);
  } catch (error) {
    next(error);
  }
};

export const stateController = {
  listStates
};