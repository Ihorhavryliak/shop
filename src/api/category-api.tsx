import { instance } from "./api";
import { GetProductDataType } from "./product-api";

export const categoryAPI = {
  async getCategoryName() {
    const res = await instance.get<Array<string>>(`products/categories`);
    return res.data;
  }, 
};


