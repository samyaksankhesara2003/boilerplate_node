import type { Knex } from 'knex';
import { dbConfig } from '@repo/config';

const baseConfig: Partial<Knex.Config> = {
    client: dbConfig['dbClient'],
    connection: {
        host: dbConfig['dbHost'],
        user: dbConfig['dbUsername'],
        password: dbConfig['dbPassword'],
        database: dbConfig['dbName'],
        charset: dbConfig['dbCharset'],
        timezone: 'UTC'
    },
    pool: {
        min: 2,
        max: 20,
        acquireTimeoutMillis: 30000
    },
    migrations: {
        directory: './migrations',
        extension: 'ts',
        loadExtensions: ['.ts'],
        stub: './template/migration.stub.ts'
    },
    seeds: {
        directory: './seeds',
        extension: 'ts',
        loadExtensions: ['.ts'],
        stub: './template/seed.stub.ts'
    }
};

const config: { [key: string]: Knex.Config } = {
    development: { ...baseConfig },
    production: { ...baseConfig }
};

export default config;
