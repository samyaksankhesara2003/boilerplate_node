export interface IStateParams {
    country_id?: number;
};

export interface IStateQuery extends IStateParams {
    search?: string;
};

export interface IGetStateParams {
    state_id: number;
};