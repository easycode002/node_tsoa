import { SupplierCreateRequest } from "@/controllers/types/supplier-request";
import { ISupplier } from "@/database/models/supplier.model";
import SupplierRepository from "@/database/repositories/supplier.repository";

export class SupplierService {
  // Create new supplier
  public async createSupplier(
    supplierRequestCreate: SupplierCreateRequest
  ): Promise<ISupplier> {
    try {
      const supplier = await SupplierRepository.createSupplier(
        supplierRequestCreate
      );
      return supplier;
    } catch (error) {
      throw error;
    }
  }

  // Create supplier
  public async getAllSupplier() {
    try {
      const supplier = await SupplierRepository.getAllSupplier();
      return supplier;
    } catch (error) {
      throw error;
    }
  }

  // Get supplier By Id
  public async getSupplierById(id: string): Promise<ISupplier> {
    try {
      const supplier = await SupplierRepository.getSupplierById(id);
      return supplier;
    } catch (error) {
      throw error;
    }
  }
}
