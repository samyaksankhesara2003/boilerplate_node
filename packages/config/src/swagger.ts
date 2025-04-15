import { config as loadEnv } from 'dotenv';
import path from 'path';
loadEnv({ path: path.resolve(__dirname,'../../../../.env') });

import { appConfig } from './app';

const swaggerUsername = process.env.SWAGGER_USERNAME;
const swaggerPassword = process.env.SWAGGER_PASSWORD;
const swaggerApiBaseUrl = process.env.SWAGGER_API_BASE_URL;

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: `${appConfig.appName} API's`,
            version: '1.0.0',
            description: `API documentation for the ${appConfig.appName} app`,
        },
        servers: [
            {
                url: swaggerApiBaseUrl,
                description: `${appConfig.environment} server`,
            },
        ]
    },
    apis: [], // Path to route-specific YAML files
};

export const swaggerConfig = options;
export const swaggerBasicAuthConfig = {
    userName: swaggerUsername,
    password: swaggerPassword
};