import React, { useState } from "react";
import { BsEye, BsPlus, BsArrowLeftRight } from "react-icons/bs";
import { NavLink } from "react-router-dom";
import { GetAllProductsType } from "../../../api/products-list-api";
import { OnModalProduct } from "../OnModalProduct/OnModalProduct";
import { StarsUnderCard } from "../StarsUnderCard/StarsUnderCard";
import { FavoriteHeart } from "../../FavoriteHeart/FavoriteHeart";
import "./ProductCartSmall.scss";
import { ButtonProductAdd } from "../../Button/ButtonProductAdd";
type CartProductType = {
  m: GetAllProductsType;
};

export const ProductsCardList: React.FC<CartProductType> = ({ m }) => {

  const [isOpenModal, setIsOpenModal] = useState(false);

 
  return (
    <div className="row g-4  row-cols-1 mt-2">
    <div className="col  " key={m.id}>
      <div className="card card-product">
        <div className="card-body">

        <div className=" row align-items-center">
          <div className="col-md-4 col-12">
            <div className="text-center position-relative "> 
              <div className=" position-absolute top-0">
                <span className="badge bg-danger">Sale</span>

              </div>
            </div>
            <NavLink to={`/products/product/${m.id}`}>
              <img
                className="img-fluid mb-3 cardImgInBlock mx-auto"
                src={m.image}
                alt={m.title}
              />
            </NavLink>
          </div>
     

        <div className="col-md-8 col-12 flex-grow-1">
        <div className="text-small mb-1">
            <a href="#!" className="text-decoration-none text-muted">
              <small>{m.category}</small>
            </a>
          </div>
          <h2 className="fs-6">{m.title}</h2>
          <StarsUnderCard rating={m.rating.rate} countRating={m.rating.count} />
          <div className=" mt-6">
          <div>
              <span>$ {m.price} </span>
            </div>

          </div>
          <div className="mt-3">
          <span
              
              onClick={()=>setIsOpenModal(!isOpenModal)}
                 className="btn btn-icon btn-sm btn-outline-gray-400 text-muted me-2"
                 data-bs-target="#quickViewModal"
               >
                 <BsEye />
               </span>
              
             <FavoriteHeart id={m.id} className={'btn btn-icon btn-sm btn-outline-gray-400 text-muted me-2'} />
 
 
               <span
        
                 className="btn btn-icon btn-sm btn-outline-gray-400 text-muted"
                 data-bs-html="true"
                 aria-label="Compare"
               >
                 <BsArrowLeftRight  />
               </span>
          </div>
          <div className="mt-2">
          <ButtonProductAdd />
          </div>
        </div>
        </div>
        </div>
      </div>
      <OnModalProduct name={''} isOpenModal={isOpenModal} setIsOpenModal={setIsOpenModal} size={2} >
        <div>dsf</div>
      </OnModalProduct>
    </div>
    </div>
  );
};




