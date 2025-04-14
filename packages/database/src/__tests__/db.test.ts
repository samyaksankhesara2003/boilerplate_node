import { describe, it, expect, jest, afterAll } from "@jest/globals";
import { knex } from "..";

describe("@repo/db", () => {
  it("prints a message", async () => {
    const logSpy = jest.spyOn(console, "log").mockImplementation(() => {});
    const result = await knex.raw("SELECT 1");
    console.log("DB: ", { rows: result });
    expect(logSpy).toHaveBeenCalledWith("DB: ", { rows: result });
    logSpy.mockRestore();
  });

  afterAll(async () => {
    await knex.destroy();
  });
});
