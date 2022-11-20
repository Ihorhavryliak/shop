import { BaseThunkType, InfersActionsTypes } from "../../reducers/redux-store";
import { addProductAPI } from "../api/add-product-api";



let initialState = {
  isProductAdd: null as boolean | null
}

const addProductReducer = (state = initialState, action: ActionCreatesTypes ): InitialStateType => {
  switch(action.type){
    case "SET_IS_PRODUCT_ADD":
      return {...state, isProductAdd: action.payload}
    default:
      return state;
  }
}

export const actions = {
  isProductAdd: (isAdd: boolean | null) => ({type: 'SET_IS_PRODUCT_ADD', payload: isAdd} as const) ,
}

export const addNewProductData = (title: string, price: number, description: string, image: string, category: string):ThunkType => async (dispatch) => {
  const data = await addProductAPI.addProductRequest(title, price, description, image, category);
  if(data.id) {
    dispatch(actions.isProductAdd(true));
  } else {
    dispatch(actions.isProductAdd(false));
  }
 
}

export default addProductReducer;
export type InitialStateType = typeof initialState;
export type ActionCreatesTypes = InfersActionsTypes<typeof actions>;
type ThunkType = BaseThunkType<ActionCreatesTypes>;