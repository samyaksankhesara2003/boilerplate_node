import { Request, Response, NextFunction } from 'express';
import { StatusCodes, ResponseMessages, sendResponse } from '@repo/response-handler';
import { stateService } from './state.service';

/**
 * @author Jitendra Singh
 * @description Handles GET /states/:state_id requests.
 */
const getState = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
  try {
    const { params, language } = req;
    const data = await stateService.getStateService({ state_id: parseInt(params.state_id, 10) });
    return sendResponse(res, StatusCodes.SUCCESS, ResponseMessages.STATE.FETCH_SUCCESS, data, language);
  } catch (error) {
    next(error);
  }
};

/**
 * @author Jitendra Singh
 * @description Handles GET /states requests.
 */
const listStates = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
  try {
    const { query, language } = req;
    const data = await stateService.listStatesService(query);
    return sendResponse(res, StatusCodes.SUCCESS, ResponseMessages.STATE.LIST_SUCCESS, data, language);
  } catch (error) {
    next(error);
  }
};

export const stateController = {
  getState,
  listStates
};