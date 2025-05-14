import { RelationMappings, RelationMappingsThunk } from 'objection';
import { BaseModel } from './BaseModel';

class User extends BaseModel {

    static get tableName() {
        return 'users';
    };

    first_name!: string;
    last_name!: string;
    email!: string;
    profile_url!: string;
    password!: string;
    token!: string;
    resetPasswordToken!: string;
    role!: number;       // 1 -> Admin, 2 -> Host, 3 -> User
    status!: number;     // 1 -> Active, 2 -> Inactive

    static relationMappings: RelationMappings | RelationMappingsThunk = () => {
        return {};
    };
};

export default User;