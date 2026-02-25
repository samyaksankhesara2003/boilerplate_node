import Joi from 'joi';

const paramsSchema = {
    params: {
        page: Joi.string().required()
    }
};

export const staticPagesValidation = {
    paramsSchema
};
