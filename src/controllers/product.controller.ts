import { ProductCreateRequest } from "./types/product-request";
import { ProductResponse } from "@/controllers/types/user-response";
import { ProductService } from "@/services/product.service";
import { Body, Controller, Get, Path, Post, Response, Route } from "tsoa";

@Route("v1/product")
export class ProductController extends Controller {
  // Create new product
  private productService = new ProductService();
  @Post()
  @Response(201, "Create success")
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
  public async getProductById(@Path() Id: string) {
    try {
      const product = this.productService.getProductById(Id);
      if (!product) {
        this.setStatus(404);
        return {
          message: `Product ID:${Id} not found`,
          data: null,
        };
      }
      return {
        message: "All product avaible in database",
        data: product,
      };
    } catch (error) {
      throw error;
    }
  }
}
