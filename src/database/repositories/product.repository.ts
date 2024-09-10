import ItemModel, { IItem } from "../models/product.model";
import {
  ProductCreateRequest,
  ProductUpdateRequest,
} from "@/controllers/types/product-request";

class ProductRepository {
  // Create product
  public async createProduct(
    productRequest: ProductCreateRequest
  ): Promise<IItem> {
    try {
      const newProduct = await ItemModel.create(productRequest);
      return newProduct;
    } catch (error) {
      throw error;
    }
  }

  // Get single product, (Get by Id)
  public async getProductById(id: string): Promise<IItem | null> {
    try {
      // Get product specific Id
      const product = await ItemModel.findById(id).lean();
      // Check if product empty in database
      if (!product) {
        throw new Error(`Product ID:${id} not found`);
      }
      return product;
    } catch (error) {
      throw error;
    }
  }

  // Update product specific Id
  public async updateProduct(
    id: string,
    productRequest: ProductUpdateRequest
  ): Promise<IItem> {
    try {
      // Find product with Id provide
      const product = await ItemModel.findByIdAndUpdate(id, productRequest, {
        new: true,
      });
      // Validate if empty or product not found
      if (!product) {
        throw new Error(`Product not found`);
      }
      return product;
    } catch (error) {
      throw error;
    }
  }

  // Delete prudct
  public async deleteProduct(id: string): Promise<void> {
    try {
      const product = await ItemModel.findByIdAndDelete(id);
      if (!product) {
        throw new Error("Product not found!");
      }
      console.log(`Product deleted`);
    } catch (error) {
      throw error;
    }
  }

  // Get all product
  public async getAllProduct() {
    try {
      const product = await ItemModel.find();
      if (!product) {
        throw new Error(`Empty data in database.`);
      }
      return product;
    } catch (error) {
      throw error;
    }
  }
}

export default new ProductRepository();
