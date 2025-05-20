import Joi from 'joi';
import { paginationSchema } from '@repo/validator';

const PARAMS = {
    params: {
        id: Joi.number().required()
    }
};

const QUERY = {
    query: {
        search: Joi.string().optional(),
        status: Joi.number().valid(1, 2).optional(),
        ...paginationSchema,
    }
};

const SCHEMA = {
    body: {
        id: Joi.number().optional(),
        question: Joi.string().required(),
        answer: Joi.string().required(),
        status: Joi.number().valid(1, 2).optional()
    }
};

export const faqValidation = {
    PARAMS,
    QUERY,
    SCHEMA
}; 