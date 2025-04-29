import { Model as ObjectionModel } from 'objection';
import knexGenerator from 'knex';
import { appConfig } from '@repo/config';
import { log } from '@repo/logger';
import db from './knexfile';

const knex = knexGenerator({ ...db.development });
const Model = ObjectionModel.knex(knex);

// LOG_DB_QUERIES
if (appConfig.logDbQueries) knex.on('query', (query) => log.info(query['sql']));

export { Model, knex };
