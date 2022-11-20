import { GetAllProductsType, productsListAPI } from "../api/products-list-api";
import { BaseThunkType, InfersActionsTypes } from "./redux-store";

let initialState = {
  products: [] as Array<GetAllProductsType>,
  filter: {limit: '5', sort: 'asc'} as limitProductsType
};

const productListReducer = (
  state = initialState,
  action: ActionCreatesTypes
): InitialStateType => {
  switch (action.type) {
    case "SET_PRODUCTS":
    case "SET_CATEGORY_IN_PRODUCTS":
      debugger
      return { ...state, products: [...action.payload]}; 
    case "SET_FILTER": 
    debugger
    return {...state, filter: {...state.filter, limit: action.payload, sort: action.sort}}
    default:
      return state;
  }
};

export const actions = {
  receiveAllProducts: (data: Array<GetAllProductsType>) =>
    ({ type: "SET_PRODUCTS", payload: data} as const),
  getDataProductsInCategory: (categoryName: Array<GetAllProductsType>) =>
    ({ type: "SET_CATEGORY_IN_PRODUCTS", payload: categoryName } as const),
    getFilter: (limit: string, sort: string) =>
    ({ type: "SET_FILTER", payload: limit,  sort } as const),
};

export const getProducts = (limit: string, sortResult: string): ThunkType => async (dispatch) => {
  dispatch(actions.getFilter(limit, sortResult));
  debugger
  const data = await productsListAPI.getAllProducts(limit, sortResult);
  dispatch(actions.receiveAllProducts(data));
};

export const getDataInCategory =
  (categoryName: string, limit: string , sortResult: string ): ThunkType =>
  async (dispatch) => {
    dispatch(actions.getFilter(limit, sortResult));
    const data = await productsListAPI.getProductsInCategory(categoryName, limit, sortResult);
    dispatch(actions.getDataProductsInCategory(data));
  };


export default productListReducer;

export type limitProductsType = {
  limit: string
  sort: string
}
export type ActionCreatesTypes = InfersActionsTypes<typeof actions>;
export type InitialStateType = typeof initialState;
type ThunkType = BaseThunkType<ActionCreatesTypes>;

