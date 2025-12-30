import dotenv from 'dotenv';
dotenv.config();

type NodeEnv = 'development' | 'production' | 'test';

export const ENV = {
  PORT: Number(process.env.PORT) || 8080,
  NODE_ENV: ['development', 'production', 'test'].includes(process.env.NODE_ENV || '')
    ? (process.env.NODE_ENV as NodeEnv)
    : 'development',
  MONGO_URI: process.env.MONGO_URI || '',
  JWT_SECRET: process.env.JWT_SECRET || '',
  FRONTEND_URL: process.env.FRONTEND_URL || '',
  REDIS_URL: process.env.REDIS_URL || '',
};
