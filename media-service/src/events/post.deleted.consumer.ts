import mongoose from 'mongoose';
import logger from '../utils/logger.utils';
import { deleteMediaFromCloudinary } from '../utils/cloudinary.utils';
import { Media } from '../models/media.model';

interface IPostDeletedEvent {
  postId: string;
  userId: mongoose.Types.ObjectId;
  mediaIds: mongoose.Types.ObjectId[];
}

const handlePostDeletedEvent = async (event: IPostDeletedEvent): Promise<void> => {
  const { mediaIds, postId } = event;

  try {
    const mediaList = await Media.find({ _id: { $in: mediaIds } });

    for (const media of mediaList) {
      await deleteMediaFromCloudinary(media.publicId);
      await Media.findByIdAndDelete(media._id);

      logger.info(`🗑️ Media deleted | MediaID: ${media._id} | PostID: ${postId}`);
    }

    logger.info(`✅ Media deletion completed successfully | PostID: ${postId}`);
  } catch (error) {
    logger.error(`❌ Failed to delete media for post | PostID: ${postId}`, error);
  }
};

export { handlePostDeletedEvent };
