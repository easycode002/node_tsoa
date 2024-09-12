import {
  ProductCreateRequest,
  // ProductGetAllRequest,
  ProductUpdateRequest,
} from "./types/product-request";
import { ProductResponse } from "@/controllers/types/product-response";
// import { IItem } from "@/database/models/product.model";
import ProductService from "@/services/product.service";
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
  Tags,
  // Queries,
  Example,
} from "tsoa";
// import { ProductPaginatedResponse } from "./types/product-response";
// import validateRequest from "@/middlewares/validate-input";

@Route("v1/product")
@Tags("Product")
export class ProductController extends Controller {
  // Create new product
  @Post()
  @Response(201, "Create success")
  @Middlewares()
  @Example<ProductResponse>({
    message: "Product created",
    data: {
      name: "Apple",
      category: "Vegetable",
      price: 12,
    },
  })
  public async createItem(
    @Body() requestBody: ProductCreateRequest
  ): Promise<ProductResponse> {
    try {
      const newProduct = await ProductService.createProduct(requestBody);
      return {
        message: "Product created",
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
  public async getProductById(@Path() id: string): Promise<ProductResponse> {
    try {
      const product = await ProductService.getProductById(id);
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
      const newProduct = await ProductService.updateProduct(id, requestBody);
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
  @Response(204, "Product deleted")
  public async deleteProduct(@Path() id: string): Promise<void> {
    try {
      await ProductService.deleteProduct(id);
    } catch (error) {
      throw error;
    }
  }

  // Get all product
  @Get()
  public async getAllProduct() {
    try {
      const product = await ProductService.getAllProduct();
      return {
        message: "All product available.",
        data: product,
      };
    } catch (error) {
      throw error;
    }
  }

  // @Get()
  // public async getAll(
  //   @Queries() queries: ProductGetAllRequest
  // ): Promise<ProductPaginatedResponse> {
  //   try {
  //     const response = await ProductService.getAll(queries);

  //     return {
  //       message: "success",
  //       data: response,
  //     };
  //   } catch (error) {
  //     console.error(
  //       `ProductsController - getAllProducts() method error: ${error}`
  //     );
  //     throw error;
  //   }
  // }
}
