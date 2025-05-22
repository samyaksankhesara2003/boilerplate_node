import { log } from '@repo/logger';
import { createClient, RedisClientType } from 'redis';

export const redisClient: RedisClientType = createClient({
    url: `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`
});

redisClient.on('error', (error) => {
    log.error('❌ Redis Client Error: ', error);
});

export default async function connectRedis() {
    if (!redisClient.isOpen) {
        await redisClient.connect();
        log.info('✅ Redis Connected');

        await redisClient.configSet('maxmemory', process.env.REDIS_MAX_MEMORY!);
        await redisClient.configSet('maxmemory-policy', process.env.REDIS_MEMORY_POLICY!);
    }
}
