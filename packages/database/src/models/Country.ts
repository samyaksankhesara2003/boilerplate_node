import { Model, RelationMappings, RelationMappingsThunk } from 'objection';
import { BaseModel } from './BaseModel';

class Country extends BaseModel {

    static get tableName() {
        return 'countries';
    };

    name!: string;
    emoji!: string;
    country_code!: string;

    static relationMappings: RelationMappings | RelationMappingsThunk = () => {
        return {};
    };
};

export default Country;