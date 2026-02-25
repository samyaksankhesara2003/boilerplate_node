import Joi from 'joi';
import { constants } from '@repo/config';
import { paginationSchema } from '@repo/validator';

const querySchema = {
    query: {
        search: Joi.string().optional(),
        status: Joi.number()
            .valid(...Object.values(constants.status))
            .optional(),
        ...paginationSchema
    }
};

export const faqValidation = {
    querySchema
};
