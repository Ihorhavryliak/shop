import { GetAllProductsType, productsListAPI } from "../../api/products-list-api";
import { dataProducts } from "../../data/products";
import { targum } from "../../data/setCategoryProducts";
/* import { dataProducts } from "../../data/products"; */
import { BaseThunkType, InfersActionsTypes } from "../redux-store";

let initialState = {
  products: [] as Array<GetAllProductsType>,
  filter: {limit: '5', sort: 'asc', contentStyle: "onFour"} as limitProductsType
};

if(targum) {
  initialState ={  products: dataProducts as Array<GetAllProductsType>,
  filter: {limit: '5', sort: 'asc', contentStyle: "onFour"} as limitProductsType}
}



const productListReducer = (
  state = initialState,
  action: ActionCreatesTypes
): InitialStateType => {
  switch (action.type) {
    case "SET_PRODUCTS":
    case "SET_CATEGORY_IN_PRODUCTS":
      return { ...state, products: [...action.payload]}; 
    case "SET_FILTER": 
    return {...state, filter: {...state.filter, limit: action.limit, sort: action.payload}};
    case "SET_SORT": 
    return {...state, filter: {...state.filter, sort: action.payload}};
    default:
      return state;
  }
};

export const actions = {
  receiveAllProducts: (data: Array<GetAllProductsType>) =>
    ({ type: "SET_PRODUCTS", payload: data} as const),
  getDataProductsInCategory: (categoryName: Array<GetAllProductsType>) =>
    ({ type: "SET_CATEGORY_IN_PRODUCTS", payload: categoryName } as const),
    getFilter: ( sort: string, limit: string) =>
    ({ type: "SET_FILTER", payload: sort,   limit} as const),
    getSort: ( sort: string) =>
    ({ type: "SET_SORT", payload: sort} as const),
};

export const setSort = (sort: string ): ThunkType => async (dispatch) => {
  dispatch(actions.getSort(sort));
};

export const getProducts = (sortResult: string, limit: string ): ThunkType => async (dispatch) => {
  dispatch(actions.getFilter(sortResult, limit));
  const data = await productsListAPI.getAllProducts(sortResult);
  dispatch(actions.receiveAllProducts(data));
};

export const getDataInCategory =
  (categoryName: string,  sortResult: string, limit: string ): ThunkType =>
  async (dispatch) => {
    dispatch(actions.getFilter(sortResult,limit));
    const data = await productsListAPI.getProductsInCategory(categoryName, sortResult);
    dispatch(actions.getDataProductsInCategory(data));
  };


export default productListReducer;

export type limitProductsType = {
  limit: string
  sort: string
  contentStyle: string
}
export type ActionCreatesTypes = InfersActionsTypes<typeof actions>;
export type InitialStateType = typeof initialState;
type ThunkType = BaseThunkType<ActionCreatesTypes>;

