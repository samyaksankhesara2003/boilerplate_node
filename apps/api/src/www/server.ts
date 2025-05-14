import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import compression from "compression";
import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import basicAuth from 'express-basic-auth';
import express, { Request, Response, NextFunction, type Express } from "express";

import { knex } from "@repo/db";
import { log } from "@repo/logger";
import { StatusCodes, ResponseMessages, sendResponse } from "@repo/response-handler";
import { appConfig, swaggerJsDocConfig, swaggerOptionsConfig, swaggerBasicAuthConfig } from "@repo/config";
import routes from "../modules/index";
import { errorHandler } from "../middlewares/errorHandler.middleware";
import { languageMiddleware } from "../middlewares/language.middleware";

/**
 * @author Jitendra Singh
 * @description Creates an Express server with security, logging, and Swagger documentation.
 */
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
    .use(languageMiddleware)
    .use((req: Request, res: Response, next: NextFunction) => {
      if ((req.originalUrl === '/experience-booking/payment-verification/webhook')) next();
      else express.json()(req, res, next);
    })
    .use(compression())
    .use(express.urlencoded({ extended: false }))
    .use(cors({ origin: appConfig?.allowedHosts?.split(',') ?? '*' }));

  // Test DB connection
  knex.raw('SELECT 1').then(() => {
    log.info('Connected with the database');
  }).catch((err) => {
    log.error('Unable to connect with the database', err);
  });

  // Serve the Swagger JSON specification
  app.get('/api-docs/swagger.json', (req: Request, res: Response): Response => {
    const swaggerSpec = swaggerJsDoc({
      ...swaggerJsDocConfig,
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
        ...swaggerJsDocConfig,
        apis: ['./src/modules/**/*.swagger.yaml', './src/modules/**/**/*.swagger.yaml']
      }),
      {
        swaggerOptions: swaggerOptionsConfig,
        explorer: true,
      }
    )
  );

  // Test API
  app.get("/", (req: Request, res: Response): Response => {
    return sendResponse(res, StatusCodes.SUCCESS, ResponseMessages.COMMON.SUCCESS);
  });

  // Routes
  app.use("/api", routes);

  // Global error handler
  app.use(errorHandler);

  return app;
};
