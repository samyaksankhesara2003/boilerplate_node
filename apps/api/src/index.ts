import { log } from "@repo/logger";
import { appConfig } from '@repo/config';
import { createServer } from "./www/server";

const port = appConfig.port || 5001;
const server = createServer();

server.listen(port, () => {
  log(`${appConfig.appName} server is running on ${port}`);
});
