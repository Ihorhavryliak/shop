import { setDeleteFavoriteCategory } from "../reducers/products-category-reducer/products-category-reducer";
import { getLocalStorage } from "./getLocalStorage";

export const onDeleteToFavorite = (id, dispatch) => {
  dispatch(setDeleteFavoriteCategory(id));
  if (getLocalStorage("favorite") !== null) {
    localStorage.setItem(
      "favorite",
      JSON.stringify([
        ...getLocalStorage("favorite").filter((f) => f.id !== id),
      ])
    );
  }
};
