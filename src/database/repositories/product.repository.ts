import ItemModel, { IItem } from "@/database/models/product.model";
import { ProductCreateRequest } from "@/controllers/types/product-request.type";

class ProductRepository {
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
}

export default new ProductRepository();
