import { json, urlencoded } from "body-parser";
import express, { NextFunction, Request, Response, type Express } from "express";
import morgan from "morgan";
import cors from "cors";

import { knex } from "@repo/db";
import { log } from "@repo/logger";
import { appConfig } from "@repo/config";
import { responseModifier } from "../middlewares/responseModifier";
import routes from "../routers/index";

export const createServer = (): Express => {
  const app = express();
  app
    .disable("x-powered-by")
    .use(morgan("dev"))
    .use(urlencoded({ extended: true }))
    .use(json())
    .use(cors({
      origin: appConfig?.allowedHosts?.split(',') || '*',
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
