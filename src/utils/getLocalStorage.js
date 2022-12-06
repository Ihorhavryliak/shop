import { GetAllProductsType } from "../api/products-list-api";



export const getLocalStorage = (name) => {

  let getDataLocalStorage  = [];

  if (localStorage.getItem(name) !== null) {
    getDataLocalStorage = JSON.parse(
      localStorage.getItem(name)
    );
  }
     return getDataLocalStorage
};

