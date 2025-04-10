import { json, urlencoded } from "body-parser";
import express, { type Express } from "express";
import morgan from "morgan";
import cors from "cors";

import { knex } from "@repo/db";
import { log } from "@repo/logger";

export const createServer = (): Express => {
  const app = express();
  app
    .disable("x-powered-by")
    .use(morgan("dev"))
    .use(urlencoded({ extended: true }))
    .use(json())
    .use(cors());

  knex
    .raw('SELECT 1')
    .then(() => {
      log('Connected with the database');
    })
    .catch((err) => {
      log('Unable to connect with the database', err);
    });

  app.get("/", (_, res) => {
    return res.json({ ok: true });
  });

  return app;
};
