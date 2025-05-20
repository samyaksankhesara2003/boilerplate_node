import Joi from 'joi';
import { defaultPagination } from '@repo/utils';

export const paginationSchema = {
    perPage: Joi.number().integer().optional().default(defaultPagination.perPage),
    page: Joi.number().integer().optional().default(defaultPagination.page),
    orderBy: Joi.string().optional().default(defaultPagination.orderBy),
    orderDir: Joi.string().valid('asc', 'desc').optional().default(defaultPagination.orderDir)
};