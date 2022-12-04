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
};

if (targum) {
  initialState = {
    products: dataProducts as Array<GetAllProductsType>,
    filter: {
      limit: "5",
      sort: "asc",
      contentStyle: "onFour",
    } as limitProductsType,
    favorite: [] as Array<GetAllProductsType>,
  };
}

const productListReducer = (
  state = initialState,
  action: ActionCreatesTypes
): InitialStateType => {
  switch (action.type) {
    case "SET_PRODUCTS":
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
        return { ...state, filter: { ...state.filter, contentStyle: action.payload } };
    case "SET_FAVORITE":
      const productsFilter = [
        state.products.find((f) => f.id === action.payload),
      ] as Array<GetAllProductsType>;
      return { ...state, favorite: [...state.favorite, ...productsFilter] };

    case "DELETE_FAVORITE": 
      return {...state, favorite: [...state.favorite.filter(f=> f.id !== action.payload)]}
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
  getFavorite: (id: number) => ({ type: "SET_FAVORITE", payload: id } as const),
  deleteFavorite: (id: number) =>
    ({ type: "DELETE_FAVORITE", payload: id } as const),
    getStyle: (name: string) =>
    ({ type: "SET_STYLES", payload: name } as const),
};

export const setStyle =
  (name: string): ThunkType =>
  async (dispatch) => {
    dispatch(actions.getStyle(name));
  };

export const setFavorite =
  (id: number): ThunkType =>
  async (dispatch) => {
    dispatch(actions.getFavorite(id));
  };
export const setDeleteFavorite =
  (id: number): ThunkType =>
  async (dispatch) => {
    dispatch(actions.deleteFavorite(id));
  };

export const setSort =
  (sort: string): ThunkType =>
  async (dispatch) => {
    dispatch(actions.getSort(sort));
  };

export const getProducts =
  (sortResult: string, limit: string): ThunkType =>
  async (dispatch) => {
    dispatch(actions.getFilter(sortResult, limit));
    const data = await productsListAPI.getAllProducts(sortResult);
    dispatch(actions.receiveAllProducts(data));
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
