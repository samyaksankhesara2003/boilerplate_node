import Joi from 'joi';
import { paginationSchema } from '@repo/validator';

const PARAMS = {
    params: {
        page: Joi.string().required()
    }
};

const QUERY = {
    query: {
        search: Joi.string().optional(),
        ...paginationSchema
    }
};

const SCHEMA = {
    body: {
        page: Joi.string().required(),
        content: Joi.string().required()
    }
};

export const staticPagesValidation = {
    PARAMS,
    QUERY,
    SCHEMA
}; 