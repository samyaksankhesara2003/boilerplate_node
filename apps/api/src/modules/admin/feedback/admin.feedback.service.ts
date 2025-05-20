import { log } from "@repo/logger";
import { Feedback } from "@repo/db";
import {
  IGetAllFeedback,
  IListingFilter,
} from "./helpers/admin.feedback.types";
import {
  CustomError,
  ResponseMessages,
  StatusCodes,
} from "@repo/response-handler";

const getAllFeedBackService = async (
  listing_filter: IListingFilter
): Promise<IGetAllFeedback[]> => {
  try {
    const { user_id, status } = listing_filter;

    const feedback_Attributes = ['id', 'user_id', 'module_id', 'rating', 'text', 'type'];


    const totalFeedbacks = await Feedback.query().select(...feedback_Attributes).modify((query) => {
      if (user_id) {
        query.where("user_id", user_id);
      }
      if (status) {
        query.where("status", status);
      }
    });



    if (!totalFeedbacks || totalFeedbacks.length === 0) {
      throw new CustomError(
        ResponseMessages.FEEDBACK.NOT_FOUND,
        StatusCodes.NOT_FOUND
      );
    }

    return totalFeedbacks;
  } catch (error) {
    log.error("postFeedbackService Catch: ", error);
    throw error;
  }
};

export const adminfeedbackService = {
  getAllFeedBackService,
};
