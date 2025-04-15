import { log } from "@repo/logger";
import { appConfig } from '@repo/config';
import { createServer } from "./www/server";

const port = appConfig.port || 5001;
const server = createServer();

server.listen(port, () => {
  log.info(`${appConfig.appName} server is running on ${port} in ${appConfig.environment} mode`);
  log.info(`API documentation: ${appConfig.appBaseUrl}api-docs`);
});
