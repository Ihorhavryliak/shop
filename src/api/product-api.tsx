import { instance } from "./api";

export const productAPI = {
  async getProductData(id: number = 1) {
    const res = await instance.get<GetProductDataType>(`products/${id}`);
    return res.data;
  },
 
};

export type GetProductDataType = {
  category: string;
  description: string;
  id: number;
  image: string;
  price: number;
  rating: { rate: number; count: number };
  title: string;
};
