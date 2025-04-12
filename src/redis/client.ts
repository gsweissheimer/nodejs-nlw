import  { Redis } from 'ioredis';
// Pega a variável de ambiente
const redisUrlFromEnv = process.env.REDIS_URL

// LOG PARA DEBUG: Imprime a URL que está sendo lida do ambiente
console.log('[DEBUG] Valor de process.env.REDIS_URL:', redisUrlFromEnv)

export const redis = new Redis(process.env.REDIS_URL as string)