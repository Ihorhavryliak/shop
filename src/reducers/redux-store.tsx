import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import productReducer from "./product-reducer";
import productListReducer from "./products-list-reducer";


const store = configureStore({
  reducer: {
    // @ts-ignore
    productsList: productListReducer,
      // @ts-ignore
    product: productReducer,
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
