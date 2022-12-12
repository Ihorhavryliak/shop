import React from "react";
import { BsHeart, BsFillHeartFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { GetAllProductsType } from "../../api/products-list-api";
import { setFavoriteCategory } from "../../reducers/products-category-reducer/products-category-reducer";
import { getAllProductsCategory, getFavoriteCategorySelector } from "../../reducers/products-category-reducer/products-category-selector";
import { AppDispatch } from "../../reducers/redux-store";
import { onDeleteToFavorite } from "../../utils/functions";
import { getLocalStorage } from "../../utils/getLocalStorage";
import "./FavoriteHeart.scss";

type FavoriteHeartType = {
  id: number 
  className?: string
}
export const FavoriteHeart = React.memo(({ id, className = "btn-action span__link" }: FavoriteHeartType) => {
  const dispatch: AppDispatch = useDispatch();
  const getFavoriteData = useSelector(getFavoriteCategorySelector);
  const getProducts = useSelector(getAllProductsCategory);


//add 
  const onAddToFavorite = (id: number) => {
 dispatch(setFavoriteCategory(id)); 
    const findProduct = [getProducts.find((f) => f.id === id)];

    getLocalStorage("favorite") !== null
      ? localStorage.setItem(
          "favorite",
          JSON.stringify([...getLocalStorage("favorite"), ...findProduct])
        )
      : localStorage.setItem("favorite", JSON.stringify([...findProduct]));
  };
// is Product Favorite
const getLocalFavorite = getLocalStorage("favorite") as GetAllProductsType[]

return (
    <>
      { getLocalFavorite.some(s => s.id === id ) ? (
        <span
          onClick={() => onDeleteToFavorite(id, dispatch)}
          className={className}
          data-bs-html="true"
          aria-label="Wishlist"
        >
          <BsFillHeartFill />
        </span>
      ) : (
        <span
          onClick={() => onAddToFavorite(id)}
          className={className}
          data-bs-html="true"
          aria-label="Wishlist"
        >
          <BsHeart />
        </span>
      )}
    </>
  );
});