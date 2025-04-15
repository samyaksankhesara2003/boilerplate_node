import { describe, it, expect } from "@jest/globals";
import { jwtConfig } from "../jwt";

describe("jwtConfig", () => {
    it("loads jwt environment variables", () => {
        expect(jwtConfig.jwtSecret).toEqual(process.env.JWT_SECRET || 'Techuz');
        expect(jwtConfig.jwtRefreshSecret).toEqual(process.env.JWT_REFRESH_SECRET || 'Techuz');
        expect(jwtConfig.jwtExpiresIn).toEqual(Number(process.env.JWT_EXPIRES_IN) || 86400);
        expect(jwtConfig.jwtRefreshExpiresIn).toEqual(Number(process.env.JWT_REFRESH_EXPIRES_IN) || 604800);
    });
});
