import { log } from "@repo/logger";
import { appConfig } from '@repo/config';
import { connectRedis } from "@repo/redis";
import { createServer } from "./www/server";

const port = appConfig.appPort || 5001;
const server = createServer();

server.listen(port, () => {
  log.info(`${appConfig.appName} server is running on ${port} in ${appConfig.nodeEnv} mode`);
  log.info(`API documentation: ${appConfig.appBaseUrl}api-docs`);
});

connectRedis();