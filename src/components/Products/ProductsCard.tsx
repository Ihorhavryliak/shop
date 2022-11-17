import React from "react";
import { BsPlus } from "react-icons/bs";
import { NavLink } from "react-router-dom";
import { GetAllProductsType } from "../../api/products-list-api";

type CartProductType = {
  m: GetAllProductsType;
};


export const CartProduct: React.FC<CartProductType> = ({ m }) => {

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
                alt={m.title} />
            </NavLink>
          </div>
          {/* information */}
          <div>{m.category}</div>
          <h5 className="fs-4 fontSmall text-truncate">{m.title}</h5>
          <div>{m.rating.rate}</div>
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
