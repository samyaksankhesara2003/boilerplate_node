import { log } from "@repo/logger";
import { Feedback } from "@repo/db";
import { IFeedback, IPostFeedbackResponse } from "./helpers/feedback.types";
import {
  CustomError,
  ResponseMessages,
  StatusCodes,
} from "@repo/response-handler";

const postFeedBack = async (
  payload: IFeedback
): Promise<IPostFeedbackResponse> => {
  try {

    const feedback_payload = {
      user_id: payload.user_id,
      module_id: payload.module_id,
      rating: payload.rating,
      text: payload.text?.trim(),
      type: payload.type,
    };



    if(!feedback_payload.user_id || !feedback_payload.type || !feedback_payload.text){
      throw new CustomError(ResponseMessages.FEEDBACK.PROPERTY_REQUIRED, StatusCodes.BAD_REQUEST);
    }

    if (payload.module_id === undefined && payload.type !== 1) {
      throw new CustomError(ResponseMessages.FEEDBACK.MODULE_ID_REQUIRED, StatusCodes.BAD_REQUEST);
    }

    if (feedback_payload.type === 1) { // 1 for system , than no need for module_id
      delete feedback_payload.module_id;
    }

    if(feedback_payload.rating !== undefined && feedback_payload.rating > 5) {
      throw new CustomError(ResponseMessages.FEEDBACK.MAX_RATING_LIMIT, StatusCodes.BAD_REQUEST);
    }

    const result = await Feedback.query().insert(feedback_payload);

    if(!result) throw new CustomError(ResponseMessages.FEEDBACK.SAVE_FAILED, StatusCodes.INTERNAL_SERVER_ERROR);

    console.log("ressult", result);
    const feedback_Attributes = ['id', 'user_id', 'module_id', 'rating', 'text', 'type'];

    const total_feedbacks = await Feedback.query().select(...feedback_Attributes)

    return total_feedbacks[0];
  } catch (error) {
    log.error("postFeedbackService Catch: ", error);
    throw error;
  }
};

export const feedbackService = {
  postFeedBack,
};
