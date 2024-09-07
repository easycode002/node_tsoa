import { Controller, Route, Get } from "tsoa";

export interface IItem {
  name: string;
  cagetory: string;
  price: number;
}

@Route("v1/product")
export class ProductController extends Controller {
  @Get("/")
  public getAllProducts() {
    // Return the array wrapped in a Promise
    return [{ id: 1, name: "Cherrie", category: "fruit", price: 10.2 }];
  }
}
