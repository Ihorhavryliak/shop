import React, { useEffect } from "react";
import { BsHeart, BsFillHeartFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { GetAllProductsType } from "../../api/products-list-api";
import {
  getProducts,
  setDeleteFavorite,
  setFavorite,
} from "../../reducers/products-list-reducer/products-list-reducer";
import {
  getAllProducts,
  getFavoriteSelector,
} from "../../reducers/products-list-reducer/products-list-selector";
import { AppDispatch } from "../../reducers/redux-store";
import "./FavoriteHeart.scss";

export const FavoriteHeart = React.memo(({ id }: { id: number }) => {
  const dispatch: AppDispatch = useDispatch();
  const getFavoriteData = useSelector(getFavoriteSelector);
  const isFavoriteProduct = getFavoriteData.some((s) => s.id === id);
  const getProducts = useSelector(getAllProducts);
  //get /set data from local storage
let getDataLocalStorage: null | Array<GetAllProductsType>  = [];
if(localStorage.getItem("favorite") === null) {
  localStorage.setItem("favorite", JSON.stringify([]));
} else {
  getDataLocalStorage = JSON.parse(localStorage.getItem("favorite") as string) as Array<GetAllProductsType>;
}
//add 
  const onAddToFavorite = (id: number) => {
    dispatch(setFavorite(id));
    const findProduct = [getProducts.find((f) => f.id === id)];
    getDataLocalStorage !== null
      ? localStorage.setItem(
          "favorite",
          JSON.stringify([...getDataLocalStorage, ...findProduct])
        )
      : localStorage.setItem("favorite", JSON.stringify([...findProduct]));
  };
//delete
const onDeleteToFavorite = (id: number) => {
  dispatch(setDeleteFavorite(id));
if(getDataLocalStorage !== null) {
  localStorage.setItem("favorite", JSON.stringify([...getDataLocalStorage.filter(f => f.id !== id)]));
}
};
// is Product Favorite
const isProductFavorite = getDataLocalStorage.some(s => s.id === id );
return (
    <>
      {isProductFavorite ? (
        <span
          onClick={() => onDeleteToFavorite(id)}
          className="btn-action"
          data-bs-html="true"
          aria-label="Wishlist"
        >
          <BsFillHeartFill />
        </span>
      ) : (
        <span
          onClick={() => onAddToFavorite(id)}
          className="btn-action"
          data-bs-html="true"
          aria-label="Wishlist"
        >
          <BsHeart />
        </span>
      )}
    </>
  );
});
