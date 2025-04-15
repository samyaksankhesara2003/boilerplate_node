import { describe, it, expect } from "@jest/globals";
import { swaggerConfig, swaggerBasicAuthConfig } from "../swagger";
import { appConfig } from "../app";

describe("swaggerConfig", () => {
    it("loads swagger configuration", () => {
        expect(swaggerConfig.definition.openapi).toEqual('3.0.0');
        expect(swaggerConfig.definition.info.title).toEqual(`${appConfig.appName} API`);
        expect(swaggerConfig.definition.info.version).toEqual('1.0.0');
        expect(swaggerConfig.definition.info.description).toEqual(`API documentation for the ${appConfig.appName} app`);
        expect(swaggerConfig.definition.servers[0].url).toEqual(process.env.SWAGGER_API_BASE_URL);
        expect(swaggerConfig.definition.servers[0].description).toEqual(`${appConfig.environment} server`);
    });

    it("loads swagger basic auth configuration", () => {
        expect(swaggerBasicAuthConfig.userName).toEqual(process.env.SWAGGER_USERNAME);
        expect(swaggerBasicAuthConfig.password).toEqual(process.env.SWAGGER_PASSWORD);
    });
});
