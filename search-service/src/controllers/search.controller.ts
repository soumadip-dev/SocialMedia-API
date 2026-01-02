import { Request, Response } from 'express';
import { MessageResponse } from '../interfaces/message-response';
import { ErrorResponse } from '../interfaces/error-response';
import logger from '../utils/logger.utils';
import { Search } from '../models/search.model';
import { redisClient } from '../app';

//* Controller to search posts
const searchPostController = async (
  req: Request,
  res: Response<MessageResponse | ErrorResponse>
) => {
  logger.info('Search endpoint hit 🎯');
  try {
    const { query } = req.query;

    if (typeof query !== 'string' || !query.trim()) {
      return res.status(400).json({
        success: false,
        message: 'Query must be a non-empty string',
      });
    }
    const cacheKey = `search:${query}`;

    const cachedSearchResults = await redisClient?.get(cacheKey);

    if (cachedSearchResults) {
      logger.info('Searching from Redis cache ⚡');
      return res.status(200).json({
        success: true,
        message: 'Posts retrieved successfully',
        data: JSON.parse(cachedSearchResults),
      });
    }

    const searchResults = await Search.find(
      {
        $text: { $search: query },
      },
      {
        score: { $meta: 'textScore' },
      }
    )
      .sort({ score: { $meta: 'textScore' } })
      .limit(10);

    // Save searchResult in Redis cache for 5 minutes
    await redisClient?.setex(cacheKey, 300, JSON.stringify(searchResults));

    logger.info('Search results fetched from database and cached successfully ✅');

    return res.status(200).json({
      success: true,
      message: 'Posts retrieved successfully',
      data: searchResults,
    });
  } catch (error) {
    logger.error('Error occurred while searching posts ❌', error);

    return res.status(500).json({
      success: false,
      message: 'Search failed due to an internal server error',
      errors: error instanceof Error ? [error.message] : undefined,
    });
  }
};

export { searchPostController };
