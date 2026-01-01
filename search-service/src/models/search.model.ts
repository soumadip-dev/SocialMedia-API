import mongoose, { type Model, Document } from 'mongoose';

//* Interface representing a Search document
interface ISearch extends Document {
  postId: string;
  userId: string;
  content: string;
  createdAt: Date;
}

//* Mongoose schema for Search
const searchPostSchema = new mongoose.Schema<ISearch>(
  {
    postId: {
      type: String,
      required: true,
      unique: true,
    },
    userId: {
      type: String,
      required: true,
      index: true,
    },
    content: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

searchPostSchema.index({ content: 'text' });
searchPostSchema.index({ createdAt: -1 });

//* Mongoose model for Search
const Search: Model<ISearch> =
  mongoose.models.Search || mongoose.model<ISearch>('Search', searchPostSchema);

export { Search, ISearch };
