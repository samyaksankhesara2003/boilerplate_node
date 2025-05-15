import { Request, Response, NextFunction } from 'express';

const supportedLanguages = ['en', 'fr', 'es', 'de', 'hi'];
const defaultLanguage = 'en';

/**
 * @author Jitendra Singh
 * @description Express middleware that sets the language of the request based on the "Accept-Language" header. 
 */
export const languageMiddleware = (req: Request, res: Response, next: NextFunction) => {
  let language = (req.headers['accept-language'] as string) || defaultLanguage;
  if (!supportedLanguages.includes(language)) language = defaultLanguage;
  req.language = language;
  next();
};
