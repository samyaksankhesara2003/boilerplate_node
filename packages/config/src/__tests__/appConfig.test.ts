import { describe, it, expect } from "@jest/globals";
import { appConfig } from "../app";

describe("appConfig", () => {
    it("loads application environment variables", () => {
        expect(appConfig.nodeEnv).toEqual(process.env.NODE_ENV || 'development');
        expect(appConfig.appName).toEqual(process.env.APP_NAME);
        expect(appConfig.appPort).toEqual(process.env?.APP_PORT || 4000);
        expect(appConfig.logging.debugSQL).toEqual(
            !!process.env.DEBUG_SQL || false
        );
        expect(appConfig.enableLogging).toEqual(
            !!process.env.ENABLE_LOGGING || false
        );
        expect(appConfig.logDbQueries).toEqual(
            process.env.LOG_DB_QUERIES ? (process.env.LOG_DB_QUERIES === 'true' ? true : false) : true
        );
        expect(appConfig.allowedHosts).toEqual(process.env.ALLOWED_HOSTS);
        expect(appConfig.isHttps).toEqual(
            process.env?.IS_HTTPS ? (process.env.IS_HTTPS === 'true' ? 'https' : 'http') : true
        );
        expect(appConfig.appDomain).toEqual(process.env.APP_DOMAIN);
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
