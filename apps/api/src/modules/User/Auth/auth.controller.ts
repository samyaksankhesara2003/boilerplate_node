import { Request, Response, NextFunction } from 'express';
import  { authService } from './auth.service';

const signUp = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
  try {
    const { body } = req;
    const data = await authService.signUpService(body);
    return res.withData(data, 'Signup successfully', 201);
  } catch (error) {
    next(error);
  }
};

const login = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
  try {
    const { body } = req;
    const data = await authService.loginService(body);
    return res.withData(data, 'Login successfully', 200);
  } catch (error) {
    next(error);
  }
};

export const authController = {
  signUp,
  login
};