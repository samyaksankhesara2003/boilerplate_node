import { describe, it, expect } from "@jest/globals";
import { swaggerJsDocConfig, swaggerBasicAuthConfig } from "../swagger";
import { appConfig } from "../app";

describe("swaggerConfig", () => {
    it("loads swagger jsdoc configuration", () => {
        expect(swaggerJsDocConfig.definition.openapi).toEqual('3.0.0');
        expect(swaggerJsDocConfig.definition.info.title).toEqual(`${appConfig.appName} API's`);
        expect(swaggerJsDocConfig.definition.info.version).toEqual('1.0.0');
        expect(swaggerJsDocConfig.definition.info.description).toEqual(`API documentation for the ${appConfig.appName} app`);
        expect(swaggerJsDocConfig.definition.servers[0].url).toEqual(process.env.SWAGGER_API_BASE_URL);
        expect(swaggerJsDocConfig.definition.servers[0].description).toEqual(`${appConfig.nodeEnv} server`);
    });

    it("loads swagger basic auth configuration", () => {
        expect(swaggerBasicAuthConfig.userName).toEqual(process.env.SWAGGER_USERNAME);
        expect(swaggerBasicAuthConfig.password).toEqual(process.env.SWAGGER_PASSWORD);
    });
});
