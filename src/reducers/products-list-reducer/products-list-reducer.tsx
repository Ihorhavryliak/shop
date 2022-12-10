import {
  GetAllProductsType,
  productsListAPI,
} from "../../api/products-list-api";
import { dataProducts } from "../../data/products";
import { targum } from "../../data/setCategoryProducts";
/* import { dataProducts } from "../../data/products"; */
import { BaseThunkType, InfersActionsTypes } from "../redux-store";

let initialState = {
  products: [] as Array<GetAllProductsType>,
  filter: {
    limit: "5",
    sort: "asc",
    contentStyle: "on-four",
  } as limitProductsType,
  favorite: [] as Array<GetAllProductsType>,
  isDate: true as boolean,
};

if (targum) {
  initialState = {
    products: dataProducts as Array<GetAllProductsType>,
    filter: {
      limit: "5",
      sort: "asc",
      contentStyle: "on-four",
    } as limitProductsType,
    favorite: [] as Array<GetAllProductsType>,
    isDate: true as boolean,
  };
}

const productListReducer = (
  state = initialState,
  action: ActionCreatesTypes
): InitialStateType => {
  switch (action.type) {
    case "SET_CATEGORY_IN_PRODUCTS":
      return { ...state, products: [...action.payload] };
    case "SET_FILTER":
      return {
        ...state,
        filter: { ...state.filter, limit: action.limit, sort: action.payload },
      };
    case "SET_SORT":
      return { ...state, filter: { ...state.filter, sort: action.payload } };
    case "SET_STYLES":
      return {
        ...state,
        filter: { ...state.filter, contentStyle: action.payload },
      };

    case "SET_DATE_RECEIVE":
      return { ...state, isDate: action.payload };

    case "SET_CLEAN_PRODUCT_LIST":
      return { ...state, products: [] };
    default:
      return state;
  }
};

export const actions = {
  receiveAllProducts: (data: Array<GetAllProductsType>) =>
    ({ type: "SET_PRODUCTS", payload: data } as const),
  getDataProductsInCategory: (categoryName: Array<GetAllProductsType>) =>
    ({ type: "SET_CATEGORY_IN_PRODUCTS", payload: categoryName } as const),
  getFilter: (sort: string, limit: string) =>
    ({ type: "SET_FILTER", payload: sort, limit } as const),
  getSort: (sort: string) => ({ type: "SET_SORT", payload: sort } as const),

  getStyle: (name: string) => ({ type: "SET_STYLES", payload: name } as const),
  getIsDateReceive: (b: boolean) =>
    ({ type: "SET_DATE_RECEIVE", payload: b } as const),
  getCleanProductsList: () => ({ type: "SET_CLEAN_PRODUCT_LIST" } as const),
};
export const setCleanProductsList = (): ThunkType => async (dispatch) => {
  dispatch(actions.getCleanProductsList());
};

export const setStyle =
  (name: string): ThunkType =>
  async (dispatch) => {
    dispatch(actions.getStyle(name));
  };

export const setSort =
  (sort: string): ThunkType =>
  async (dispatch) => {
    dispatch(actions.getSort(sort));
  };

export const getDataInCategory =
  (categoryName: string, sortResult: string, limit: string): ThunkType =>
  async (dispatch) => {
    dispatch(actions.getFilter(sortResult, limit));
    const data = await productsListAPI.getProductsInCategory(
      categoryName,
      sortResult
    );
    dispatch(actions.getDataProductsInCategory(data));
    dispatch(actions.getIsDateReceive(false));
  };

export const setDateReceive =
  (b: boolean): ThunkType =>
  async (dispatch) => {
    dispatch(actions.getIsDateReceive(b));
  };

export default productListReducer;

export type limitProductsType = {
  limit: string;
  sort: string;
  contentStyle: string;
};
export type ActionCreatesTypes = InfersActionsTypes<typeof actions>;
export type InitialStateType = typeof initialState;
type ThunkType = BaseThunkType<ActionCreatesTypes>;
