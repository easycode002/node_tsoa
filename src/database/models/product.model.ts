import { model, Schema } from "mongoose";

// Define interface for Item Product
export interface IItem {
  name: string;
  category: string;
  price: number;
}

// Schema Information
const itemSchema = new Schema<IItem>({
  name: { type: String, require: true, unique: true },
  category: { type: String, require: true },
  price: { type: Number, require: true },
});

// Create a model from itemSchema.
const ItemModel = model<IItem>("item", itemSchema);
export default ItemModel;
