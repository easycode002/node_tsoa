import {
  ProductCreateRequest,
  ProductUpdateRequest,
} from "@/controllers/types/product-request";
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
  public async getProductById(id: string) {
    try {
      const product = ProductRepository.getProductById(id);
      return product;
    } catch (error) {
      throw error;
    }
  }

  // Update product
  public async updateProduct(
    id: string,
    productRequest: ProductUpdateRequest
  ): Promise<IItem> {
    try {
      const product = await ProductRepository.updateProduct(id, productRequest);
      return product;
    } catch (error) {
      throw error;
    }
  }

  // Delete product
  public async deleteProduct(id: string): Promise<void> {
    try {
      await ProductRepository.deleteProduct(id);
      console.log(`Product deleted`);
    } catch (error) {
      throw error;
    }
  }

  // Get all product
  public async getAllProduct() {
    try {
      const product = await ProductRepository.getAllProduct();
      return product;
    } catch (error) {
      throw error;
    }
  }
}
