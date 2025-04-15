import { config as loadEnv } from 'dotenv';
import { envFilePath } from './envFilePath';
import { appConfig } from './app';

loadEnv({ path: envFilePath });

const swaggerUsername = process.env.SWAGGER_USERNAME;
const swaggerPassword = process.env.SWAGGER_PASSWORD;
const swaggerBaseApiUrl = process.env.SWAGGER_API_BASE_URL;

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
                url: swaggerBaseApiUrl,
                description: `${appConfig.environment} server`,
            },
        ],
        components: {
            securitySchemes: {
                basicAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                },
            },
        },
        security: [
            {
                basicAuth: [],
            },
        ],
    },
    apis: [], // Path to route-specific YAML files
};

export const swaggerConfig = options;
export const swaggerApiBaseUrl = swaggerBaseApiUrl;
export const swaggerBasicAuthConfig = {
    userName: swaggerUsername,
    password: swaggerPassword
};