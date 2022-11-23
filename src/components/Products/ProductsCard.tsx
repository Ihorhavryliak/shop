import React from "react";
import {  BsPlus, BsStar } from "react-icons/bs";
import { NavLink } from "react-router-dom";
import { GetAllProductsType } from "../../api/products-list-api";
import { StarsUnderCard } from "./StarsUnderCard";

type CartProductType = {
  m: GetAllProductsType;
};

export const CartProduct: React.FC<CartProductType> = ({ m }) => {
 /*  const ratingStart = (colorStar: number, star: number) => {
    if (colorStar > 0) {
      let arr = [...Array(colorStar)];
      console.log(arr);
      arr.map((s, i) => {
        return <BsFillStarFill key={i + "s"} className="me-1 ratingYellow" />;
      });

      if (star > 0) {
        let arr = [...Array(colorStar)];

        arr.map((s) => {
          return <BsStar className="me-1 " />;
        });
      }
    }
  }; */

  return (
    <div className="col  " key={m.id}>
      <div className="card">
        <div className="card-body">
          {/* photo */}
          <div>
            <NavLink to={`/products/product/${m.id}`}>
              <img
                className="img-fluid mb-3 cardImgInBlock mx-auto"
                src={m.image}
                alt={m.title}
              />
            </NavLink>
          </div>
          {/* information */}
          <div>{m.category}</div>
          <h5 className="fs-4 fontSmall text-truncate">{m.title}</h5>
          {/* rating */}
          <StarsUnderCard rating={m.rating.rate} countRating={m.rating.count}  />
          <div className="d-flex justify-content-between align-items-center my-0">
            <div>
              <span>$ {m.price} </span>
            </div>
            <button className="btn btn-primary btn-sm ">
              <BsPlus size={22} />
              Add
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};



