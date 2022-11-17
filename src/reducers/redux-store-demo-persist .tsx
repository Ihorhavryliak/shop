/* import {
  Action,
  combineReducers,
  configureStore,
  ThunkAction,
} from "@reduxjs/toolkit";
import productReducer from "./product-reducer";
import productListReducer from "./products-list-reducer";

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web

const productsPersistConfig = {
  key: "productsList",
  storage,
  blacklist: ['products']
};

const productPersistConfig = {
  key: "product",
  storage,
  blacklist: ['product']
};


const rootReducer = combineReducers({
  productsList:  persistReducer(productsPersistConfig, productListReducer),
  product:  persistReducer(productPersistConfig, productReducer),
});

const persistedReducer = persistReducer(productsPersistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
    
});

export const persistor = persistStore(store);

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
 */
<div></div>