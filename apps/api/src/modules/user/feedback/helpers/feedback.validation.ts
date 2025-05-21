import { constants } from '@repo/config';
import Joi from 'joi';

const postFeedbackSchema = {
    body: {
        module_id: Joi.number(),
        feedback: Joi.string().optional(),
        rating : Joi.number().positive().min(0).max(5).optional(),
        type : Joi.number().valid(...Object.values(constants.feedbackType)).required()
    }
};

export const feedbackValidation = { postFeedbackSchema };