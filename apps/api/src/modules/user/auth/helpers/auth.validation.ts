import Joi from 'joi';

const signupSchema = {
    body: {
        first_name: Joi.string().required(),
        last_name: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().required()
    }
};

const loginSchema = {
    body: {
        email: Joi.string().email().required(),
        password: Joi.string().required()
    }
};

export const authValidation = {
    signupSchema,
    loginSchema
};