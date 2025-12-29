import mongoose, { type Model, Document } from 'mongoose';

//* Interface representing a Post document
interface IPost extends Document {
  user: mongoose.Types.ObjectId;
  content: string;
  mediaUrls: string[];
  createdAt: Date;
}

//* Mongoose schema for Post
const postSchema = new mongoose.Schema<IPost>(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    content: {
      type: String,
      required: true,
    },
    mediaUrls: [
      {
        type: String,
      },
    ],
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

postSchema.index({ content: 'text' }); // It is optional because search is handled by another service.

//* Mongoose model for Post
const Post: Model<IPost> = mongoose.models.Post || mongoose.model<IPost>('Post', postSchema);

export { Post, IPost };
