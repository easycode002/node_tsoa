import ItemModel, { IItem } from "../models/product.model";
import { ProductCreateRequest } from "@/controllers/types/product-request";

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

  public async getProductById(Id: string) {
    try {
      // Get product specific Id
      const product = ItemModel.findById(Id);
      // Check if product empty in database
      if (!product) {
        throw new Error(`Product ID:${Id} not found`);
      }
      return product;
    } catch (error) {
      throw error;
    }
  }
}

export default new ProductRepository();
