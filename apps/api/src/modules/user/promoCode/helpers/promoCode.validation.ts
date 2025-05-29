import Joi from 'joi';

const validatePromoCodeSchema = {
    params: {
        promo_code: Joi.string().required()
    }
};

export const promoCodeValidation = {
    validatePromoCodeSchema
};
