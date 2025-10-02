import mongoose, { Document, Schema } from 'mongoose';

export interface IRetailer extends Document {
  name: string;
  email: string;
  products: mongoose.Types.ObjectId[];
}

const RetailerSchema: Schema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  products: [{ type: Schema.Types.ObjectId, ref: 'Product' }],
});

export default mongoose.model<IRetailer>('Retailer', RetailerSchema);
