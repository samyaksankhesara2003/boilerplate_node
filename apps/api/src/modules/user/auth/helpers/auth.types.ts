export interface ISignUpBody {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
};

export interface ISignUpResponse {
    token: string;
    loginDetails: {
        id: number;
        name: string;
        email: string;
        role: number;
        status: number;
    };
};

export interface ILoginBody {
    email: string;
    password: string;
};

export interface ILoginResponse extends ISignUpResponse {};
