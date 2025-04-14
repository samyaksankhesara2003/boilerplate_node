import { describe, it, expect } from "@jest/globals";
import { appConfig } from "../app";

describe("appConfig", () => {
    it("loads environment variables", () => {
        expect(appConfig.environment).toEqual(process.env.NODE_ENV || 'development');
        expect(appConfig.appName).toEqual(process.env.APP_NAME);
        expect(appConfig.port).toEqual(process.env.SERVER_PORT || 4000);
        expect(appConfig.logging.debugSQL).toEqual(
            !!process.env.DEBUG_SQL || false
        );
        expect(appConfig.enableLogging).toEqual(
            !!process.env.ENABLE_LOGGING || false
        );
        expect(appConfig.allowedHosts).toEqual(process.env.ALLOWED_HOSTS);
        expect(appConfig.isHttps).toEqual(
            process.env?.IS_HTTPS ? (process.env.IS_HTTPS === 'true' ? 'https' : 'http') : true
        );
        expect(appConfig.appDomain).toEqual(process.env.APP_DOMAIN);
        expect(appConfig.appUrl).toEqual(process.env.APP_URL);
        expect(appConfig.protocol).toEqual(
            process.env?.IS_HTTPS ? (process.env.IS_HTTPS === 'true' ? 'https' : 'http') : 'https'
        );
        expect(appConfig.appProtocol).toEqual(
            process.env?.IS_HTTPS ? (process.env.IS_HTTPS === 'true' ? 'https' : 'http') : 'https'
        );
        expect(appConfig.appHost).toEqual(
            process.env?.IS_HTTPS ? (process.env.IS_HTTPS === 'true' ? 'https' : 'http') : 'https'
        );
        expect(appConfig.appPort).toEqual(process.env?.SERVER_PORT || 4000);
        expect(appConfig.jwtSecret).toEqual(process.env.JWT_SECRET || 'Techuz');
        expect(appConfig.jwtRefreshSecret).toEqual(process.env.JWT_REFRESH_SECRET || 'Techuz');
        expect(appConfig.jwtExpiresIn).toEqual(process.env.JWT_EXPIRES_IN || '1d');
        expect(appConfig.jwtRefreshExpiresIn).toEqual(process.env.JWT_REFRESH_EXPIRES_IN || '7d');
    });
});
