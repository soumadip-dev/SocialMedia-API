import { v2 as cloudinary, UploadApiErrorResponse, UploadApiResponse } from 'cloudinary';
import logger from './logger.utils';
import { ENV } from '../config/env.config';

cloudinary.config({
  cloud_name: ENV.CLOUDINARY_CLOUD_NAME,
  api_key: ENV.CLOUDINARY_API_KEY,
  api_secret: ENV.CLOUDINARY_API_SECRET,
});

const uploadMediaToCloudinary = (file: any): Promise<UploadApiResponse> => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        resource_type: 'auto',
      },
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

export { uploadMediaToCloudinary };
