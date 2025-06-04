import { Request, Response, NextFunction } from 'express';
import { StatusCodes, ResponseMessages, sendResponse } from '@repo/response-handler';
import { promoCodeService } from './promoCode.service';
import {
    IDeletePromoCodeParams,
    IListPromoCodeQuery,
    IPromoCodeParams,
    IUpdatePromoCodeParams,
    IUpdatePromoCodeStatusParams
} from './helpers/promoCode.types';

/**
 * @author Jitendra Singh
 * @description Get a particular promo code by its ID.
 */
const getPromoCode = async (req: Request<IPromoCodeParams>, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { params, language } = req;
        const data = await promoCodeService.getPromoCodeService(params);
        return sendResponse(res, StatusCodes.SUCCESS, ResponseMessages.COMMON.SUCCESS, data, language);
    } catch (error) {
        next(error);
    }
};

/**
 * @author Jitendra Singh
 * @description Lists all promo codes with pagination.
 */
const listPromoCode = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { query, language } = req;
        const data = await promoCodeService.listPromoCodeService(query as unknown as IListPromoCodeQuery);
        return sendResponse(res, StatusCodes.SUCCESS, ResponseMessages.COMMON.SUCCESS, data, language);
    } catch (error) {
        next(error);
    }
};

/**
 * @author Jitendra Singh
 * @description Creates a new promo code.
 */
const createPromoCode = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { body, language } = req;
        const data = await promoCodeService.createPromoCodeService(body);
        return sendResponse(res, StatusCodes.SUCCESS, ResponseMessages.COMMON.SUCCESS, data, language);
    } catch (error) {
        next(error);
    }
};

/**
 * @author Jitendra Singh
 * @description Updates a promo code by its ID.
 */
const updatePromoCode = async (req: Request<IUpdatePromoCodeParams>, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { params, body, language } = req;
        const data = await promoCodeService.updatePromoCodeService(params, body);
        return sendResponse(res, StatusCodes.SUCCESS, ResponseMessages.COMMON.SUCCESS, data, language);
    } catch (error) {
        next(error);
    }
};

/**
 * @author Jitendra Singh
 * @description Updates the status of a promo code by its ID.
 */
const updatePromoCodeStatus = async (req: Request<IUpdatePromoCodeStatusParams>, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { params, language } = req;
        const data = await promoCodeService.updatePromoCodeStatusService(params);
        return sendResponse(res, StatusCodes.SUCCESS, ResponseMessages.COMMON.SUCCESS, data, language);
    } catch (error) {
        next(error);
    }
};

/**
 * @author Jitendra Singh
 * @description Deletes a promo code by its ID.
 */
const deletePromoCode = async (req: Request<IDeletePromoCodeParams>, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { params, language } = req;
        await promoCodeService.deletePromoCodeService(params);
        return sendResponse(res, StatusCodes.SUCCESS, ResponseMessages.COMMON.SUCCESS, null, language);
    } catch (error) {
        next(error);
    }
};

export const promoCodeController = {
    getPromoCode,
    listPromoCode,
    createPromoCode,
    updatePromoCode,
    updatePromoCodeStatus,
    deletePromoCode
};
