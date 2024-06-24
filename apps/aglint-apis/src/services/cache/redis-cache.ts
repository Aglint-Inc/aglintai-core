import {envConfig} from 'src/config';
import {Redis} from 'ioredis';
export enum Redis_KV {
  'CALLER_CACHE' = 'CALLER_CACHE',
  'CAND_INFO' = 'CAND_INFO',
}
export const redisClient = new Redis(envConfig.REDIS_URL);
