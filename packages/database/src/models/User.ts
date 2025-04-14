import { Model, RelationMappings, RelationMappingsThunk } from 'objection';
import { BaseModel, ExperienceBooking, ExperienceReview, ExperienceTransaction } from '../index';

class User extends BaseModel {

    static get tableName() {
        return 'users';
    };

    first_name!: string;
    last_name!: string;
    email!: string;
    profile_url?: string;
    password!: string;
    token?: string;
    resetPasswordToken?: string;
    role!: 1 | 2 | 3;       // 1 -> Admin, 2 -> Host, 3 -> User
    status!: 1 | 2;     // 1 -> Active, 2 -> Inactive

    experience_bookings?: ExperienceBooking[];
    experience_transactions?: ExperienceTransaction[];
    experience_reviews?: ExperienceReview[];

    static relationMappings: RelationMappings | RelationMappingsThunk = () => {
        return {
            experience_bookings: {
                relation: Model.HasManyRelation,
                modelClass: ExperienceBooking,
                join: { from: 'users.id', to: 'experience_bookings.user_id' }
            },
            experience_transactions: {
                relation: Model.HasManyRelation,
                modelClass: ExperienceTransaction,
                join: { from: 'users.id', to: 'experience_transactions.user_id' }
            },
            experience_reviews: {
                relation: Model.HasManyRelation,
                modelClass: ExperienceReview,
                join: { from: 'users.id', to: 'experience_reviews.user_id' }
            }
        };
    };
};

export default  User;