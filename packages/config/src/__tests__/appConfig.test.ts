import { describe, it, expect } from "@jest/globals";
import { appConfig } from "../app";

describe("appConfig", () => {
    it("loads environment variables", () => {
        expect(appConfig.appName).toEqual(process.env.APP_NAME);
        expect(appConfig.port).toEqual(process.env.SERVER_PORT || 4000);
        expect(appConfig.logging.debugSQL).toEqual(
            !!process.env.DEBUG_SQL || false
        );
        expect(appConfig.enableLogging).toEqual(
            !!process.env.ENABLE_LOGGING || false
        );
        expect(appConfig.allowedHosts).toEqual(process.env.ALLOWED_HOSTS);
        expect(appConfig.slackWebHook).toEqual(process.env.SLACK_WEBHOOK || null);
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
    });
});
