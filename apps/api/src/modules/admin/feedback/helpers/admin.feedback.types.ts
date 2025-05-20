export interface IGetAllFeedback {
        id : number
        user_id: number;
        module_id?: number | null;
        rating: number;
        text: string;
        type: number;
        status: number
        created_at: Date;
        updated_at: Date;
};

export interface IListingFilter{
        user_id?: number;
        status?: number;
}

