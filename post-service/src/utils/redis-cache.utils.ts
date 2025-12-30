import type { Request } from 'express';
import logger from './logger.utils';

export async function invalidatePostsCache(req: Request, input: string): Promise<void> {
  const redis = req.redisClient;
  if (!redis) {
    logger.warn('Redis client not available. Skipping posts cache invalidation.❌');
    return;
  }
  try {
    const PostPaginatedkeys = await redis.keys('posts:*');
    const postSpecificKey = `Post:${input}`;

    const pipeline = redis.multi();
    if (PostPaginatedkeys.length > 0) {
      pipeline.del(...PostPaginatedkeys);
    }
    pipeline.del(postSpecificKey);

    await pipeline.exec();
    logger.info(`Invalidated posts cache. Keys removed 🗑️`);
  } catch (error) {
    logger.error('Error invalidating posts cache ❌:', error);
  }
}
