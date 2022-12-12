import { authAPI } from "../../api/auth-api";
import { BaseThunkType, InfersActionsTypes } from "../redux-store"


let initialState = {
  isAuth: null as boolean | null,
  isBody: true,
}


const authReducer = (state = initialState, action: ActionCreatesTypes ): InitialStateType => {
  switch(action.type){
    case "SET_IS_AUTH":
    return {...state, isAuth: action.payload}
    case "SET_IS_BODY":
      return {...state, isBody: action.payload}
    default:
      return state;
  }
}

export const actions = {
  getAuth: (isAuth: boolean | null ) => ({type: 'SET_IS_AUTH', payload: isAuth} as const),
  getModalBody: (isBody: boolean ) => ({type: 'SET_IS_BODY', payload: isBody, } as const),
}

export const closeInformMassage = ():ThunkType  => async (dispatch) => {
  dispatch(actions.getAuth(null))
}

export const setAuth = (name: string, password: string):ThunkType => async (dispatch) => {
 try{
  const token = await authAPI.login(name, password);
  if (token) {
    localStorage.setItem('token', `${token.token}`);
    dispatch(actions.getAuth(true));
    dispatch(actions.getModalBody(false));
  }
 } 
 catch(error) {
  dispatch(actions.getAuth(false));
 }



}

export default authReducer;
export type InitialStateType = typeof initialState;
export type ActionCreatesTypes = InfersActionsTypes<typeof actions>;
type ThunkType = BaseThunkType<ActionCreatesTypes>;