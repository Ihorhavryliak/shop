import {
  addProductToCartType,
  cartAPI,
  ProductCartType,
} from "../../admin/api/cart-api";
import { carts } from "../../data/cart";
import { targum } from "../../data/setCategoryProducts";
import { getLocalStorage } from "../../utils/getLocalStorage";

import { BaseThunkType, InfersActionsTypes } from "../redux-store";

let initialState = {
  cart: { products: [] as Array<ProductCartType> } as addProductToCartType,
  isAdded: null as boolean | null,
};

/* if (targum === true) {
  initialState = {
    cart: { products: carts as Array<ProductCartType> } as addProductToCartType,
    isAdded: null as boolean | null,
  };
} */

const cartReducer = (
  state = initialState,
  action: ActionCreatesTypes
): InitialStateType => {
  switch (action.type) {
    case "SET_IS_ADD_PRODUCT":
      return { ...state, isAdded: action.payload };
    case "SET_CART":
      if (
        state.cart.products &&
        state.cart.products.some(
          (s) => s.productId === action.payload.products[0].productId
        )
      ) {
        const findObjCart = state.cart.products.find(
          (f) => f.productId === action.payload.products[0].productId
        );
        const oObjCart = {
          ...findObjCart,
          quantity: findObjCart!.quantity + action.payload.products[0].quantity,
        } as ProductCartType;
        return {
          ...state,
          cart: {
            ...state.cart,
            products: [
              ...state.cart.products.filter(
                (f) => f.productId !== action.payload.products[0].productId
              ),
              ...[oObjCart],
            ],
          },
        };
      } else {
        return {
          ...state,
          cart: {
            ...state.cart,
            products: [...state.cart.products, ...action.payload.products],
          },
        };
      }
    case "DELETE_CART":
      return {
        ...state,
        cart: {
          ...state.cart,
          products: [
            ...state.cart.products.filter(
              (f) => f.productId !== action.payload
            ),
          ],
        },
      };
    case "DELETE_ONE_NUMBER":
      return {
        ...state,
        cart: {
          ...state.cart,
          products: [
            ...state.cart.products.map((m) => {
              if (m.productId === action.payload) {
                return { ...m, quantity: m.quantity - 1 };
              } else {
                return m;
              }
            }),
          ],
        },
      };
    case "ADD_ONE_CART":
      return {
        ...state,
        cart: {
          ...state.cart,
          products: [
            ...state.cart.products.map((m) => {
              if (m.productId === action.payload) {
                return { ...m, quantity: m.quantity + 1 };
              } else {
                return m;
              }
            }),
          ],
        },
      };
    case "SET_NUMBER_CART":
      return {
        ...state,
        cart: {
          ...state.cart,
          products: [
            ...state.cart.products.map((m) => {
              if (m.productId === action.payload) {
                return { ...m, quantity: action.number };
              } else {
                return m;
              }
            }),
          ],
        },
      };
    case "SET_CLEAR_CART":
      return { ...state, cart: { ...state.cart, products: [] } };
    default:
      return state;
  }
};

export const actions = {
  getProductsCart: (data: addProductToCartType) =>
    ({ type: "SET_CART", payload: data } as const),
  deleteProductCart: (id: number) =>
    ({ type: "DELETE_CART", payload: id } as const),
  deleteOneCart: (id: number) =>
    ({ type: "DELETE_ONE_NUMBER", payload: id } as const),
  addOneCart: (id: number) => ({ type: "ADD_ONE_CART", payload: id } as const),
  setNumberCart: (id: number, number: number) =>
    ({ type: "SET_NUMBER_CART", payload: id, number } as const),
  isAddedProduct: (b: boolean | null) =>
    ({ type: "SET_IS_ADD_PRODUCT", payload: b } as const),
  nullCart: () => ({ type: "SET_CLEAR_CART" } as const),
};

export const cleanCart = (): ThunkType => async (dispatch) => {
  dispatch(actions.nullCart());
};

export const isAddedProductToCart =
  (b: boolean | null): ThunkType =>
  async (dispatch) => {
    dispatch(actions.isAddedProduct(b));
  };
export const setToCartOneNumber =
  (id: number, number: number): ThunkType =>
  async (dispatch) => {
    dispatch(actions.setNumberCart(id, number));
  };
export const addToCartOneNumber =
  (id: number): ThunkType =>
  async (dispatch) => {
    dispatch(actions.addOneCart(id));
  };

export const deleteFromCartOneNumber =
  (id: number): ThunkType =>
  async (dispatch) => {
    dispatch(actions.deleteOneCart(id));
  };

export const deleteFromDate =
  (id: number): ThunkType =>
  async (dispatch) => {
    dispatch(actions.deleteProductCart(id));
  };

export const setProductCart =
  (userId: number, date: string, products: ProductCartType[]): ThunkType =>
  async (dispatch) => {
    const data = await cartAPI.addProductToCart(userId, date, products);
    dispatch(actions.getProductsCart(data));
    dispatch(isAddedProductToCart(true));
    //add to local storage
    /* 
const a ={
 if(getLocalStorage('cart').length === 0) {
      const jsonData = JSON.stringify(products)
       localStorage.setItem('cart',  jsonData) 
      } else {
        const parseJson = getLocalStorage('cart') as ProductCartType[];
        if(parseJson.some(s => products[0].productId === s.productId)) {
          const finedProduct = parseJson.find(f=> f.productId === products[0].productId);
          const oObjCart = [{...finedProduct, quantity: finedProduct!.quantity + products[0].quantity}]
          const jsonData = JSON.stringify([...parseJson.filter(f=> f.productId !== products[0].productId), ...oObjCart]  );
          localStorage.setItem('cart',  jsonData) 
        } else {
          const jsonData = JSON.stringify([...parseJson, ...products]  );
          localStorage.setItem('cart',  jsonData) 
        }
      } }*/
  };

export default cartReducer;
export type InitialStateType = typeof initialState;
export type ActionCreatesTypes = InfersActionsTypes<typeof actions>;
type ThunkType = BaseThunkType<ActionCreatesTypes>;
