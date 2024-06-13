import {envConfig} from 'src/config';
import {Redis} from 'ioredis';
export enum Redis_KV {
  'CALLER_CACHE' = 'CALLER_CACHE',
}
export const redisClient = new Redis(envConfig.REDIS_URL);
