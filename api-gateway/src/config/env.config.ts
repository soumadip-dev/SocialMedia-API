import dotenv from 'dotenv';
dotenv.config();

type NodeEnv = 'development' | 'production' | 'test';
const NODE_ENVS: NodeEnv[] = ['development', 'production', 'test'];

const PORT = process.env.PORT ? Number(process.env.PORT) : 8080;
const NODE_ENV: NodeEnv = NODE_ENVS.includes(process.env.NODE_ENV as NodeEnv)
  ? (process.env.NODE_ENV as NodeEnv)
  : 'development';
const FRONTEND_URL = JSON.stringify(process.env.FRONTEND_URL);
export const ENV = {
  PORT,
  NODE_ENV,
  REDIS_URL: process.env.REDIS_URL ?? 'redis://localhost:6379',
  IDENTITY_SERVICE_URL: process.env.IDENTITY_SERVICE_URL ?? 'http://localhost:8081',
  FRONTEND_URL,
};
