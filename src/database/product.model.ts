import { Schema, model } from "mongoose";

// Interface to describe a single document
export interface IItem {
  name: string;
  category: string;
  price: number;
}

// Schema defination
const itemSchema = new Schema({
  name: { type: String, require: true },
  category: { type: String, require: true },
  price: { type: String, require: true },
});

// Create a model for the schema
const ItemModel = model<IItem>("item", itemSchema);

export default ItemModel;
