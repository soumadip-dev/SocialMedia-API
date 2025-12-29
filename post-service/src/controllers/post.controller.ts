import type { Request, Response } from 'express';
import type { MessageResponse } from '../interfaces/message-response';
import type { ErrorResponse } from '../interfaces/error-response';
import logger from '../utils/logger.utils';
import { Post } from '../models/post.model';

//* Controller to create a post
const createPost = async (req: Request, res: Response<MessageResponse | ErrorResponse>) => {
  logger.info('Post creation endpoint hit 🎯');
  try {
    const { content, mediaIds } = req.body;
    const newlyCreatedPost = new Post({
      user: req.user?.userId,
      content,
      mediaIds: mediaIds || [],
    });

    await newlyCreatedPost.save();

    logger.info(`Post created Successfully ${newlyCreatedPost} ✅ `);

    return res.status(201).json({
      message: 'Post created successfully!',
      success: true,
      data: {},
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
  } catch (error) {
    logger.error('Error fetching posts ❌', error);
    return res.status(500).json({
      message: 'Fetching posts failed due to a server error',
      success: false,
      errors: error instanceof Error ? [error.message] : undefined,
    });
  }
};

//* Controller to get a single post
const getPost = async (req: Request, res: Response<MessageResponse | ErrorResponse>) => {
  logger.info('Get post endpoint hit 🎯');
  try {
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
