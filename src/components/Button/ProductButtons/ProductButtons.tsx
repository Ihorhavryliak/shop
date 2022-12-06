import React from "react";
import { FiShoppingBag } from "react-icons/fi";
import { BsArrowLeftRight, BsHeart } from "react-icons/bs";
import './ProductButtons.scss'
import { getFavoriteSelector } from "../../../reducers/products-list-reducer/products-list-selector";
import { useDispatch, useSelector } from "react-redux";
import { FavoriteHeart } from "../../FavoriteHeart/FavoriteHeart";
import { ButtonProductAdd } from "../ButtonProductAdd";
import { Link } from "react-router-dom";
import { ButtonAddToCard } from "../ProductsButons/ButtonAddToCard";
import { ProductCartType } from "../../../admin/api/cart-api";

type ProductButtonsType = {
  addToCart: (
    userId: number,
    date: string,
    products: ProductCartType[]
  ) => void;
  id: number
  kind?: string
}
export const ProductButtons = React.memo(({id = 1, kind, addToCart}: ProductButtonsType) => {
 /*  const getFavoriteData = useSelector(getFavoriteSelector);
  const dispatch = useDispatch(); */
  return (
    <div className="mt-3 row justify-content-start g-2 align-items-center">
      <div className="col-xxl-4 col-lg-4 col-md-5 col-5 d-grid">
        <ButtonAddToCard kind={kind} id={id} addToCart={addToCart} />
      </div>
      <div className="col-md-4 col-4">
        <Link
          className="btn btn-light me-1"
          to="/"
          data-bs-toggle="tooltip"
          data-bs-html="true"
          aria-label="Compare"
        >
          <BsArrowLeftRight className="feather-icon" />
        </Link>
        <FavoriteHeart id={id}  className="btn btn-light " />
       
      </div>
    </div>
  );
});
