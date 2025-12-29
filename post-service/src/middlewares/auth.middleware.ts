import { NextFunction, Request, Response } from 'express';
import logger from '../utils/logger.utils';
import type { MessageResponse } from '../interfaces/message-response';
import type { ErrorResponse } from '../interfaces/error-response';

const isAuthenticated = (
  req: Request,
  res: Response<MessageResponse | ErrorResponse>,
  next: NextFunction
) => {
  logger.info('Auth middleware hit');

  const userId = req.headers['x-user-id'];

  if (!userId) {
    logger.warn('Access attempted without user ID');
    return res.status(401).json({
      success: false,
      message: 'Authentication required. Please log in to continue.',
    });
  }

  req.user = { userId };
  next();
};

export default isAuthenticated;
