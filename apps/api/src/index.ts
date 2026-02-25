import fs from 'fs';
import { createServer as createHttpServer, Server as HttpServer } from 'http';
import { createServer as createHttpsServer, Server as HttpsServer } from 'https';

import { knex } from '@repo/db';
import { log } from '@repo/logger';
import { appConfig } from '@repo/config';
import { connectRedis, redisClient } from '@repo/redis';
import { socketManager } from '@repo/socket';
import { CustomError, ResponseMessages, StatusCodes } from '@repo/response-handler';
import { createServer } from './www/server';

const port = appConfig.appPort || 5001;
const app = createServer();

// Create server based on protocol
let server: HttpServer | HttpsServer;
function createHttpsOptions() {
    const keyPath = appConfig.sslKeyPath;
    const certPath = appConfig.sslCertPath;

    if (!fs.existsSync(keyPath) || !fs.existsSync(certPath)) {
        throw new CustomError(ResponseMessages.SERVER.SSL_CERTIFICATES_NOT_FOUND, StatusCodes.NOT_FOUND);
    }

    return {
        key: fs.readFileSync(keyPath),
        cert: fs.readFileSync(certPath)
    };
}

if (appConfig.isHttps) {
    const sslOptions = createHttpsOptions();
    server = createHttpsServer(sslOptions, app);
} else {
    server = createHttpServer(app);
}

// Initialize Socket.IO with the HTTP server
socketManager.initialize(server);

// Connect to Redis
connectRedis();

// Test DB connection
knex.raw('SELECT 1')
    .then(() => {
        log.info('✅ Connected with the database');
        server.listen(port, () => {
            log.info(`✅ ${appConfig.appName} server is running on ${port} in ${appConfig.nodeEnv} mode`);
            log.info(`✅ API documentation: ${appConfig.appBaseUrl}api-docs`);
        });
    })
    .catch(err => {
        log.error('❌ Unable to connect with the database', err);
        process.exit(1);
    });

// Error handling
server.on('error', (err: NodeJS.ErrnoException) => {
    if (err.code === 'EADDRINUSE') {
        log.error(` ❌ Port ${port} is already in use`);
    } else {
        log.error('❌ Server error:', err);
    }
    process.exit(1);
});

// Graceful shutdown
const gracefulShutdown = async (signal: string) => {
    log.info(`${signal} received. Starting graceful shutdown...`);

    server.close(async () => {
        log.info('HTTP server closed');

        try {
            await knex.destroy();
            log.info('Database connections closed');
        } catch (err) {
            log.error('Error closing database connections:', err);
        }

        try {
            await redisClient.quit();
            log.info('Redis connection closed');
        } catch (err) {
            log.error('Error closing Redis connection:', err);
        }

        process.exit(0);
    });

    // Force shutdown after 30s if graceful shutdown hangs
    setTimeout(() => {
        log.error('Graceful shutdown timed out. Forcing exit.');
        process.exit(1);
    }, 30000);
};

process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));
