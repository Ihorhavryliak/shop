import { AppStateType } from "./redux-store";


export const getAllProducts = (state: AppStateType) => {
  return state.productsList.products
}

export const getFilter = (state: AppStateType) => {
  return state.productsList.filter
}