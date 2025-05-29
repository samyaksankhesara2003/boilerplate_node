import compression from 'compression';
import cors from 'cors';
import express, { NextFunction, Request, Response, type Express } from 'express';
import basicAuth from 'express-basic-auth';
import helmet from 'helmet';
import morgan from 'morgan';
import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

import { appConfig, swaggerBasicAuthConfig, swaggerJsDocConfig, swaggerOptionsConfig } from '@repo/config';
import { knex } from '@repo/db';
import { log } from '@repo/logger';
import { ResponseMessages, sendResponse, StatusCodes } from '@repo/response-handler';
import { errorHandler } from '../middlewares/errorHandler.middleware';
import { languageMiddleware } from '../middlewares/language.middleware';
import routes from '../modules/index';

/**
 * @author Jitendra Singh
 * @description Creates an Express server with security, logging, and Swagger documentation.
 */
export const createServer = (): Express => {
    const app = express();
    app.disable('x-powered-by')
        .use(helmet())
        .use(
            morgan('[:remote-addr] [:status] :method :url - :response-time ms', {
                stream: {
                    write: message => log.info(message.trim())
                },
                skip: req => {
                    return req?.baseUrl?.startsWith('/api-docs');
                }
            })
        )
        .use(languageMiddleware)
        .use((req: Request, res: Response, next: NextFunction) => {
            if (
                req.originalUrl === '/api/user/subscription/payment-verification/webhook' ||
                req.originalUrl === '/api/user/subscription/cancellation/webhook'
            )
                next();
            else express.json()(req, res, next);
        })
        .use(compression())
        .use(express.urlencoded({ extended: false }))
        // .use(cors({ origin: appConfig?.allowedHosts?.split(',') ?? '*' }));
        .use(cors({ origin: '*' }));

    // Test DB connection
    knex.raw('SELECT 1')
        .then(() => {
            log.info('✅ Connected with the database');
        })
        .catch(err => {
            log.error('❌ Unable to connect with the database', err);
        });

    // Common swagger docs specification
    const commonSwaggerSpec = swaggerJsDoc({
        ...swaggerJsDocConfig,
        apis: ['./src/modules/common/*.swagger.yaml', './src/modules/common/**/*.swagger.yaml']
    });

    // User swagger docs specification
    const userSwaggerSpec = swaggerJsDoc({
        ...swaggerJsDocConfig,
        apis: ['./src/modules/user/*.swagger.yaml', './src/modules/user/**/*.swagger.yaml']
    });

    // Admin swagger docs specification
    const adminSwaggerSpec = swaggerJsDoc({
        ...swaggerJsDocConfig,
        apis: ['./src/modules/admin/*.swagger.yaml', './src/modules/admin/**/*.swagger.yaml']
    });

    // Serve the common Swagger JSON specification
    app.get('/common-swagger.json', (req: Request, res: Response): void => {
        res.setHeader('Content-Type', 'application/json');
        res.send(commonSwaggerSpec);
    });

    // Serve the user Swagger JSON specification
    app.get('/user-swagger.json', (req: Request, res: Response): void => {
        res.setHeader('Content-Type', 'application/json');
        res.send(userSwaggerSpec);
    });

    // Serve the admin Swagger JSON specification
    app.get('/admin-swagger.json', (req: Request, res: Response): void => {
        res.setHeader('Content-Type', 'application/json');
        res.send(adminSwaggerSpec);
    });

    // Serve the Swagger UI
    app.use(
        '/api-docs',
        basicAuth({
            users: {
                [`${swaggerBasicAuthConfig.userName}`]: `${swaggerBasicAuthConfig.password}` // Set username and password
            },
            challenge: true
        }),
        swaggerUi.serve,
        swaggerUi.setup(null, {
            explorer: true,
            customSiteTitle: `${appConfig.appName} - API Explorer`,
            swaggerOptions: {
                urls: [
                    { url: '/common-swagger.json', name: 'Common APIs' },
                    { url: '/user-swagger.json', name: 'User APIs' },
                    { url: '/admin-swagger.json', name: 'Admin APIs' }
                ],
                filter: true,
                tagsSorter: swaggerOptionsConfig.tagsSorter
            }
        })
    );

    // Test API
    app.get('/', (req: Request, res: Response): void => {
        return sendResponse(res, StatusCodes.SUCCESS, ResponseMessages.COMMON.SUCCESS);
    });

    // Routes
    app.use('/api', routes);

    // Global error handler
    app.use(errorHandler);

    return app;
};
