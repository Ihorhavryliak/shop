import { createSelector } from "@reduxjs/toolkit";
import { AppStateType } from "../redux-store";

export const getIsDateReceiveCategorySelector = (state: AppStateType) => {
  return state.productCategory.isDate;
};
export const getFavoriteCategorySelector = (state: AppStateType) => {
  return state.productCategory.favorite;
};
export const getFilterCategorySelector = (state: AppStateType) => {
  return state.productCategory.filter;
};
//productMaxPrice
export const getAllProductsCategory = (state: AppStateType) => {
  return state.productCategory.products;
};
//createSelector
export const getProductMaxPriceSelector = createSelector(
  getAllProductsCategory,
  (products) => {
    return Math.max.apply(
      null,
      products.map((m) => Math.round(m.price))
    );
  }
);

//createSelectorSuper
export const getIsFavoriteSelectorSuper = createSelector(
  getFavoriteCategorySelector,
  (favorite) => {
    return favorite;
  }
);
