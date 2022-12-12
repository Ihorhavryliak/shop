import { GetProductDataType, productAPI } from "../../api/product-api"
import { dataProd } from "../../data/product"

import { targum } from "../../data/setCategoryProducts"
import { BaseThunkType, InfersActionsTypes } from "../redux-store"


let initialState = {
  product: [] as Array<GetProductDataType>,
  isDate: true as boolean,
}

if(targum) {
  initialState ={  
    product: dataProd as Array<GetProductDataType>,
    isDate: true as boolean,
  }
}


const productReducer = (state = initialState, action: ActionCreatesTypes ): InitialStateType => {
  switch(action.type){
    case "SET_DATA_PRODUCT":
        return {...state, 
          product: [...state.product,  action.payload]};
          case "SET_DATE_RECEIVE":
            return { ...state, isDate: action.payload };
          case "SET_CLEAN_PRODUCT_LIST":
            return { ...state, product: [] };

    default:
      return state;
  }
}



export const actions = {
  getProduct: (data: GetProductDataType) => ({type: 'SET_DATA_PRODUCT', payload: data} as const) ,
  getIsDateReceiveProduct: (b: boolean) =>
  ({ type: "SET_DATE_RECEIVE", payload: b } as const),
  getCleanProduct: () =>
  ({ type: "SET_CLEAN_PRODUCT_LIST" } as const),
}

export const setCleanProduct=
  (): ThunkType => async (dispatch) => {
    dispatch(actions.getCleanProduct());
  };
  export const setDateReceiveProduct =
  (b: boolean): ThunkType =>
  async (dispatch) => {
    dispatch(actions.getIsDateReceiveProduct(b))
  };

export const dataProduct = (id: number):ThunkType => async (dispatch) => {
  const data = await productAPI.getProductData(id);

  dispatch(actions.getProduct(data));

    /* dispatch(actions.getIsDateReceiveProduct(false)); */
 
}


export default productReducer;
export type InitialStateType = typeof initialState;
export type ActionCreatesTypes = InfersActionsTypes<typeof actions>;
type ThunkType = BaseThunkType<ActionCreatesTypes>;