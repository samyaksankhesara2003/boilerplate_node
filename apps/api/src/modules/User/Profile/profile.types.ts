export interface IUser {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    profile_url: string;
    role: number;
    status: number;
};

export interface IGetProfileResponse extends IUser {};

export interface IUpdateProfileBody {
    first_name: string;
    last_name: string;
    profile_url: string;
};

export interface IChangePasswordBody {
    current_password: string;
    new_password: string;
};