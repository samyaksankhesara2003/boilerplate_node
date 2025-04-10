import supertest from "supertest";
import { describe, it, expect } from "@jest/globals";
import { knex } from "@repo/db";
import { log } from "@repo/logger";
import { createServer } from "../www/server";

describe("Server", () => {
  it("health check returns 200", async () => {
    await supertest(createServer())
      .get("/")
      .expect(200)
      .then((res) => {
        expect(res.ok).toBe(true);
      });
  });

  it("checks database connection", async () => {
    await knex
      .raw('SELECT 1')
      .then(() => {
        log('Connected with the database');
        expect(true).toBe(true);
      })
      .catch((err) => {
        log('Unable to connect with the database', err);
        expect(false).toBe(true);
      });
  });
});
