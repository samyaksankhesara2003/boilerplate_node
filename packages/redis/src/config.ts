export const redisConfig = {
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
    maxmemory: process.env.REDIS_MAX_MEMORY,
    maxmemoryPolicy: process.env.REDIS_MEMORY_POLICY
};
