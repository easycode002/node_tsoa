// Import module need
import mongoose, { Document } from "mongoose";

// Define interface for supplier
export interface ISupplier {
  first_name: string;
  last_name: string;
  gender: number;
  email: string;
  phone_number: string;
  address: string;
  date_of_birth: Date;
  createAt?: Date;
  updateAt?: Date;
  deleteAt?: Date;
}

// Define interface for mongoDb document
export interface ISupplierModel extends ISupplier, Document {}

// Define schema
const supplierSchema = new mongoose.Schema<ISupplierModel>({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  gender: { type: Number, required: true },
  email: { type: String, required: true, unique: true },
  phone_number: { type: String, required: true },
  address: { type: String, required: true },
  date_of_birth: { type: Date, default: Date.now() },
  createAt: { type: Date, default: Date.now, required: false },
  updateAt: { type: Date, default: null },
  deleteAt: { type: Date, default: null },
});

// Define supplier model
const SupplierModel = mongoose.model<ISupplierModel>(
  "supplier",
  supplierSchema
);
export default SupplierModel;
