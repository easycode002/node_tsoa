import { SupplierCreateRequest } from "@/controllers/types/supplier-request";
import SupplierModel, {
  ISupplier,
  ISupplierModel,
} from "@/database/models/supplier.model";

// Define supplier class for handle CRUD operation
class SupplierRepository {
  // Create new supplier
  public async createSupplier(
    supplierRequestCreate: SupplierCreateRequest
  ): Promise<ISupplier> {
    try {
      const supplier: ISupplierModel = await SupplierModel.create(
        supplierRequestCreate
      );
      return supplier.toObject();
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

  // Update supplier By Id
  public async updateSupplier(
    id: string,
    updateData: Partial<ISupplier>
  ): Promise<ISupplier> {
    try {
      const updateSupplier = await SupplierModel.findByIdAndUpdate(
        id,
        {
          ...updateData,
          updateAt: new Date(),
        },
        { new: true }
      );
      if (!updateSupplier) {
        throw new Error(`Supplier with ID:${id} not found`);
      }
      return updateSupplier;
    } catch (error) {
      throw error;
    }
  }

  // Delete supplier
  public async deleteSupllier(id: string): Promise<ISupplier> {
    try {
      const deletedSupplier = await SupplierModel.findByIdAndUpdate(
        id,
        { deleteAt: new Date() },
        { new: true }
      );
      if (!deletedSupplier) {
        throw new Error(`Supplier ID:${id} not found`);
      }
      return deletedSupplier;
    } catch (error) {
      throw error;
    }
  }
}

// Class export
export default new SupplierRepository();
