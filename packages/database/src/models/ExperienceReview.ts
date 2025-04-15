import { Model, RelationMappings, RelationMappingsThunk } from 'objection';
import { BaseModel } from './BaseModel';
import { ExperienceBooking, User } from '../index';

class ExperienceReview extends BaseModel {

    static get tableName() {
        return 'experience_reviews';
    };

    user_id!: number
    experience_booking_id!: number
    rating!: number
    comment?: string

    user?: User;
    experience_booking?: ExperienceBooking;

    static relationMappings: RelationMappings | RelationMappingsThunk = () => {
        return {
            user: {
                relation: Model.BelongsToOneRelation,
                modelClass: User,
                join: { from: 'experience_reviews.user_id', to: 'users.id' }
            },
            experience_booking: {
                relation: Model.BelongsToOneRelation,
                modelClass: ExperienceBooking,
                join: { from: 'experience_reviews.experience_booking_id', to: 'experience_bookings.id' }
            }
        };
    };
};

export default ExperienceReview;