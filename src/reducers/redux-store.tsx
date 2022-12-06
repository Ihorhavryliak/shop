import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import addProductReducer from "../admin/reducers/add-product-reducer";
import authReducer from "./auth-reducer/auth-reducer";
import cartReducer from "./cart-reducer/cart-reducer";
import categoryReducer from "./category-reducer/category-reducer";
import productReducer from "./product-reducer/product-reducer";
import productListReducer from "./products-list-reducer/products-list-reducer";


const store = configureStore({
  reducer: {
    // @ts-ignore
    productsList: productListReducer,
      // @ts-ignore
    product: productReducer,
       // @ts-ignore
    categories: categoryReducer,
    // @ts-ignore
    adminAddProduct: addProductReducer,
    // @ts-ignore
    auth: authReducer,
      // @ts-ignore
    cart: cartReducer
  },
});


export type AppStateType = ReturnType<typeof store.getState>;

export type InfersActionsTypes<T> = T extends {
  [keys: string]: (...args: any[]) => infer U;
}
  ? U
  : never;
export type BaseThunkType<
  A extends Action = Action,
  R = Promise<void>
> = ThunkAction<R, AppStateType, unknown, A>;
export type AppDispatch = typeof store.dispatch;

export default store;
