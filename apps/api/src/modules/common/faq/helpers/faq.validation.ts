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
        // ...paginationSchema,
        page: Joi.number().optional().default(1),
        perPage: Joi.number().optional().default(10),
        orderBy: Joi.string().optional().default('created_at'),
        orderDir: Joi.string().valid('asc', 'desc').optional().default('desc')
    }
};

const SCHEMA = {
    body: {
        id: Joi.number().optional(),
        question: Joi.string().required(),
        answer: Joi.string().required(),
        status: Joi.number().valid(1, 2)
    }
};

export const faqValidation = {
    PARAMS,
    QUERY,
    SCHEMA
}; 