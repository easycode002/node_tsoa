import {
  ProductCreateRequest,
  ProductUpdateRequest,
} from "./types/product-request";
import { ProductResponse } from "@/controllers/types/user-response";
import { IItem } from "@/database/models/product.model";
import { ProductService } from "@/services/product.service";
import {
  Body,
  Controller,
  Get,
  Path,
  Post,
  Response,
  Route,
  Put,
  Middlewares,
  Delete,
} from "tsoa";
// import validateRequest from "@/middlewares/validate-input";

@Route("v1/product")
export class ProductController extends Controller {
  // Create new product
  private productService = new ProductService();
  @Post()
  @Response(201, "Create success")
  @Middlewares()
  public async createItem(
    @Body() requestBody: ProductCreateRequest
  ): Promise<ProductResponse> {
    try {
      const newProduct = await this.productService.createProduct(requestBody);
      return {
        message: "Prodct created!",
        data: {
          name: newProduct.name,
          category: newProduct.category,
          price: newProduct.price,
        },
      };
    } catch (error) {
      throw error;
    }
  }

  // Get single product with id
  @Get("{id}")
  @Response(404, "Not found")
  public async getProductById(@Path() id: string) {
    try {
      const product = await this.productService.getProductById(id);
      if (!product) {
        throw new Error(' Product not found')
        // this.setStatus(404);
        // return {
        //   message: `Product ID:${id} not found`,
        //   data: null,
        // };
      }
      console.log(id);
      return {
        message: "All product avaible in database",
        data: product,
      };
    } catch (error) {
      throw error;
    }
  }

  // Update product
  @Put("{id}")
  public async updateProduct(
    @Path() id: string,
    @Body() requestBody: ProductUpdateRequest
  ): Promise<ProductResponse> {
    try {
      const newProduct = await this.productService.updateProduct(
        id,
        requestBody
      );
      return {
        message: `Product Id:${id} updated!`,
        data: newProduct,
      };
    } catch (error) {
      throw error;
    }
  }

  // Delete product
  @Delete("{id}")
  @Response(204,"Product deleted")
  public async deleteProduct(@Path() id: string): Promise<void> {
    try {
      await this.productService.deleteProduct(id);
    } catch (error) {
      throw error;
    }
  }

  // Get all product
  @Get()
  public async getAllProduct(): Promise<{ message: string; data: IItem[] }> {
    try {
      const product = await this.productService.getAllProduct();
      return {
        message: "All product available.",
        data: product,
      };
    } catch (error) {
      throw error;
    }
  }
}
