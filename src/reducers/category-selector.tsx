import { AppStateType } from "./redux-store";


export const getNameCategoryInformation = (state: AppStateType) => {
  return state.categories.category
}