import logger from '../utils/logger.utils';
import { Media } from '../models/media.model';
import { Request, Response } from 'express';
import type { MessageResponse } from '../interfaces/message-response';
import type { ErrorResponse } from '../interfaces/error-response';
import { uploadMediaToCloudinary } from '../utils/cloudinary.utils';

//* controller to upload media
const uploadMedia = async (req: Request, res: Response<MessageResponse | ErrorResponse>) => {
  logger.info('Upload media endpoint hit 🎯');

  try {
    if (!req.file) {
      logger.error('No file found in request payload 📂');
      return res.status(400).json({
        success: false,
        message: 'No file found. Please add a file and try again!',
      });
    }

    const { originalname, mimetype } = req.file;
    const userId = req.user?.userId;

    logger.info(`Received file: name=${originalname}, type=${mimetype} 🧾`);
    logger.info('Starting upload to Cloudinary ☁️');

    const cloudinaryUploadResult = await uploadMediaToCloudinary(req.file);

    logger.info(`Cloudinary upload successful. PublicId=${cloudinaryUploadResult.public_id} ✅`);

    const newlyCreatedMedia = new Media({
      publicId: cloudinaryUploadResult.public_id,
      originalName: originalname,
      mimeType: mimetype,
      url: cloudinaryUploadResult.secure_url,
      userId,
    });

    await newlyCreatedMedia.save();

    logger.info(`Media metadata saved to database. MediaId=${newlyCreatedMedia._id} 💾`);

    return res.status(201).json({
      success: true,
      message: 'Media uploaded successfully',
      data: {
        mediaId: newlyCreatedMedia._id,
        url: newlyCreatedMedia.url,
      },
    });
  } catch (error) {
    logger.error('Error occurred while uploading media ❌', error);
    return res.status(500).json({
      message: 'Media upload failed due to a server error',
      success: false,
      errors: error instanceof Error ? [error.message] : undefined,
    });
  }
};

//* controller to get all medias
const getAllMedias = async (req: Request, res: Response<MessageResponse | ErrorResponse>) => {
  logger.info('Get all medias endpoint hit 🎯');

  try {
    logger.info('🔍 Retrieving media records for authenticated user');

    const medias = await Media.find({ userId: req.user?.userId });

    if (medias.length === 0) {
      logger.warn('⚠️ No media records found for the current user');
      return res.status(404).json({
        success: false,
        message: "Can't find any media for this user",
      });
    }

    logger.info(`📦 Successfully fetched ${medias.length} media records`);

    return res.status(200).json({
      success: true,
      message: 'Medias fetched successfully',
      data: medias,
    });
  } catch (error) {
    logger.error('❌ Failed to fetch medias due to an error', error);
    return res.status(500).json({
      message: 'Fetching medias failed due to a server error',
      success: false,
      errors: error instanceof Error ? [error.message] : undefined,
    });
  }
};

export { uploadMedia, getAllMedias };
