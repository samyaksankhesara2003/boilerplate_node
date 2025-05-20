import Joi from 'joi';

export const paginationSchema = {
    recordPerPage: Joi.number().integer().optional(),
    pageNumber: Joi.number().integer().optional(),
    orderBy: Joi.string().optional(),
    orderDir: Joi.string().valid('ASC', 'DESC').optional()
};