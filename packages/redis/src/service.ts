import { redisClient } from './connection';

export async function getRedisData(key: string): Promise<any> {
    const cached = await redisClient.get(key);
    return cached ? JSON.parse(cached) : undefined;
}

export async function setRedisData(key: string, data: unknown, expire: number = 3600): Promise<string> {
    await redisClient.set(key, JSON.stringify(data), { EX: expire });
    return key;
}

export async function deleteRedisData(key: string): Promise<boolean> {
    const result = await redisClient.del(key);
    return result > 0;
}

export async function listRedisData(): Promise<any> {
    const cached = await redisClient.keys('*');
    return cached;
}
