import { productCategoryAPI } from "../../api/products-category-api";
import { GetAllProductsType } from "../../api/products-list-api";
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

const productCategoryReducer = (
  state = initialState,
  action: ActionCreatesTypes
): InitialStateType => {
  switch (action.type) {
    case "SET_PRODUCTS":
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
    case "SET_FAVORITE":
      const productsFilter = [
        state.products.find((f) => f.id === action.payload),
      ] as Array<GetAllProductsType>;
      return { ...state, favorite: [...state.favorite, ...productsFilter] };

    case "DELETE_FAVORITE":
      debugger;
      return {
        ...state,
        favorite: [...state.favorite.filter((f) => f.id !== action.payload)],
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
  receiveAllProductsCategory: (data: Array<GetAllProductsType>) =>
    ({ type: "SET_PRODUCTS", payload: data } as const),
  getDataProductsInCategoryCategory: (
    categoryName: Array<GetAllProductsType>
  ) => ({ type: "SET_CATEGORY_IN_PRODUCTS", payload: categoryName } as const),
  getFilterCategory: (sort: string, limit: string) =>
    ({ type: "SET_FILTER", payload: sort, limit } as const),
  getSortCategory: (sort: string) =>
    ({ type: "SET_SORT", payload: sort } as const),
  getFavoriteCategory: (id: number) =>
    ({ type: "SET_FAVORITE", payload: id } as const),
  deleteFavoriteCategories: (id: number) =>
    ({ type: "DELETE_FAVORITE", payload: id } as const),
  getStyleCategory: (name: string) =>
    ({ type: "SET_STYLES", payload: name } as const),
  getIsDateReceiveCategory: (b: boolean) =>
    ({ type: "SET_DATE_RECEIVE", payload: b } as const),
  getCleanProductsListCategory: () =>
    ({ type: "SET_CLEAN_PRODUCT_LIST" } as const),
};

export const setCleanProductsListCategory =
  (): ThunkType => async (dispatch) => {
    dispatch(actions.getCleanProductsListCategory());
  };
export const setDateReceiveCategory =
  (b: boolean): ThunkType =>
  async (dispatch) => {
    dispatch(actions.getIsDateReceiveCategory(b));
  };
export const setStyleCategory =
  (name: string): ThunkType =>
  async (dispatch) => {
    dispatch(actions.getStyleCategory(name));
  };

export const setFavoriteCategory =
  (id: number): ThunkType =>
  async (dispatch) => {
    dispatch(actions.getFavoriteCategory(id));
  };
export const setDeleteFavoriteCategory =
  (id: number): ThunkType =>
  async (dispatch) => {
    debugger;
    dispatch(actions.deleteFavoriteCategories(id));
  };

export const setSortCategory =
  (sort: string): ThunkType =>
  async (dispatch) => {
    dispatch(actions.getSortCategory(sort));
  };

export const getProductsCategory =
  (sortResult: string, limit: string): ThunkType =>
  async (dispatch) => {
    dispatch(actions.getFilterCategory(sortResult, limit));
    const data = await productCategoryAPI.getAllProductsCategory(sortResult);
    dispatch(actions.receiveAllProductsCategory(data));
    dispatch(actions.getIsDateReceiveCategory(false));
  };

export default productCategoryReducer;

export type limitProductsType = {
  limit: string;
  sort: string;
  contentStyle: string;
};
export type ActionCreatesTypes = InfersActionsTypes<typeof actions>;
export type InitialStateType = typeof initialState;
type ThunkType = BaseThunkType<ActionCreatesTypes>;
