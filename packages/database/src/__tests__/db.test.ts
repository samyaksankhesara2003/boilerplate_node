import { knex } from "..";
import { describe, it, expect, jest, afterAll } from "@jest/globals";
import { log } from "@repo/logger";

describe("@repo/db", () => {
  it("prints a message", async () => {
    const logSpy = jest.spyOn(console, "log").mockImplementation(() => {});
    const result = await knex.raw("SELECT 1");
    log.info("DB: ", { rows: result });

    expect(logSpy).toHaveBeenCalledWith("[INFO]", "DB: ", { rows: result });
    logSpy.mockRestore();
  });

  afterAll(async () => {
    await knex.destroy();
  });
});
