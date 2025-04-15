import express, { Request, Response, NextFunction, type Express } from "express";
import compression from "compression";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import basicAuth from 'express-basic-auth';

import { knex } from "@repo/db";
import { log } from "@repo/logger";
import { appConfig, swaggerConfig, swaggerBasicAuthConfig } from "@repo/config";
import { responseModifier } from "../middlewares/responseModifier";
import routes from "../modules/index";

export const createServer = (): Express => {
  const app = express();
  app
    .disable("x-powered-by")
    .use(helmet())
    .use(
      morgan('[:remote-addr] [:status] :method :url - :response-time ms', {
        stream: {
          write: (message) => log.info(message.trim()),
        },
        skip: (req) => {
          return req?.baseUrl?.startsWith('/api-docs')
        }
      })
    )
    .use(compression())
    .use(express.json())
    .use(express.urlencoded({ extended: false }))
    .use(cors({
      origin: appConfig?.allowedHosts?.split(',') ?? '*'
    }))
    .use(responseModifier);

  knex
    .raw('SELECT 1')
    .then(() => {
      log.info('Connected with the database');
    })
    .catch((err) => {
      log.error('Unable to connect with the database', err);
    });

  // Serve the Swagger JSON specification
  app.get('/api-docs/swagger.json', (req: Request, res: Response): Response => {
    const swaggerSpec = swaggerJsDoc({
      ...swaggerConfig,
      apis: ['./src/modules/**/*.swagger.yaml', './src/modules/**/**/*.swagger.yaml']
    });

    // Just return the Swagger JSON
    return res.json(swaggerSpec);
  });

  // Serve the Swagger UI
  app.use(
    '/api-docs',
    basicAuth({
      users: {
        [`${swaggerBasicAuthConfig.userName}`]: `${swaggerBasicAuthConfig.password}`, // Set username and password
      },
      challenge: true, // Prompts a browser-based login dialog
      unauthorizedResponse: () => 'Unauthorized access to Swagger documentation',
    }),
    swaggerUi.serve,
    swaggerUi.setup(
      swaggerJsDoc({
        ...swaggerConfig,
        apis: ['./src/modules/**/*.swagger.yaml', './src/modules/**/**/*.swagger.yaml']
      }),
      {
        swaggerOptions: {
          url: '/swagger.json',
          filter: true,
          supportedSubmitMethods: ['get', 'post', 'put', 'delete', 'patch'],
          // tagsSorter: 'alpha',
          // operationsSorter: 'alpha',
          docExpansion: 'none'
        },
        explorer: true,
      }
    )
  );

  app.get("/", (req: Request, res: Response): Response => {
    return res.withData("Health check", "SUCCESS", 200);
  });

  app.use("/api", routes);

  // Global error handler
  app.use((err: any, req: Request, res: Response, next: NextFunction): Response => {
    log.error("Global error handler: ", err);
    return res.withError(err);
  });

  return app;
};
