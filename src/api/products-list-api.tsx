import { instance } from "./api";

export const productsListAPI = {
  getAllProducts() {
    return instance
      .get<Array<GetAllProductsType>>("products")
      .then((res) => res.data);
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
