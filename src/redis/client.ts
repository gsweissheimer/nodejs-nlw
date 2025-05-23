import  { Redis } from 'ioredis';
const redisUrlFromEnv = process.env.REDIS_URL
export const redis = new Redis(process.env.REDIS_URL as string)