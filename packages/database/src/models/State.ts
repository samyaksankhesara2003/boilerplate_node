import { Model, RelationMappings, RelationMappingsThunk } from 'objection';
import { BaseModel } from './BaseModel';

class State extends BaseModel {

    static get tableName() {
        return 'states';
    };

    country_id!: number;
    name!: string;

    static relationMappings: RelationMappings | RelationMappingsThunk = () => {
        return {};
    };
};

export default State;