import { Model, RelationMappings, RelationMappingsThunk } from 'objection';
import { BaseModel, State } from '../index';

class Country extends BaseModel {

    static get tableName() {
        return 'countries';
    }

    id!: number;
    name!: string;
    emoji!: string;
    country_code!: string;

    states!: State[];

    static relationMappings: RelationMappings | RelationMappingsThunk = () => {
        return {
            states: {
                relation: Model.HasManyRelation,
                modelClass: State,
                join: { from: 'countries.id', to: 'states.country_id' }
            }
        }
    }
}

export default Country;