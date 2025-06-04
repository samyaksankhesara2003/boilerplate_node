import { log } from '@repo/logger';
import { stripeService } from '@repo/stripe';
import { StatusCodes, CustomError, ResponseMessages } from '@repo/response-handler';
import { IValidatePromoCodeParams, IValidatePromoCodeResponse } from './helpers/promoCode.types';

/**
 * @author Jitendra Singh
 * @description Validates a Stripe promotion code.
 */
const validatePromoCodeService = async (params: IValidatePromoCodeParams): Promise<IValidatePromoCodeResponse> => {
    try {
        const { promo_code } = params;

        const promoCode = await stripeService.validatePromoCode(promo_code);

        if (!promoCode) throw new CustomError(ResponseMessages.PROMO_CODE.INVALID_CODE, StatusCodes.BAD_REQUEST);

        return {
            id: promoCode.id,
            amount_off: promoCode.amount_off,
            percent_off: promoCode.percent_off
        };
    } catch (error) {
        log.error('validatePromoCodeService Catch: ', error);
        throw error;
    }
};

export const promoCodeService = {
    validatePromoCodeService
};
