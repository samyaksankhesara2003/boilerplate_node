import { defaultPagination } from '@repo/utils';
import Joi from 'joi';

const getReferralHistorySchema = {
  query: {
		user_id: Joi.number().required(),
		recordPerPage: Joi.number().default(defaultPagination.perPage),
		pageNumber: Joi.number().default(defaultPagination.page),
		orderBy: Joi.string().default(defaultPagination.orderBy),
		orderDir: Joi.string().valid('asc', 'desc').default(defaultPagination.orderDir)
  }
};

export const referralValidation = { getReferralHistorySchema };
