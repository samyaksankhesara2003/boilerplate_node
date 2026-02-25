import { createClient, RedisClientType } from 'redis';
import { log } from '@repo/logger';
import { redisConfig } from '@repo/config';

export const redisClient: RedisClientType = createClient({
    url: `redis://:${redisConfig.redisPassword}@${redisConfig.redisHost}:${redisConfig.redisPort}`,
    socket: {
        reconnectStrategy: (retries: number) => {
            if (retries > 10) {
                log.error('Redis max reconnection attempts reached');
                return new Error('Redis max reconnection attempts reached');
            }
            return Math.min(retries * 200, 5000);
        }
    }
});

redisClient.on('error', error => {
    log.error('❌ Redis Client Error: ', error);
});

export default async function connectRedis() {
    if (!redisClient.isOpen) {
        await redisClient.connect();
        log.info('✅ Redis Connected');

        await redisClient.configSet('maxmemory', redisConfig.redisMaxmemory);
        await redisClient.configSet('maxmemory-policy', redisConfig.redisMaxmemoryPolicy);
    }
}
