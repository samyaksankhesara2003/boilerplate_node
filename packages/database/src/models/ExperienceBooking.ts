import { Model, RelationMappings, RelationMappingsThunk } from 'objection';
import { BaseModel } from '../index';

class ExperienceBooking extends BaseModel {

    static get tableName() {
        return 'experience_bookings';
    }

    user_id!: number
    experience_id!: number
    experience_price_id!: number
    guests!: number
    total_price!: number
    service_fee!: number
    total_amount!: number
    status!: 1 | 2 | 3  // 1 -> Pending, 2 -> Accepted, 3 -> Rejected

    static relationMappings: RelationMappings | RelationMappingsThunk = () => {
        return {};
    };
};

export default ExperienceBooking;