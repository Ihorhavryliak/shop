import React from "react";
import { BsPlus, BsStar } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { ProductCartType } from "../../../../admin/api/cart-api";
import { GetAllProductsType } from "../../../../api/products-list-api";
import { setProductCart } from "../../../../reducers/cart-reducer/cart-reducer";
import { AppDispatch } from "../../../../reducers/redux-store";
import { TimerHome } from "../../../../utils/TimerHome/TimerHome";
import { ProductButtons } from "../../../Product";
import { ButtonAddToCard } from "../../../Products";

import { StarsUnderCard } from "../../../Products/StarsUnderCard/StarsUnderCard";

import "./CartProductCard.scss";
type CartProductType = {
  m: GetAllProductsType;
};

export const CartProductCard: React.FC<CartProductType> = ({ m }) => {
  const dispatch: AppDispatch = useDispatch();
  const addToCart = (
    userId: number,
    date: string,
    products: ProductCartType[]
  ) => {
    dispatch(setProductCart(userId, date, products));
  };
  return (
    <div className="col  " key={m.id}>
      <div className="card card-product">
        <div className="card-body">
          {/* photo */}
          <div>
            <NavLink to={`/products/product/${m.id}`}>
              <img
                className="img-fluid mb-3 cardImgInBlock mx-auto best__img__height"
                src={m.image}
                alt={m.title}
              />
            </NavLink>
          </div>
          {/* information */}
          <div className="text-small mb-1">
          <NavLink to={`/products/category/${m.category}`}><small>{m.category}</small></NavLink>
          </div>
          
          <h5 className="fs-4 fontSmall text-truncate">{m.title}</h5>
          {/* rating */}
       
          <div className="d-flex justify-content-between align-items-center my-0">
            <div>
              <span>$ {m.price} </span>
            </div>
            <StarsUnderCard rating={m.rating.rate} isPadding={true} />
          </div>
          <div className="d-grid mt-2">
    
          <ButtonAddToCard id={m.id} addToCart={addToCart} kind={'mainProduct'}  />
          </div>
          <TimerHome keys={`${m.id} ${m.title} `} deadline={"December, 31, 2022"} />
     
        </div>
      </div>
    </div>
  );
};
