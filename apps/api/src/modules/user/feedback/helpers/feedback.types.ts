export interface IFeedback {
    user_id: number;
    module_id?: number | null;
    rating: number;
    text: string;
    type: number;
};

export interface IPostFeedbackResponse extends IFeedback {};
