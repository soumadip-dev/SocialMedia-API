import dotenv from 'dotenv';
dotenv.config();

type NodeEnv = 'development' | 'production' | 'test';

const port = Number(process.env.PORT) || 8083;
const nodeEnv: NodeEnv = ['development', 'production', 'test'].includes(process.env.NODE_ENV || '')
  ? (process.env.NODE_ENV as NodeEnv)
  : 'development';
const redisurl = process.env.REDIS_URL || '';
const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000';

export const ENV = {
  PORT: port,
  NODE_ENV: nodeEnv,
  REDIS_URL: redisurl,
  FRONTEND_URL: frontendUrl,
};
