export const appConfig = {
    nodeEnv: process.env.NODE_ENV || 'development',
    appName: process.env.APP_NAME,
    appPort: process.env?.APP_PORT || 4000,
    logDbQueries: process.env.DATABASE_LOG_QUERIES ? (process.env.DATABASE_LOG_QUERIES === 'true' ? true : false) : true,
    allowedHosts: process.env.ALLOWED_HOSTS,

    isHttps: process.env?.IS_HTTPS ? (process.env.IS_HTTPS === 'true' ? 'https' : 'http') : true,
    appBaseUrl: process.env.APP_BASE_URL,
    protocol: process.env?.IS_HTTPS ? (process.env.IS_HTTPS === 'true' ? 'https' : 'http') : 'https',
    appProtocol: process.env?.IS_HTTPS ? (process.env.IS_HTTPS === 'true' ? 'https' : 'http') : 'https',
    appHost: process.env?.IS_HTTPS ? (process.env.IS_HTTPS === 'true' ? 'https' : 'http') : 'https',
};
