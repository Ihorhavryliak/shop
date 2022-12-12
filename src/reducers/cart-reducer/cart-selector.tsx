import { AppStateType } from "../redux-store"




export const getCartSelector = (state: AppStateType) => {
  return state.cart.cart
}
export const getCartProductsSelector = (state: AppStateType) => {
  return state.cart.cart.products
}


export const getIsAddedSelector = (state: AppStateType) => {
  return state.cart.isAdded
}