import { instance } from "./api";
import { GetProductDataType } from "./product-api";

export const productsListAPI = {
   getAllProducts(limit: string  = '', sortResult: string  = '') {
    return(
      instance
      .get<Array<GetProductDataType>>(`products?&limit=${limit}&sort=${sortResult}`).then(res=> res.data)
    )


  },
  async getProductsInCategory(categoryName: string, limit: string  = '', sortResult: string  = '') {
    const res = await instance.get<Array<GetAllProductsType>>(`products/category${categoryName}?&limit=${limit}&sort=${sortResult}`);
    return res.data;
  },

};




export type GetAllProductsType = {
  category: string;
  description: string;
  id: number;
  image: string;
  price: number;
  rating: { rate: number; count: number };
  title: string;
};
