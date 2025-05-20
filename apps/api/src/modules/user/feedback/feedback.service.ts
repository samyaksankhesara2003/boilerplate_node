import { log } from "@repo/logger";
import { Feedback } from "@repo/db";
import { IFeedback } from "./helpers/feedback.types";
import {
  CustomError,
  ResponseMessages,
  StatusCodes,
} from "@repo/response-handler";
import { constants } from '@repo/config';

const postFeedBack = async (
  body: IFeedback
): Promise<IFeedback> => {
  try {
    const feedback_body = {user_id: body.user_id,module_id: body.module_id,rating: body.rating,text: body.text,type: body.type};

    if(!feedback_body.user_id || !feedback_body.type || !feedback_body.text) throw new CustomError(ResponseMessages.FEEDBACK.PROPERTY_REQUIRED, StatusCodes.BAD_REQUEST);
    if(body.module_id === undefined && body.type !== constants.feedback_type.System)  throw new CustomError(ResponseMessages.FEEDBACK.MODULE_ID_REQUIRED, StatusCodes.BAD_REQUEST);
    if(feedback_body.rating !== undefined && feedback_body.rating > 5)  throw new CustomError(ResponseMessages.FEEDBACK.MAX_RATING_LIMIT, StatusCodes.BAD_REQUEST);
    if(feedback_body.type === constants.feedback_type.System)  delete feedback_body.module_id;   
    
    await Feedback.query().insert(feedback_body);

    return feedback_body;
  } catch (error) {
    log.error("postFeedbackService Catch: ", error);
    throw error;
  }
};

export const feedbackService = {postFeedBack};
