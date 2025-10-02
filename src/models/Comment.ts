import mongoose, { Document, Schema } from 'mongoose';

export interface IComment extends Document {
  text: string;
  userId: mongoose.Types.ObjectId;
  productId: mongoose.Types.ObjectId;
}

const CommentSchema: Schema = new Schema({
  text: { type: String, required: true },
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
});

export default mongoose.model<IComment>('Comment', CommentSchema);
