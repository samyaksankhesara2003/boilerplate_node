import { Model, RelationMappings, RelationMappingsThunk } from 'objection';
import { BaseModel } from './BaseModel';
import { ExperienceCategory } from '../index';

class ExperiencePrice extends BaseModel {

    static get tableName() {
        return 'experience_prices';
    };

    experience_category_id!: number;
    min_guests!: number;
    max_guests?: number;
    price!: number;
    service_fee?: number;
    currency!: 1 | 2;   // 1 -> USD, 2 -> INR
    price_type!: 1 | 2; // 1 -> Per Person, 2 -> Per Group

    experience_category?: ExperienceCategory;

    static relationMappings: RelationMappings | RelationMappingsThunk = () => {
        return {
            experience_category: {
                relation: Model.BelongsToOneRelation,
                modelClass: ExperienceCategory,
                join: { from: 'experience_prices.experience_category_id', to: 'experience_categories.id' }
            }
        };
    };
};

export default ExperiencePrice;