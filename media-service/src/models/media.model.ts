import mongoose, { type Model, Document } from 'mongoose';

//* Interface representing a Post document
interface IMedia extends Document {
  publicId: string;
  originalName: string;
  mimeType: string;
  url: string;
  userId: mongoose.Types.ObjectId;
}

//* Mongoose schema for Post
const mediaSchema = new mongoose.Schema<IMedia>(
  {
    publicId: {
      type: String,
      required: true,
    },
    originalName: {
      type: String,
      required: true,
    },
    mimeType: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true }
);

//* Mongoose model for Post
const Media: Model<IMedia> = mongoose.models.Media || mongoose.model<IMedia>('Media', mediaSchema);

export { Media, IMedia };
