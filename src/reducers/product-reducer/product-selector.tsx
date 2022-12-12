import { AppStateType } from "../redux-store"


export const getIsDateReceiveProductSelector = (state: AppStateType) => {
  return state.product.isDate
}

export const getProductInformation = (state: AppStateType) => {
  return state.product.product
}
