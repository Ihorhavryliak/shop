import { createSelector } from "@reduxjs/toolkit";
import { AppStateType } from "../redux-store";



export const getIsDateReceiveSelector = (state: AppStateType) => {
  return state.productsList.isDate
}

export const getFilterSelector = (state: AppStateType) => {
  return state.productsList.filter
}
//productMaxPrice
export const getAllProducts = (state: AppStateType) => {
  return state.productsList.products
}
//createSelector
export const getProductMaxPriceSelector = createSelector(getAllProducts, (products)=>{
  return  Math.max.apply(null, products.map( m => Math.round(m.price)));
})


export const getCategorySelector = (state: AppStateType) => {
  return state.categories.category
}

//get favorite 
export const getFavoriteSelector = (state: AppStateType) => {
  return state.productsList.favorite
}
//createSelectorSuper
export const getIsFavoriteSelectorSuper = createSelector(getFavoriteSelector, (favorite)=>{
  return  favorite ;
})