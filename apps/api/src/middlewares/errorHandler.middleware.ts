import { Request, Response, NextFunction } from 'express';
import { CustomError, sendResponse } from '@repo/response-handler';
import { log } from '@repo/logger';
import { appConfig } from '@repo/config';

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction): Response => {
  const isCustomError = err instanceof CustomError;
  const statusCode = isCustomError ? err.statusCode : 500;
  const messageKey = err.message || 'common.error';
  const language = (req as Request).language || 'en'; // ensure language middleware sets this

  if (appConfig.environment !== 'development') log.error(`[${statusCode}] ${messageKey}`, err);

  return sendResponse(res, statusCode, messageKey, null, language);
};
