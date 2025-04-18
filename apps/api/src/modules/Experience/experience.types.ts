export interface IExperienceParams {
    experience_id: number;
};

export interface IExperienceQuery {
    experience_category_id?: number;
    country_id?: number;
    min_price?: number;
    max_price?: number;
    rating?: number;
};
