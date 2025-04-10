import { config as loadEnv } from 'dotenv';
import path from 'path';
loadEnv({ path: path.resolve(__dirname,'../../../../.env') });

export const appConfig = {
    appName: process.env.APP_NAME,
    port: process.env.SERVER_PORT || 4000,
    logging: { debugSQL: !!process.env.DEBUG_SQL || false },
    enableLogging: !!process.env.ENABLE_LOGGING || false,
    allowedHosts: process.env.ALLOWED_HOSTS,
    slackWebHook: process.env.SLACK_WEBHOOK || null,

    isHttps: process.env?.IS_HTTPS ? (process.env.IS_HTTPS === 'true' ? 'https' : 'http') : true,
    appDomain: process.env.APP_DOMAIN,
    appUrl: process.env.APP_URL,
    protocol: process.env?.IS_HTTPS ? (process.env.IS_HTTPS === 'true' ? 'https' : 'http') : 'https',
    appProtocol: process.env?.IS_HTTPS ? (process.env.IS_HTTPS === 'true' ? 'https' : 'http') : 'https',
    appHost: process.env?.IS_HTTPS ? (process.env.IS_HTTPS === 'true' ? 'https' : 'http') : 'https',
    appPort: process.env?.SERVER_PORT || 4000
};

export default appConfig;
