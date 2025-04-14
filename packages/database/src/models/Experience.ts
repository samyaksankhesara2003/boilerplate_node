import { Model, RelationMappings, RelationMappingsThunk } from 'objection';
import { BaseModel } from '../index';

class Experience extends BaseModel {

    static get tableName() {
        return 'experiences';
    };

    experience_category_id!: number
    country_id!: number
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

    static relationMappings: RelationMappings | RelationMappingsThunk = () => {
        return {};
    };
};

export default Experience;