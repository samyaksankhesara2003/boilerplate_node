import { constants } from '@repo/config';
import Joi from 'joi';

const postFeedbackSchema = {
    body: {
        module_id: Joi.number().required(),
        feedback: Joi.string().required(),
        rating : Joi.number().positive().min(0).max(5).optional(),
        status : Joi.string(),
        type : Joi.number().valid(...Object.values(constants.feedback_type)).required()
    }
};

export const feedbackValidation = { postFeedbackSchema };