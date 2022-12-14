import { createSelector } from "@reduxjs/toolkit";
import { AppStateType } from "../redux-store";





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