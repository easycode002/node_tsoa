import { SupplierCreateRequest } from "@/controllers/types/supplier-request";
import SupplierModel, { ISupplier } from "@/database/models/supplier.model";

// Define supplier class for handle CRUD operation
class SupplierRepository {
  // Create new supplier
  public async createSupplier(
    supplierRequestCreate: SupplierCreateRequest
  ): Promise<ISupplier> {
    try {
      const supplier = await SupplierModel.create(supplierRequestCreate);
      return supplier;
    } catch (error) {
      // Throw error to Global error
      throw error;
    }
  }

  // Get all supplier
  public async getAllSupplier() {
    try {
      const supplier = await SupplierModel.find();
      if (!supplier) {
        throw new Error(`No product found in database`);
      }
      return supplier;
    } catch (error) {
      throw error;
    }
  }

  // Get supplier By Id
  public async getSupplierById(id: string): Promise<ISupplier> {
    try {
      const supplier = await SupplierModel.findById(id);
      if (!supplier) {
        throw new Error(`Supplier ID:${id} not found.`);
      }
      return supplier;
    } catch (error) {
      throw error;
    }
  }
}

// Class export
export default new SupplierRepository();
