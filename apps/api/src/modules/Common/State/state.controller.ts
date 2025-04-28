import { Request, Response, NextFunction } from 'express';
import { StatusCodes, ResponseMessages, sendResponse } from '@repo/response-handler';
import  { stateService } from './state.service';

const getState = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
  try {
    const { params } = req;
    const data = await stateService.getStateService({ state_id: parseInt(params.state_id, 10) });
    return sendResponse(res, StatusCodes.SUCCESS, ResponseMessages.STATE.FETCH_SUCCESS, data);
  } catch (error) {
    next(error);
  }
};

const listStates = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
  try {
    const { params, query } = req;
    const data = await stateService.listStatesService(params, query);
    return sendResponse(res, StatusCodes.SUCCESS, ResponseMessages.STATE.LIST_SUCCESS, data);
  } catch (error) {
    next(error);
  }
};

export const stateController = {
  getState,
  listStates
};