import { AppStateType } from "../../reducers/redux-store"



export const getIsProductAdd = (state: AppStateType) => {
  return state.adminAddProduct.isProductAdd
}