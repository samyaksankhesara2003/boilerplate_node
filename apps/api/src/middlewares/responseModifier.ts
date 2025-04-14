import { Request, Response, NextFunction } from 'express';

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
