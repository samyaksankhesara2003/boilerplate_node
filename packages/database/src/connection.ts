import { Model as ObjectionModel } from 'objection';
import knexGenerator from 'knex';
import { appConfig } from '@repo/config';
import dbConfig from './knexfile';
import { logDbQueries } from './logDBQueries';

const knex = knexGenerator({ ...dbConfig[appConfig.nodeEnv] });
const Model = ObjectionModel.knex(knex);

// LOG_DB_QUERIES
if (appConfig.logDbQueries) logDbQueries(knex);

export { Model, knex };
