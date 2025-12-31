import cloudinary from '../config/cloudinary.config';
import { UploadApiErrorResponse, UploadApiResponse } from 'cloudinary';
import logger from './logger.utils';

//* Upload media to cloudinary
const uploadMediaToCloudinary = (file: any): Promise<UploadApiResponse> => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { resource_type: 'auto' },
      (error: UploadApiErrorResponse | undefined, result: UploadApiResponse | undefined) => {
        if (error) {
          logger.error('Error while uploading media to Cloudinary ❌', error);
          reject(error);
        } else if (result) {
          resolve(result);
        }
      }
    );

    uploadStream.end(file.buffer);
  });
};

//* Delete media from cloudinary
const deleteMediaFromCloudinary = async (publicId: string) => {
  try {
    const result = await cloudinary.uploader.destroy(publicId);
    logger.info('Media deleted successfuly from cloud stroage ✅', publicId);
    return result;
  } catch (error) {
    logger.error('Error deleting media from cludinary ❌', error);
    throw error;
  }
};

export { uploadMediaToCloudinary, deleteMediaFromCloudinary };
