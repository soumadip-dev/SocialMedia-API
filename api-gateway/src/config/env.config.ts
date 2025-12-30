import dotenv from 'dotenv';
dotenv.config();

type NodeEnv = 'development' | 'production' | 'test';

export const ENV = {
  PORT: Number(process.env.PORT) || 8080,
  NODE_ENV: ['development', 'production', 'test'].includes(process.env.NODE_ENV || '')
    ? (process.env.NODE_ENV as NodeEnv)
    : 'development',
  REDIS_URL: process.env.REDIS_URL || 'redis://localhost:6379',
  IDENTITY_SERVICE_URL: process.env.IDENTITY_SERVICE_URL || 'http://localhost:8081',
  POST_SERVICE_URL: process.env.POST_SERVICE_URL || 'http://localhost:8083',
  MEDIA_SERVICE_URL: process.env.MEDIA_SERVICE_URL || 'http://localhost:8082',
  SEARCH_SERVICE_URL: process.env.SEARCH_SERVICE_URL || 'http://localhost:8084',
  FRONTEND_URL: process.env.FRONTEND_URL || 'http://localhost:3000',
  JWT_SECRET: process.env.JWT_SECRET || '',
};
