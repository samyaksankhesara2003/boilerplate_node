import { config as loadEnv } from 'dotenv';
import path from 'path';
loadEnv({ path: path.resolve(__dirname,'../../../../.env') });

import { appConfig } from './app';

const { environment, appName, appBaseUrl } = appConfig;

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: `${appName} API`,
            version: '1.0.0',
            description: `API documentation for the ${appName} app`,
        },
        servers: [
            {
                url: appBaseUrl,
                description: `${environment} server`,
            },
        ]
    },
    apis: [], // Path to route-specific YAML files
};

export const swaggerConfig = options;
export const swaggerBasicAuthConfig = {
    userName: process.env.SWAGGER_USERNAME,
    password: process.env.SWAGGER_PASSWORD
};