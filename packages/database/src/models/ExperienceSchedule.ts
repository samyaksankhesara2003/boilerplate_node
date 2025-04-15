import { Model, RelationMappings, RelationMappingsThunk } from 'objection';
import { BaseModel } from './BaseModel';
import { Experience } from '../index';

class ExperienceSchedule extends BaseModel {

    static get tableName() {
        return 'experience_schedules';
    };

    experience_id!: number;
    available_date!: string;
    available_time!: string;
    min_guests!: number;
    max_guests?: number;
    status!: 1 | 2; // 1 -> Active, 2 -> Inactive

    experience?: Experience;

    static relationMappings: RelationMappings | RelationMappingsThunk = () => {
        return {
            experience: {
                relation: Model.BelongsToOneRelation,
                modelClass: Experience,
                join: { from: 'experience_hosts.experience_id', to: 'experiences.id' }
            }
        };
    };
};

export default ExperienceSchedule;