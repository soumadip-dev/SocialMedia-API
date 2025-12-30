import dotenv from 'dotenv';
dotenv.config();

type NodeEnv = 'development' | 'production' | 'test';

export const ENV = {
  PORT: Number(process.env.PORT) || 8083,
  NODE_ENV: ['development', 'production', 'test'].includes(process.env.NODE_ENV || '')
    ? (process.env.NODE_ENV as NodeEnv)
    : 'development',
  REDIS_URL: process.env.REDIS_URL || '',
  FRONTEND_URL: process.env.FRONTEND_URL || 'http://localhost:3000',
  MONGO_URI: process.env.MONGO_URI || '',
  CLOUDINARY_CLOUD_NAME: process.env.CLOUDINARY_CLOUD_NAME || '',
  CLOUDINARY_API_KEY: process.env.CLOUDINARY_API_KEY || '',
  CLOUDINARY_API_SECRET: process.env.CLOUDINARY_API_SECRET || '',
};
