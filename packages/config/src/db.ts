import { config as loadEnv } from 'dotenv';
import { envFilePath } from './envFilePath';
loadEnv({ path: envFilePath });

export const dbConfig = {
    dbClient: "mysql",
    dbHost: process.env.DATABASE_HOST,
    dbPort: process.env.DATABASE_PORT,
    dbUsername: process.env.DATABASE_USERNAME,
    dbPassword: process.env.DATABASE_PASSWORD,
    dbName: process.env.DATABASE_NAME,
    dbCharset: process.env.DATABASE_CHARSET
};
