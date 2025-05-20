import { appConfig } from '@repo/config';
import { log } from '@repo/logger';
import { socketManager } from '@repo/socket';
import { createServer as createHttpServer } from 'http'; // <-- Add this
import { createServer } from './www/server';

const port = appConfig.appPort || 5001;
const app = createServer();
const server = createHttpServer(app); // <-- Create HTTP server from Express app

// Initialize Socket.IO with the HTTP server
socketManager.initialize(server);

server.listen(port, () => {
  log.info(
    `${appConfig.appName} server is running on ${port} in ${appConfig.nodeEnv} mode`
  );
  log.info(`API documentation: ${appConfig.appBaseUrl}api-docs`);
});
