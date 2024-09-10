import { Body, Controller, Route, Post, Tags, Get, Path } from "tsoa";
import { SupplierResponse } from "@/controllers/types/supplier-response";
import { SupplierCreateRequest } from "@/controllers/types/supplier-request";
import { SupplierService } from "@/services/supplier.service";
import { ISupplier } from "@/database/models/supplier.model";

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
    // console.log(`Request body:`, requestBody);
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

  // Get all supplier
  @Get()
  public async getAllSupplier(): Promise<{
    message: string;
    data: ISupplier[];
  }> {
    try {
      const supplier = await this.supplierService.getAllSupplier();
      if (!supplier) {
        throw new Error(`No product available in database.`);
      }
      return {
        message: "Product available",
        data: supplier,
      };
    } catch (error) {
      throw error;
    }
  }

  // Get supplier By Id
  @Get("{id}")
  public async getSupplierById(@Path() id: string) {
    try {
      const supplier = this.supplierService.getSupplierById(id);
      if (!supplier) {
        throw new Error(`Supplier ID:${id} not found`);
      }
      return supplier;
    } catch (error) {
      throw error;
    }
  }
}
