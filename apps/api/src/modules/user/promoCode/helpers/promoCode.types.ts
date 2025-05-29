export interface IValidatePromoCodeParams {
    promo_code: string;
}

export interface IValidatePromoCodeResponse {
    id: string;
    amount_off: number | null;
    percent_off: number | null;
}
