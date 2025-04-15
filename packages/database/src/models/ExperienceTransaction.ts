import { Model, RelationMappings, RelationMappingsThunk } from 'objection';
import { BaseModel } from './BaseModel';
import { ExperienceBooking, User } from '../index';

class ExperienceTransaction extends BaseModel {

    static get tableName() {
        return 'experience_transactions';
    };

    user_id!: number
    experience_booking_id!: number
    stripe_payment_intent_id!: string
    stripe_charge_id?: string
    currency!: 1 | 2
    amount!: number
    stripe_invoice_url?: string
    stripe_response?: any
    payment_status!: 1 | 2 | 3  // 1 -> Pending, 2 -> Success, 3 -> Failed

    user!: User;
    experience_booking?: ExperienceBooking;

    static relationMappings: RelationMappings | RelationMappingsThunk = () => {
        return {
            user: {
                relation: Model.BelongsToOneRelation,
                modelClass: User,
                join: { from: 'experience_transactions.user_id', to: 'users.id' }
            },
            experience_booking: {
                relation: Model.BelongsToOneRelation,
                modelClass: ExperienceBooking,
                join: { from: 'experience_transactions.experience_booking_id', to: 'experience_bookings.id' }
            }
        };
    };
};

export default ExperienceTransaction;