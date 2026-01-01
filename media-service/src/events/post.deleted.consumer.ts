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
  const { mediaIds } = event;

  try {
    const mediaList = await Media.find({ _id: { $in: mediaIds } });

    for (const media of mediaList) {
      await deleteMediaFromCloudinary(media.publicId);
      await Media.findByIdAndDelete(media._id);

      logger.info(`Deleted media ${media._id} associated with deleted post 🗑️`);
    }

    logger.info(`Successfully processed media deletion for the post ✅`);
  } catch (error) {
    logger.error('Error occurred while deleting media for post ❌', error);
  }
};

export { handlePostDeletedEvent };
