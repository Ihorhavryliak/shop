import React, { useState } from "react";
import { BsEye, BsPlus, BsArrowLeftRight } from "react-icons/bs";
import { Link, NavLink } from "react-router-dom";
import { GetAllProductsType } from "../../../api/products-list-api";
import { OnModalProduct } from "../OnModalProduct/OnModalProduct";
import { StarsUnderCard } from "../StarsUnderCard/StarsUnderCard";
import { FavoriteHeart } from "../../FavoriteHeart/FavoriteHeart";
import "./ProductsCard.scss";
import { ButtonProductAdd } from "../../Button/ButtonProductAdd";
import {
  ProductButtons,
  ProductCharacteristics,
  ProductCount,
  ProductImg,
} from "../../Product";
import { useDispatch } from "react-redux";
import { ProductCartType } from "../../../admin/api/cart-api";
import { setProductCart } from "../../../reducers/cart-reducer/cart-reducer";
import { AppDispatch } from "../../../reducers/redux-store";
type CartProductType = {
  m: GetAllProductsType;
};

export const ProductsCardList: React.FC<CartProductType> = ({ m }) => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const dispatch: AppDispatch = useDispatch()
  const addToCart = (
    userId: number,
    date: string,
    products: ProductCartType[]
  ) => {
    dispatch(setProductCart(userId, date, products));
  
  };
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
                <StarsUnderCard
                  rating={m.rating.rate}
                  countRating={m.rating.count}
                />
                <div className=" mt-6">
                  <div>
                    <span>$ {m.price} </span>
                  </div>
                </div>
                <div className="mt-3">
                  <span
                    onClick={() => setIsOpenModal(!isOpenModal)}
                    className="btn btn-icon btn-sm btn-outline-gray-400 text-muted me-2"
                    data-bs-target="#quickViewModal"
                  >
                    <BsEye />
                  </span>

                  <FavoriteHeart
                    id={m.id}
                    className={
                      "btn btn-icon btn-sm btn-outline-gray-400 text-muted me-2"
                    }
                  />

                  <span
                    className="btn btn-icon btn-sm btn-outline-gray-400 text-muted"
                    data-bs-html="true"
                    aria-label="Compare"
                  >
                    <BsArrowLeftRight />
                  </span>
                </div>
                <div className="mt-2">
                  <ButtonProductAdd />
                </div>
              </div>
            </div>
          </div>
        </div>
        <OnModalProduct
          name={""}
          isOpenModal={isOpenModal}
          setIsOpenModal={setIsOpenModal}
          showProduct={"showProduct"}
        >
          <div className="row" key={m.id}>
            <ProductImg m={m} />
            <div className="col-md-6">
              <div className="ps-lg-10 mt-6 mt-md-0">
                <Link
                  className="mb-4 d-block"
                  to={`/products/category/${m.category.replace(" ", "-")}`}
                >
                  {m.category[0].toUpperCase() + m.category.slice(1)}
                </Link>
                {/* h1 */}
                <h1 className="mb-1"> {m.title}</h1>
                <div className="mb-4">
                  <StarsUnderCard
                    rating={m.rating.rate}
                    countRating={m.rating.count}
                    type={"product"}
                  />
                </div>
                {/* price */}
                <div className="fs-4">
                  <span className="text-dark">${m.price}</span>
                </div>
              </div>
              <hr className="my-6" />
              {/*  count */}
              <ProductCount />
              <ProductButtons id={m.id}  addToCart={addToCart} />
              <hr className="my-6" />
              <ProductCharacteristics product={[m]} />
            </div>
          </div>
        </OnModalProduct>
      </div>
    </div>
  );
};
