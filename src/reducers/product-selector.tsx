import { AppStateType } from "./redux-store"

export const getProductInformation = (state: AppStateType) => {
  return state.product.product
}

