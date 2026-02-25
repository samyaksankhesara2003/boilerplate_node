import { log } from '@repo/logger';
import { Feedback } from '@repo/db';
import { IListingFilter } from './helpers/admin.feedback.types';

/**
 * @author Yagnesh Acharya
 * @description Fetch All feedbacks from database based on their user_id and status of feedback , both fields are optional
 */
const getAllFeedBack = async (query: IListingFilter): Promise<Feedback[]> => {
    try {
        const { user_id, status } = query;

        const feedbackAttributes = ['id', 'user_id', 'module_id', 'rating', 'feedback', 'type', 'status'];

        const totalFeedbacks = await Feedback.query()
            .select(...feedbackAttributes)
            .modify(query => {
                if (user_id) {
                    query.where('user_id', user_id);
                }
                if (status) {
                    query.where('status', status);
                }
            });

        return totalFeedbacks;
    } catch (error) {
        log.error('getAllFeedBack Catch: ', error);
        throw error;
    }
};

export const adminfeedbackService = {
    getAllFeedBack
};
