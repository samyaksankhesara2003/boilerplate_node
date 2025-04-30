import { Request, Response, NextFunction } from 'express';

const supportedLanguages = ['en', 'fr', 'es', 'de', 'hi'];
const defaultLanguage = 'en';

/**
 * @description Express middleware that sets the language of the request based on the "Accept-Language" header. 
 * @param {Request} req - The Express request object.
 * @param {Response} res - The Express response object.
 * @param {NextFunction} next - The Express next function.
 */
export const languageMiddleware = (req: Request, res: Response, next: NextFunction) => {
  let language = (req.headers['accept-language'] as string) || defaultLanguage;
  if (!supportedLanguages.includes(language)) language = defaultLanguage;
  req.language = language;
  next();
};
