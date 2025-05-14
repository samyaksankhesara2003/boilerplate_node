import Joi from 'joi';

const updateProfileSchema = {
    body: {
        first_name: Joi.string().required(),
        last_name: Joi.string().required(),
        profile_url: Joi.string().optional()
    }
};

const changePasswordSchema = {
    body: {
        current_password: Joi.string().required(),
        new_password: Joi.string().required()
    }
};

export const profileValidation = {
    updateProfileSchema,
    changePasswordSchema
};