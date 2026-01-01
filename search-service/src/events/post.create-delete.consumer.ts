import logger from '../utils/logger.utils';
import { Search } from '../models/search.model';
import mongoose from 'mongoose';

interface IPostCreatedEvent {
  postId: string;
  userId: string;
  content: string;
  createdAt: Date;
}

interface IPostDeletedEvent {
  postId: string;
  userId: string;
  mediaIds: mongoose.Types.ObjectId[];
}

//* Handler for creating a new search entry when a post is created
const handlePostCreatedEvent = async (event: IPostCreatedEvent): Promise<void> => {
  const { postId, userId, content, createdAt } = event;

  try {
    const newSearchPost = new Search({
      postId,
      userId,
      content,
      createdAt,
    });

    await newSearchPost.save();

    logger.info(
      `✅ Search post successfully created | PostID: ${postId}, SearchID: ${newSearchPost._id.toString()}`
    );
  } catch (error) {
    logger.error(`❌ Failed to create search post | PostID: ${postId}`, error);
  }
};

//* Handler for deleting a search entry when a post is deleted
const handlePostDeletedEvent = async (event: IPostDeletedEvent): Promise<void> => {
  const { postId } = event;

  try {
    const deleted = await Search.findOneAndDelete({ postId });

    if (deleted) {
      logger.info(`🗑️ Search post successfully deleted | PostID: ${postId}`);
    } else {
      logger.warn(`⚠️ No search post found to delete | PostID: ${postId}`);
    }
  } catch (error) {
    logger.error(`❌ Failed to delete search post | PostID: ${postId}`, error);
  }
};

export { handlePostDeletedEvent, handlePostCreatedEvent };
