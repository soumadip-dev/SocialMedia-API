import type { Request } from 'express';
import logger from './logger.utils';

export async function invalidatePostsCache(req: Request, input: string): Promise<void> {
  const redis = req.redisClient;
  if (!redis) {
    logger.warn('Redis client not available. Skipping posts cache invalidation.❌');
    return;
  }

  const keys = await redis.keys('posts:*');
  if (keys.length > 0) {
    await redis.del(keys);
  }
  logger.info(`Invalidated posts cache. Keys removed 🗑️`);
}
