import { Controller, Route, Body, Post, Response } from "tsoa";
import { ProductCreateRequest } from "@/controllers/types/product-request.type";
import { ProductResponse } from "@/controllers/types/user-response.type";
import { ProductService } from "@/services/product.service";

@Route("v1/product")
export class ProductController extends Controller {
  // Create new instance for product Service
  private productService = new ProductService();
  
  @Post()
  @Response(201, "Created Success")
  public async createItem(
    @Body() requestBody: ProductCreateRequest
  ): Promise<ProductResponse> {
    try {
      const newProduct = await this.productService.createProduct(requestBody);
      return {
        message: "success",
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
}
