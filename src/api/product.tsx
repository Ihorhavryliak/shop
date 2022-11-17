import { instance } from "./api";

export const productAPI = {
  getProductData(number: number = 1) {
    return instance.get(`products/${number}`).then((res) => res.data);
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
