import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import logger from '../utils/logger.utils';
import { ENV } from '../config/env.config';
import type { MessageResponse } from '../interfaces/message-response';
import type { ErrorResponse } from '../interfaces/error-response';

const validateToken = (
  req: Request,
  res: Response<MessageResponse | ErrorResponse>,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;
  const token = authHeader?.split(' ')[1];

  if (!token) {
    logger.warn('Access attempt without valid token ⚠️');
    return res.status(401).json({
      message: 'Authorization required',
      success: false,
    });
  }

  try {
    const decoded = jwt.verify(token, ENV.JWT_SECRET) as JwtPayload;
    req.user = decoded;
    next();
  } catch (error) {
    logger.warn('Invalid token ❌');
    return res.status(401).json({
      message: 'Invalid token',
      success: false,
    });
  }
};

export { validateToken };
