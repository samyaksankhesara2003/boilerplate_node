export interface ISocialSignInBody {
    social_id: string;
    first_name: string;
    last_name: string;
    email: string;
    mobile_number: string;
    password: string;
    profile_url: string;
    auth_type: number;
    device_type: number;
};

export interface ISocialSignInResponse {
    token: string;
    loginDetails: {
        id: number;
        name: string;
        email: string;
        mobile_number?: string;
        role: number;
        status: number;
    };
};
