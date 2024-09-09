import { ProductCreateRequest } from "@/controllers/types/product-request";
import { IItem } from "@/database/models/product.model";
import ProductRepository from "@/database/repositories/product.repository";

export class ProductService {
  // Create new product
  public async createProduct(
    productRequest: ProductCreateRequest
  ): Promise<IItem> {
    try {
      const newProduct = await ProductRepository.createProduct(productRequest);
      return {
        name: newProduct.name,
        category: newProduct.category,
        price: newProduct.price,
      };
    } catch (error) {
      throw error;
    }
  }

  // Get product with specific Id
  public async getProductById(Id: string) {
    try {
      const product = ProductRepository.getProductById(Id);
      return product;
    } catch (error) {
      throw error;
    }
  }
}
