import { Model, RelationMappings, RelationMappingsThunk } from 'objection';
import { BaseModel } from './BaseModel';
import { Experience } from '../index';

class ExperienceCategory extends BaseModel {

    static get tableName() {
        return 'experience_categories';
    }

    name?: string
    status?: 1 | 2      // 1 -> Active, 2 -> Inactive

    experiences?: Experience[];

    static relationMappings: RelationMappings | RelationMappingsThunk = () => {
        return {
            experiences: {
                relation: Model.HasManyRelation,
                modelClass: Experience,
                join: { from: 'experience_categories.id', to: 'experiences.experience_category_id' }
            }
        };
    };
};

export default ExperienceCategory;