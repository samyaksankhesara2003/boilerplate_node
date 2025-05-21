import { log } from "@repo/logger";
import { Feedback } from "@repo/db";
import { IFeedback } from "./helpers/feedback.types";

/**
 * @author Yagnesh Acharya
 * @description Save feedback in database
 */
const postFeedbackService = async (body: IFeedback): Promise<Feedback> => {
  try {
    const {user_id, module_id, rating, feedback, type} = body;
    
    const feedbackData = await Feedback.query().insert({user_id, module_id, rating, feedback, type});

    return feedbackData;
  } catch (error) {
    log.error("postFeedbackService Catch: ", error);
    throw error;
  }
};

export const feedbackService = {postFeedbackService};
