import { AppStateType } from "../redux-store";


export const getIsAuthSelector = (state: AppStateType) => {
  return state.auth.isAuth
}

export const getIsBodySelector = (state: AppStateType) => {
  return state.auth.isBody
}