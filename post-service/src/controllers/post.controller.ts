import type { Request, Response } from 'express';
import type { MessageResponse } from '../interfaces/message-response';
import type { ErrorResponse } from '../interfaces/error-response';
import logger from '../utils/logger.utils';
import { Post } from '../models/post.model';
import { validatePost } from '../utils/validation.utils';
import { invalidatePostsCache } from '../utils/redis-cache.utils';
import { publishEvent } from '../utils/rabbitmq.utils';

//* Controller to create a post
const createPost = async (req: Request, res: Response<MessageResponse | ErrorResponse>) => {
  logger.info('Post creation endpoint hit 🎯');
  try {
    // Validate incoming request body
    const { error } = validatePost(req.body);

    if (error) {
      logger.warn(`Validation error: ${error.details[0].message} ⚠️`);
      return res.status(400).json({
        success: false,
        message: error.details[0].message,
      });
    }

    const { content, mediaIds } = req.body;
    const newlyCreatedPost = new Post({
      user: req.user?.userId,
      content,
      mediaIds: mediaIds || [],
    });

    await newlyCreatedPost.save();

    // publish post create method
    await publishEvent('post.created', {
      postId: newlyCreatedPost._id.toString(),
      userId: req.user?.userId.toString(),
      content: newlyCreatedPost.content,
      createdAt: newlyCreatedPost.createdAt,
    });

    await invalidatePostsCache(req, newlyCreatedPost._id.toString());

    logger.info(`Post created Successfully ${newlyCreatedPost} ✅ `);

    return res.status(201).json({
      message: 'Post created successfully!',
      success: true,
      data: newlyCreatedPost,
    });
  } catch (error) {
    logger.error('Error during post creation ❌', error);
    return res.status(500).json({
      message: 'Post creation failed due to a server error',
      success: false,
      errors: error instanceof Error ? [error.message] : undefined,
    });
  }
};

//* Controller to get all posts
const getAllPost = async (req: Request, res: Response<MessageResponse | ErrorResponse>) => {
  logger.info('Get all posts endpoint hit 🎯');

  try {
    const page = typeof req.query.page === 'string' ? parseInt(req.query.page, 10) : 1;
    const limit = typeof req.query.limit === 'string' ? parseInt(req.query.limit, 10) : 10;

    const startIndex = (page - 1) * limit;
    const cacheKey = `posts:${page}:${limit}`;

    // Check Redis cache
    const cachedPosts = await req.redisClient?.get(cacheKey);
    if (cachedPosts) {
      logger.info('Posts fetched from Redis cache ⚡');
      return res.status(200).json({
        success: true,
        message: 'Posts fetched successfully!',
        data: JSON.parse(cachedPosts),
      });
    }

    // Fetch posts from database
    const posts = await Post.find({}).sort({ createdAt: -1 }).skip(startIndex).limit(limit);

    const totalNumberOfPosts = await Post.countDocuments();

    const result = {
      posts,
      currentPage: page,
      totalPages: Math.ceil(totalNumberOfPosts / limit),
      totalPosts: totalNumberOfPosts,
    };

    // Save result in Redis cache for 5 minutes
    await req.redisClient?.setex(cacheKey, 300, JSON.stringify(result));

    logger.info('Posts fetched from database and cached successfully ✅');

    return res.status(200).json({
      success: true,
      message: 'Posts fetched successfully!',
      data: result,
    });
  } catch (error) {
    logger.error('Error fetching posts ❌', error);
    return res.status(500).json({
      success: false,
      message: 'Fetching posts failed due to a server error',
      errors: error instanceof Error ? [error.message] : undefined,
    });
  }
};

//* Controller to get a single post
const getPost = async (req: Request, res: Response<MessageResponse | ErrorResponse>) => {
  logger.info('Get post endpoint hit 🎯');
  try {
    const { id: postIdParam } = req.params;

    if (!postIdParam) {
      logger.warn('Post ID not provided ⚠️');
      return res.status(400).json({
        success: false,
        message: 'Post id is required',
      });
    }

    const cacheKey = `Post:${postIdParam}`;
    const cachedPost = await req.redisClient?.get(cacheKey);

    if (cachedPost) {
      logger.info('Post fetched from Redis cache ⚡');
      return res.status(200).json({
        success: true,
        message: 'Post fetched successfully!',
        data: JSON.parse(cachedPost),
      });
    }

    const post = await Post.findById(postIdParam);

    if (!post) {
      logger.warn(`Post not found for id: ${postIdParam} ⚠️`);
      return res.status(404).json({
        success: false,
        message: 'Post not found',
      });
    }

    await req.redisClient?.setex(cacheKey, 3600, JSON.stringify(post));

    logger.info(
      `Post fetched successfully for id ${postIdParam} from database and cached successfully ✅`
    );

    return res.status(200).json({
      success: true,
      message: 'Post fetched successfully!',
      data: post,
    });
  } catch (error) {
    logger.error('Error fetching post ❌', error);
    return res.status(500).json({
      message: 'Fetching post failed due to a server error',
      success: false,
      errors: error instanceof Error ? [error.message] : undefined,
    });
  }
};

//* Controller to delete a post
const deletePost = async (req: Request, res: Response<MessageResponse | ErrorResponse>) => {
  logger.info('Delete post endpoint hit 🎯');
  try {
    const { id: postIdParam } = req.params;
    const createdBy = req.user?.userId;

    if (!postIdParam) {
      logger.warn('Post ID not provided ⚠️');
      return res.status(400).json({
        success: false,
        message: 'Post id is required',
      });
    }

    const deletedPost = await Post.findOneAndDelete({ _id: postIdParam, user: createdBy });

    if (!deletedPost) {
      logger.warn(`Post not found for id: ${postIdParam} ⚠️`);
      return res.status(404).json({
        success: false,
        message: 'Post not found',
      });
    }

    // publish post delete method
    await publishEvent('post.deleted', {
      postId: deletedPost._id.toString(),
      userId: req.user?.userId.toString(),
      mediaIds: deletedPost.mediaIds,
    });

    await invalidatePostsCache(req, deletedPost._id.toString());

    logger.info(`Post deleted successfully ${deletedPost} ✅`);

    return res.status(200).json({
      success: true,
      message: 'Post deleted successfully!',
      data: deletedPost,
    });
  } catch (error) {
    logger.error('Error deleting post ❌', error);
    return res.status(500).json({
      message: 'Post deletion failed due to a server error',
      success: false,
      errors: error instanceof Error ? [error.message] : undefined,
    });
  }
};

export { createPost, getAllPost, getPost, deletePost };
