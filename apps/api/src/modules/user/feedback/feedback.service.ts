import { log } from '@repo/logger';
import { Feedback } from '@repo/db';
import { IFeedback } from './helpers/feedback.types';

/**
 * @author Yagnesh Acharya
 * @description Save feedback in database
 */
const postFeedback = async (body: IFeedback): Promise<Feedback> => {
    try {
        const feedbackData = await Feedback.query().insert(body);

        return feedbackData;
    } catch (error) {
        log.error('postFeedback Catch: ', error);
        throw error;
    }
};

export const feedbackService = { postFeedback };
