import { NextFunction, Request, Response } from 'express';
import multer from 'multer';
import logger from '../utils/logger.utils';
import { MessageResponse } from '../interfaces/message-response';
import { ErrorResponse } from '../interfaces/error-response';

//* Configure multer for single file uploads
const singleFileUpload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
}).single('file');

//* Middleware to handle file uploads using multer
const fileUploadMiddleware = (
  req: Request,
  res: Response<MessageResponse | ErrorResponse>,
  next: NextFunction
) => {
  singleFileUpload(req, res, err => {
    if (err instanceof multer.MulterError) {
      logger.error('⚠️ Multer upload error:', err);
      return res.status(400).json({
        message: 'File upload failed due to Multer error ⚠️',
        success: false,
        errors: [err.message],
        stack: err.stack,
      } as ErrorResponse);
    } else if (err) {
      logger.error('❌ Unknown upload error occurred:', err);
      return res.status(500).json({
        message: 'An unexpected error occurred during file upload ❌',
        success: false,
        errors: [err.message],
        stack: err.stack,
      } as ErrorResponse);
    }

    if (!req.file) {
      logger.warn('⚠️ No file found in the request');
      return res.status(400).json({
        message: 'No file was uploaded ⚠️',
        success: false,
        errors: ['File is missing in the request'],
      } as ErrorResponse);
    }

    logger.info('✅ File uploaded successfully');
    next();
  });
};

export { fileUploadMiddleware };
