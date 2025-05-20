export interface IActivityLog {
    user_id: number;
    activity_id?: number;
    ip_address?: string;
    device_type: number;
    activity_type: number;
}

export interface IActivityLogQuery {
    user_id?: number;
    search?: string;
    from_date?: string;
    to_date?: string;
};
