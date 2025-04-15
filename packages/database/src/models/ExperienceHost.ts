import { Model, RelationMappings, RelationMappingsThunk } from 'objection';
import { BaseModel } from './BaseModel';
import { Experience, User } from '../index';

class ExperienceHost extends BaseModel {

    static get tableName() {
        return 'experience_hosts';
    };

    user_id!: number;
    experience_id!: number;

    user?: User;
    experience?: Experience;

    static relationMappings: RelationMappings | RelationMappingsThunk = () => {
        return {
            user: {
                relation: Model.BelongsToOneRelation,
                modelClass: User,
                join: { from: 'experience_hosts.user_id', to: 'users.id' }
            },
            experience: {
                relation: Model.BelongsToOneRelation,
                modelClass: Experience,
                join: { from: 'experience_hosts.experience_id', to: 'experiences.id' }
            }
        };
    };
};

export default ExperienceHost;