import { GetAllProductsType, productsListAPI } from "../api/products-list-api";
import { BaseThunkType, InfersActionsTypes } from "./redux-store";

let initialState = {
  products: [] as Array<GetAllProductsType>,
};

const productListReducer = (
  state = initialState,
  action: ActionCreatesTypes
):InitialStateType => {
  switch (action.type) {
    case "SET_PRODUCTS":
      return { ...state, products: [ ...state.products, ...action.payload] };
    default:
      return state
  }
};

export const actions = {
  receiveAllProducts: (data: Array<GetAllProductsType>) =>
    ({ type: "SET_PRODUCTS", payload: data } as const),
};

export const getProducts = (): ThunkType => async (dispatch) => {

  const data = await productsListAPI.getAllProducts();
  dispatch(actions.receiveAllProducts(data));
};

export default productListReducer;

export type ActionCreatesTypes = InfersActionsTypes<typeof actions>;
export type InitialStateType = typeof initialState;
type ThunkType = BaseThunkType<ActionCreatesTypes >;
