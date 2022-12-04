import React from "react";
import { FiShoppingBag } from "react-icons/fi";
import { BsArrowLeftRight, BsHeart } from "react-icons/bs";
import './ProductButtons.scss'
import { getFavoriteSelector } from "../../../reducers/products-list-reducer/products-list-selector";
import { useDispatch, useSelector } from "react-redux";
import { FavoriteHeart } from "../../FavoriteHeart/FavoriteHeart";


export const ProductButtons = React.memo(({id = 1}: {id: number}) => {
  const getFavoriteData = useSelector(getFavoriteSelector);
  const dispatch = useDispatch();
  return (
    <div className="mt-3 row justify-content-start g-2 align-items-center">
      <div className="col-xxl-4 col-lg-4 col-md-5 col-5 d-grid">
        <button type="button" className="btn btn-dark">
          <FiShoppingBag className="me-2" />  Add to cart
        </button>
      </div>
      <div className="col-md-4 col-4">
        <a
          className="btn btn-light me-1"
          href="#4"
          data-bs-toggle="tooltip"
          data-bs-html="true"
          aria-label="Compare"
        >
          <BsArrowLeftRight className="feather-icon" />
        </a>
        <FavoriteHeart id={id}  className="btn btn-light " />
       
      </div>
    </div>
  );
});
