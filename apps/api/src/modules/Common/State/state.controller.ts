import { Request, Response, NextFunction } from 'express';
import { StatusCodes, ResponseMessages, sendResponse } from '@repo/response-handler';
import  { stateService } from './state.service';

/**
 * @description Handles GET /states/:state_id requests.
 * @param {Request} req - The Express request object.
 * @param {Response} res - The Express response object.
 * @param {NextFunction} next - The Express next function.
 * @returns {Promise<Response | void>} A Promise that resolves to an Express response object or void.
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
 * @description Handles GET /states requests.
 * @param {Request} req - The Express request object.
 * @param {Response} res - The Express response object.
 * @param {NextFunction} next - The Express next function.
 * @returns {Promise<Response | void>} A Promise that resolves to an Express response object or void.
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