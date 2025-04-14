import { Model, RelationMappings, RelationMappingsThunk } from 'objection';
import { BaseModel, Country, ExperienceCategory, ExperiencePrice, ExperienceSchedule } from '../index';

class Experience extends BaseModel {

    static get tableName() {
        return 'experiences';
    };

    country_id!: number
    experience_category_id!: number
    title!: string
    description?: string
    duration?: number
    banner_url?: string
    rating?: number
    review_count?: number
    features?: any
    duration_type?: 1 | 2 | 3 | 4 | 5  // 1 -> Hour, 2 -> Day, 3 -> Week, 4 -> Month, 5 -> Year
    language?: 1 | 2      // 1 -> English, 2 -> Spanish
    status?: 1 | 2      // 1 -> Active, 2 -> Inactive

    country?: Country;
    experience_category?: ExperienceCategory;
    experience_price?: ExperiencePrice;
    experience_schedules?: ExperienceSchedule;

    static relationMappings: RelationMappings | RelationMappingsThunk = () => {
        return {
            country: {
                relation: Model.BelongsToOneRelation,
                modelClass: Country,
                join: { from: 'experiences.country_id', to: 'countries.id' }
            },
            experience_category: {
                relation: Model.BelongsToOneRelation,
                modelClass: ExperienceCategory,
                join: { from: 'experiences.experience_category_id', to: 'experience_categories.id' }
            },
            experience_price: {
                relation: Model.HasOneRelation,
                modelClass: ExperiencePrice,
                join: { from: 'experiences.experience_category_id', to: 'experience_prices.id' }
            },
            experience_schedules: {
                relation: Model.HasManyRelation,
                modelClass: ExperienceSchedule,
                join: { from: 'experiences.id', to: 'experience_schedules.experience_id' }
            }
        };
    };
};

export default Experience;