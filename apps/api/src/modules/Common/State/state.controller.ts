import { Request, Response, NextFunction } from 'express';
import  { stateService } from './state.service';

const getState = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
  try {
    const { params } = req;
    const data = await stateService.getStateService({ state_id: parseInt(params.state_id, 10) });
    return res.withData(data, 'SUCCESS', 200);
  } catch (error) {
    next(error);
  }
};

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
  getState,
  listStates
};