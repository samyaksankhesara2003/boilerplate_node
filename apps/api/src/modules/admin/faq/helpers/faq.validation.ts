import Joi from 'joi';
import { constants } from '@repo/config';
import { paginationSchema } from '@repo/validator';

const listSchema = {
    query: {
        search: Joi.string().optional(),
        status: Joi.number()
            .valid(...Object.values(constants.status))
            .optional(),
        ...paginationSchema
    }
};

const createSchema = {
    body: {
        question: Joi.string().required(),
        answer: Joi.string().required(),
        status: Joi.number()
            .valid(...Object.values(constants.status))
            .optional()
    }
};

const updateSchema = {
    body: {
        id: Joi.number().required(),
        question: Joi.string().required(),
        answer: Joi.string().required(),
        status: Joi.number()
            .valid(...Object.values(constants.status))
            .optional()
    }
};

const deleteSchema = {
    params: {
        id: Joi.number().required()
    }
};

export const faqValidation = {
    listSchema,
    createSchema,
    updateSchema,
    deleteSchema
};
