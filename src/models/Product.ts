import mongoose, { Document, Schema } from 'mongoose';

export interface IProduct extends Document {
  name: string;
  description: string;
  price: number;
  stock: number;
  isActive: boolean;
  retailerId: mongoose.Types.ObjectId;
}

const ProductSchema: Schema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  stock: { type: Number, required: true, default: 0 },
  isActive: { type: Boolean, required: true, default: true },
  retailerId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
});

export default mongoose.model<IProduct>('Product', ProductSchema);
