import Redis from 'ioredis';
import logger from './logger.utils';

export async function invalidateSearchCache(redis: Redis): Promise<void> {
  try {
    const searchKeys = await redis.keys('search:*');

    if (searchKeys.length > 0) {
      await redis.del(searchKeys);
      logger.info(`🗑️ Invalidated all search cache keys`);
    }
  } catch (error) {
    logger.error('❌ Error invalidating search cache', error);
  }
}
