import { Model as ObjectionModel } from 'objection';
import knexGenerator from 'knex';
import db from './knexfile';

const knex = knexGenerator({ ...db.development });
const Model = ObjectionModel.knex(knex);

export { Model, knex };
