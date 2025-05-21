import { appConfig } from '@repo/config';
import { log } from '@repo/logger';
import { CustomError, ResponseMessages, StatusCodes } from '@repo/response-handler';
import { socketManager } from '@repo/socket';
import fs from 'fs';
import { createServer as createHttpServer } from 'http';
import { createServer as createHttpsServer } from 'https';
import { createServer } from './www/server';

const port = appConfig.appPort || 5001;
const app = createServer();

// Create server based on protocol
let server;
if (appConfig.isHttps) {
  const keyPath = appConfig.sslKeyPath || '';
  const certPath = appConfig.sslCertPath || '';

  if (!fs.existsSync(keyPath) || !fs.existsSync(certPath)) {
    throw new CustomError(
      ResponseMessages.SERVER.SSL_CERTIFICATES_NOT_FOUND,
      StatusCodes.NOT_FOUND
    );
  }

  const sslOptions = {
    key: fs.readFileSync(keyPath),
    cert: fs.readFileSync(certPath),
  };
  server = createHttpsServer(sslOptions, app);
} else {
  server = createHttpServer(app);
}

// Initialize Socket.IO with the HTTP server
socketManager.initialize(server);

server.listen(port, () => {
  log.info(
    `${appConfig.appName} server is running on ${port} in ${appConfig.nodeEnv} mode`
  );
  log.info(`API documentation: ${appConfig.appBaseUrl}api-docs`);
});
