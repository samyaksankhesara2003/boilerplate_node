export interface IExperienceParams {
    experience_booking_id: number;
};

export interface IExperienceQuery {
    experience_id?: number;
    experience_booking_id?: number;
    status?: number;
};

export interface IBookExperienceParams {
    experience_id: number;
};

export interface IExperienceBody {
    experience_price_id: number;
    guest_count: number;
    total_price: number;
    service_fee: number;
    total_amount: number;
};

export interface IBookExperienceResponse {
    payment_intent_id: string;
    payment_intent_client_secret: string | null;
};
