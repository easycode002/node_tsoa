import mongoose from "mongoose";

// Define interface for Item Product
export interface IItem {
  name: string;
  category: string;
  price: number;
}

// Schema Information
const itemSchema = new mongoose.Schema<IItem>({
  name: { type: String, required: true },
  category: { type: String, required: true },
  price: { type: Number, required: true },
});

// Create a model from itemSchema.
const ItemModel = mongoose.model<IItem>("item", itemSchema);
export default ItemModel;
