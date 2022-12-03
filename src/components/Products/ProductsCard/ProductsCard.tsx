import React from "react";
import {  BsPlus, BsStar } from "react-icons/bs";
import { NavLink } from "react-router-dom";
import { GetAllProductsType } from "../../../api/products-list-api";
import { StarsUnderCard } from "../StarsUnderCard/StarsUnderCard";
import './ProductCartSmall.scss'
type CartProductType = {
  m: GetAllProductsType;
};

export const CartProduct: React.FC<CartProductType> = ({ m }) => {

  return (
    <div className="col  " key={m.id}>
      <div className="card card-product">
        <div className="card-body">
          {/* photo */}
          <div className="text-center position-relative">
          <div className="position-absolute top-0 start-0" >
                      <span className="badge bg-success">14%</span>
                    </div>
            <NavLink to={`/products/product/${m.id}`}>
              <img
                className="img-fluid mb-3 cardImgInBlock mx-auto"
                src={m.image}
                alt={m.title}
              />

            </NavLink>
                         {/*  hover */}
                         <div className="card-product-action" >cv
                      <a href="#!" className="btn-action" data-bs-target="#quickViewModal">
                        <i className="bi bi-eye" data-bs-toggle="tooltip" data-bs-html="true" aria-label="Quick View"></i></a>
                      <a href="5" className="btn-action" data-bs-html="true" aria-label="Wishlist">
                        <i className="bi bi-heart"></i></a>
                      <a href="#!" className="btn-action"  data-bs-html="true" aria-label="Compare"
                      ><i className="bi bi-arrow-left-right"></i></a>
                    </div>
          </div>
          {/* information */}
          
          <div className="text-small mb-1" >
            <a href="#!" 
            
            className="text-decoration-none text-muted"><small>{m.category}</small></a></div>
          <h5 className="fs-4 fontSmall text-truncate">{m.title}</h5>
          {/* rating */}
          <StarsUnderCard rating={m.rating.rate} countRating={m.rating.count}  />
          <div className="d-flex justify-content-between align-items-center my-0">
            <div>
              <span>$ {m.price} </span>
            </div>
            <button className="btn btn-dark  btn-sm ">
              <BsPlus size={22} />
              Add
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};



