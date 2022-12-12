import { categoryAPI } from "../../api/category-api";
import { categoryData } from "../../data/catrgory";
import { targum } from "../../data/setCategoryProducts";
import { BaseThunkType, InfersActionsTypes } from "../redux-store"


let initialState = {
  category: [] as Array<string>,
}

if(targum) {
  initialState ={ category: categoryData as Array<string>,}
}

const categoryReducer = (state = initialState, action: ActionCreatesTypes ): InitialStateType => {
  switch(action.type){
    case "SET_CATEGORY":
      if(action.payload.length < 0 ) {
        return state;
      } else {
        return {...state, category: [...state.category, ...action.payload]}
      }
    default:
      return state;
  }
}

export const actions = {
  getCategoryNameData: (name: Array<string>) => ({type: 'SET_CATEGORY', payload: name} as const) ,
}

export const getCategory = ():ThunkType => async (dispatch) => {
 const name = await categoryAPI.getCategoryName();
  dispatch(actions.getCategoryNameData(name));
}

export default categoryReducer;
export type InitialStateType = typeof initialState;
export type ActionCreatesTypes = InfersActionsTypes<typeof actions>;
type ThunkType = BaseThunkType<ActionCreatesTypes>;