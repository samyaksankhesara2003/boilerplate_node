import Joi from 'joi';
import { paginationSchema } from '@repo/validator';

const paramsSchema = {
    params: {
        page: Joi.string().required()
    }
};

const querySchema = {
    query: {
        search: Joi.string().optional(),
        ...paginationSchema
    }
};

const createOrUpdateSchema = {
    body: {
        id: Joi.number().optional(),
        page: Joi.string().required(),
        content: Joi.string().required()
    }
};

export const staticPagesValidation = {
    paramsSchema,
    querySchema,
    createOrUpdateSchema
};
