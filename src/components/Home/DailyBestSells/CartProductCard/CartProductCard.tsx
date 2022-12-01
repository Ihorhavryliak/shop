import React from "react";
import { BsPlus, BsStar } from "react-icons/bs";
import { NavLink } from "react-router-dom";
import { GetAllProductsType } from "../../../../api/products-list-api";
import { TimerHome } from "../../../../utils/TimerHome/TimerHome";

import { StarsUnderCard } from "../../../Products/StarsUnderCard/StarsUnderCard";

import "./CartProductCard.scss";
type CartProductType = {
  m: GetAllProductsType;
};

export const CartProductCard: React.FC<CartProductType> = ({ m }) => {
  
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
          <div>{m.category}</div>
          <h5 className="fs-4 fontSmall text-truncate">{m.title}</h5>
          {/* rating */}
       
          <div className="d-flex justify-content-between align-items-center my-0">
            <div>
              <span>$ {m.price} </span>
            </div>
            <StarsUnderCard rating={m.rating.rate} isPadding={true} />
          </div>
          <div className="d-grid mt-2">
          <button className="btn btn-dark btn-sm ">
              <BsPlus size={22} />
              Add
            </button>
          </div>
          <TimerHome keys={`${m.id} ${m.title} `} deadline={"December, 31, 2022"} />
     
        </div>
      </div>
    </div>
  );
};
