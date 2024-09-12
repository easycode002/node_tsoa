import { SupplierCreateRequest } from "@/controllers/types/supplier-request";
import { ISupplier } from "@/database/models/supplier.model";
import SupplierRepository from "@/database/repositories/supplier.repository";

class SupplierService {
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
      if (!supplier) {
        throw new Error("No supplier found in the database");
      }
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

  // Update supplier with Id
  public async updateSupplier(
    id: string,
    updateData: Partial<ISupplier>
  ) {
    try {
      const updateSupplier = await SupplierRepository.updateSupplier(
        id,
        updateData
      );
      return updateSupplier;
    } catch (error) {
      throw error;
    }
  }

  // Delete supplier
  public async deleteSupplier(id: string): Promise<ISupplier> {
    try {
      const supplier = await SupplierRepository.deleteSupllier(id);
      return supplier;
    } catch (error) {
      throw error;
    }
  }
}

export default new SupplierService