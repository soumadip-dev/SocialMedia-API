import { Request } from 'express';
import Redis from 'ioredis';

declare global {
  namespace Express {
    interface Request {
      user?: {
        userId: string | string[];
      };
      file?: T;
      redisClient?: Redis;
    }
  }
}

export {};
