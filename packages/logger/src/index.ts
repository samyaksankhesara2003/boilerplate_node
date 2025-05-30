import pino from 'pino';
import fs from 'fs';
import path from 'path';
import { loggerConfig } from '@repo/config';

const { logLevel, enableFile, logFilePath } = loggerConfig;

const transportStreams: Array<pino.TransportTargetOptions | pino.TransportPipelineOptions> = [
    {
        target: 'pino-pretty',
        level: logLevel,
        options: {
            colorize: true,
            translateTime: 'SYS:standard',
            ignore: 'pid,hostname'
        }
    }
];

if (enableFile) {
    const dir = path.dirname(logFilePath);
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }

    transportStreams.push({
        target: 'pino/file',
        level: logLevel,
        options: { destination: logFilePath, mkdir: true }
    });
}

export const log = pino(
    {
        level: logLevel
    },
    pino.transport({
        targets: transportStreams
    })
);
