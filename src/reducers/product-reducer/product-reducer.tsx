import { GetProductDataType, productAPI } from "../../api/product-api"
import { dataProd } from "../../data/product"

import { targum } from "../../data/setCategoryProducts"
import { BaseThunkType, InfersActionsTypes } from "../redux-store"


let initialState = {
  product: [] as Array<GetProductDataType>,
}

if(targum) {
  initialState ={  
    product: dataProd as Array<GetProductDataType>,
  }
}


const productReducer = (state = initialState, action: ActionCreatesTypes ): InitialStateType => {
  switch(action.type){
    case "SET_DATA_PRODUCT":
        return {...state, 
          product: [ ...state.product, action.payload]};

    default:
      return state;
  }
}

export const actions = {
  getProduct: (data: GetProductDataType) => ({type: 'SET_DATA_PRODUCT', payload: data} as const) ,
}

export const dataProduct = (id: number):ThunkType => async (dispatch) => {
  const data = await productAPI.getProductData(id);
  dispatch(actions.getProduct(data));
}




export default productReducer;
export type InitialStateType = typeof initialState;
export type ActionCreatesTypes = InfersActionsTypes<typeof actions>;
type ThunkType = BaseThunkType<ActionCreatesTypes>;