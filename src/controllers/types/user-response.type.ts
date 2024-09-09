import { IItem } from "@/database/product.model";

export interface ProductResponse {
  message: string;
  data: IItem;
}
