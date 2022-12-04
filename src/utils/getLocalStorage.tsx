import { GetAllProductsType } from "../api/products-list-api";



export const getLocalStorage = (name: string) => {

  let getDataLocalStorage: Array<GetAllProductsType> | null = [];

  if (localStorage.getItem(name) !== null) {
    getDataLocalStorage = JSON.parse(
      localStorage.getItem(name) as string
    ) as Array<GetAllProductsType>;
  }
     return getDataLocalStorage
};


