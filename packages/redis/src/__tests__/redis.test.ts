import { describe, expect, it } from '@jest/globals';
import { redisConfig } from '../config';

describe('redisConfig', () => {
    it('loads application environment variables', () => {
        expect(redisConfig.host).toEqual(process.env.REDIS_HOST);
        expect(redisConfig.port).toEqual(process.env.REDIS_PORT);
        expect(redisConfig.maxmemory).toEqual(process.env.REDIS_MAX_MEMORY);
        expect(redisConfig.maxmemoryPolicy).toEqual(process.env.REDIS_MEMORY_POLICY);
    });
});
