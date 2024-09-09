import { ProductCreateRequest } from "@/controllers/types/product-request.type";
import { IItem } from "@/database/product.model";
import ProductRepository from "@/database/product.repository";

export class ProductService {
  public async createProduct(
    productRequest: ProductCreateRequest
  ): Promise<IItem> {
    try {
      const newProduct = await ProductRepository.createProduct(productRequest);
      return newProduct;
    } catch (error) {
      console.log(`ProductService - createProduct() method error: ${error}`);
      throw error;
    }
  }
}

export default new ProductService();
