import { Request, Response, NextFunction } from 'express';

/**
 * @description Middleware to add custom response methods to the Express response object.
 * @param {Request} req The Express request object.
 * @param {Response} res The Express response object.
 * @param {NextFunction} next The next middleware function.
 */
export const responseModifier = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.withData = function (data, message = 'Success', statusCode = 200) {
    return res.status(statusCode).json({
      success: true,
      message,
      data,
    });
  };

  res.withError = function (error, statusCode = 500) {
    const message = error?.message || 'Something went wrong';
    return res.status(statusCode).json({
      success: false,
      message,
      error: process.env.NODE_ENV === 'development' ? error : undefined,
    });
  };

  next();
};
