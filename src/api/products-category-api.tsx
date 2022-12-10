import { instance } from "./api";
import { GetProductDataType } from "./product-api";

export const productCategoryAPI = {
   getAllProductsCategory(sortResult: string  = '') {
    return(
      instance
      .get<Array<GetProductDataType>>(`products?&sort=${sortResult}`).then(res=> res.data)
    )
  },
/*   async getProductsCategoryInCategory(categoryName: string, sortResult: string  = '') {
    const res = await instance.get<Array<GetAllProductsType>>(`products/category${categoryName}?&sort=${sortResult}`);
    return res.data;
  }, */

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
