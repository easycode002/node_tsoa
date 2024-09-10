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
      console.error(`error in repo`, error);
      throw error;
    }
  }
}

// Class export
export default new SupplierRepository();
