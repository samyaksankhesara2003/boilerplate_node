import { constants } from '@repo/config';
import Joi from 'joi';

const socialSignInSchema = {
    body: {
        social_id: Joi.string().required(),
        first_name: Joi.string().optional(),
        last_name: Joi.string().optional(),
        email: Joi.string().email().optional(),
        mobile_number: Joi.string().optional(),
        password: Joi.string().optional(),
        profile_url: Joi.string().optional(),
        auth_type: Joi.number().valid(...Object.values(constants.authType)).required(),
        device_type: Joi.number().valid(...Object.values(constants.deviceType)).optional()
    }
};

export const authValidation = {
    socialSignInSchema
};