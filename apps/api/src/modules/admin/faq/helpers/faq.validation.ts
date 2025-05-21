import Joi from 'joi';
import { paginationSchema } from '@repo/validator';

const LIST_SCHEMA = {
    query: {
        search: Joi.string().optional(),
        status: Joi.number().valid(1, 2).optional(),
        ...paginationSchema,
    }
};

const CREATE_SCHEMA = {
    body: {
        question: Joi.string().required(),
        answer: Joi.string().required(),
        status: Joi.number().valid(1, 2).optional()
    }
};

const UPDATE_SCHEMA = {
    body: {
        id: Joi.number().required(),
        question: Joi.string().required(),
        answer: Joi.string().required(),
        status: Joi.number().valid(1, 2).optional()
    }
};

const DELETE_SCHEMA = {
    params: {
        id: Joi.number().required()
    }
};

export const faqValidation = {
    LIST_SCHEMA,
    CREATE_SCHEMA,
    UPDATE_SCHEMA,
    DELETE_SCHEMA,
}; 