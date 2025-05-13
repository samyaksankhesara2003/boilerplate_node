import { describe, it, expect } from "@jest/globals";
import { appConfig } from "../app";

describe("appConfig", () => {
    it("loads application environment variables", () => {
        expect(appConfig.nodeEnv).toEqual(process.env.NODE_ENV || 'development');
        expect(appConfig.appName).toEqual(process.env.APP_NAME);
        expect(appConfig.appPort).toEqual(process.env?.APP_PORT || 4000);
        expect(appConfig.logDbQueries).toEqual(
            process.env.DATABASE_LOG_QUERIES ? (process.env.DATABASE_LOG_QUERIES === 'true' ? true : false) : true
        );
        expect(appConfig.allowedHosts).toEqual(process.env.ALLOWED_HOSTS);
        expect(appConfig.isHttps).toEqual(
            process.env?.IS_HTTPS ? (process.env.IS_HTTPS === 'true' ? 'https' : 'http') : true
        );
        expect(appConfig.appBaseUrl).toEqual(process.env.APP_BASE_URL);
        expect(appConfig.protocol).toEqual(
            process.env?.IS_HTTPS ? (process.env.IS_HTTPS === 'true' ? 'https' : 'http') : 'https'
        );
        expect(appConfig.appProtocol).toEqual(
            process.env?.IS_HTTPS ? (process.env.IS_HTTPS === 'true' ? 'https' : 'http') : 'https'
        );
        expect(appConfig.appHost).toEqual(
            process.env?.IS_HTTPS ? (process.env.IS_HTTPS === 'true' ? 'https' : 'http') : 'https'
        );
    });
});
