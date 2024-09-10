import { Body, Controller, Route, Post, Tags } from "tsoa";
import { SupplierResponse } from "@/controllers/types/supplier-response";
import { SupplierCreateRequest } from "@/controllers/types/supplier-request";
import { SupplierService } from "@/services/supplier.service";

// Define supplier class
@Route("v1/supplier")
@Tags("Supplier")
export class SupplierController extends Controller {
  private supplierService = new SupplierService();

  // Create new instand of SupplierService
  @Post()
  public async createSupplier(
    @Body() requestBody: SupplierCreateRequest
  ): Promise<SupplierResponse> {
    console.log(`Request body:`, requestBody);
    try {
      const supplier = await this.supplierService.createSupplier(requestBody);
      console.log(supplier);
      return {
        message: "Supplier created",
        data: supplier,
      };
    } catch (error) {
      console.error(`Error creating supplier`, error);
      throw error;
    }
  }
}
