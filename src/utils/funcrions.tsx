import { setDeleteFavorite } from "../reducers/products-list-reducer/products-list-reducer";
import { AppDispatch } from "../reducers/redux-store";
import { getLocalStorage } from "./getLocalStorage";

export const onDeleteToFavorite = (id: number, dispatch: AppDispatch) => {
  dispatch(setDeleteFavorite(id));
  if (getLocalStorage("favorite") !== null) {
    localStorage.setItem(
      "favorite",
      JSON.stringify([
        ...getLocalStorage("favorite").filter((f) => f.id !== id),
      ])
    );
  }
};
