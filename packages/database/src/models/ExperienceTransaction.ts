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
    amount!: number
    stripe_invoice_url?: string
    stripe_response?: any
    currency!: 1 | 2    // 1 -> USD, 2 -> INR
    payment_type!: 1 | 2 | 3 // 1 -> Full Payment, 2 -> Partial Payment, 3 -> Refund
    payment_status!: 1 | 2 | 3 | 4  // 1 -> Pending, 2 -> Success, 3 -> Failed, 4 -> Cancelled
    payment_method?: 1 | 2 | 3 // 1 -> Stripe, 2 -> PayPal, 3 -> Other

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