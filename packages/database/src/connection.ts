import { Model as ObjectionModel } from 'objection';
import knexGenerator from 'knex';
import { appConfig } from '@repo/config';
import { config as dbConfig } from './knexfile';
import { logDbQueries } from './logDBQueries';

const knex = knexGenerator({ ...dbConfig.development });
const Model = ObjectionModel.knex(knex);

// LOG_DB_QUERIES
if (appConfig.logDbQueries) logDbQueries(knex);

export { Model, knex };
