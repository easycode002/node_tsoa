import { ISupplier } from "@/database/models/supplier.model";

export interface SupplierResponse {
  message: string;
  data: ISupplier;
}
