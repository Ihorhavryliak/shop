import React, { useState } from "react";
import { BsEye, BsArrowLeftRight } from "react-icons/bs";
import { Link, NavLink } from "react-router-dom";
import { GetAllProductsType } from "../../../api/products-list-api";
import { OnModalProduct } from "../OnModalProduct/OnModalProduct";
import { StarsUnderCard } from "../StarsUnderCard/StarsUnderCard";
import { FavoriteHeart } from "../../FavoriteHeart/FavoriteHeart";
import "./ProductsCard.scss";
import { setProductCart } from "../../../reducers/cart-reducer/cart-reducer";
import { useDispatch } from "react-redux";
import { ProductCartType } from "../../../admin/api/cart-api";
import { AppDispatch } from "../../../reducers/redux-store";

import { ProductCount } from "../../Product/ProductCount/ProductCount";
import { ProductButtons } from "../../Button/ProductButtons/ProductButtons";
import { ProductCharacteristics } from "../../Product/ProductCharacteristics/ProductCharacteristics";

import { ProductImg } from "../../Product/ProductImg/ProductImg";
import { ButtonAddToCard } from "../../Button/ProductsButtons/ButtonAddToCard";

type CartProductType = {
  m: GetAllProductsType;
  keyAdd?: string;
  kind?: string;
};

export const CartProduct: React.FC<CartProductType> = ({
  m,
  keyAdd,
  kind = "mainProduct",
}) => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const dispatch: AppDispatch = useDispatch();

  //add product to cart
  const addToCart = (
    userId: number,
    date: string,
    products: ProductCartType[]
  ) => {
    dispatch(setProductCart(userId, date, products));
  };

  //
  const [value, setValue] = useState(1);
  return (
    <div className="col  " key={`${m.id}_${keyAdd} `}>
      <div className="card card-product">
        <div className="card-body">
          {/* photo */}
          <div className="text-center position-relative">
            <div className="position-absolute top-0 start-0">
              <span className="badge bg-success">14%</span>
            </div>
            <div className="block__img mb-3">
              <NavLink to={`/products/product/${m.id}`}>
                <img
                  className="img-fluid mb-3 cardImgInBlock mx-auto "
                  src={m.image}
                  alt={m.title}
                />
              </NavLink>
            </div>
            {/*  hover */}
            {kind === "wrapper" ? (
              ""
            ) : (
              <div className="card-product-action">
                <span
                  onClick={() => setIsOpenModal(!isOpenModal)}
                  className="btn-action"
                  data-bs-target="#quickViewModal"
                >
                  <BsEye />
                </span>
                <FavoriteHeart id={m.id} />
                <span
                  className="btn-action"
                  data-bs-html="true"
                  aria-label="Compare"
                >
                  <BsArrowLeftRight />
                </span>
              </div>
            )}
          </div>
          {/* information */}
          <div className="text-small mb-1">
            <NavLink to={`/products/category/${m.category.replace(" ", "-")}`} className="text-decoration-none text-muted">
              <small>{m.category}</small>
            </NavLink>
          </div>
          <h5 className="fs-4 fontSmall text-truncate">{m.title}</h5>
          {/* rating */}
          <StarsUnderCard rating={m.rating.rate} countRating={m.rating.count} />
          <div className="d-flex justify-content-between align-items-center my-0">
            <div>
              <span>$ {m.price} </span>
            </div>
            <ButtonAddToCard addToCart={addToCart} id={m.id} />
          </div>
        </div>
      </div>
      <InformationProductModal
        value={value}
        isOpenModal={isOpenModal}
        setValue={setValue}
        setIsOpenModal={setIsOpenModal}
        m={m}
        kind={kind}
        addToCart={addToCart}
      />
    </div>
  );
};

type InformationProductModalType = {
  value: number;
  setValue: (n: number) => void;
  isOpenModal: boolean;
  setIsOpenModal: (b: boolean) => void;
  m: GetAllProductsType;
  kind?: string;
  addToCart: (
    userId: number,
    date: string,
    products: ProductCartType[]
  ) => void;
};
export const InformationProductModal = (props: InformationProductModalType) => {
  const { setIsOpenModal, isOpenModal, m, value, setValue } = props;
  const { kind, addToCart } = props;
  return (
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
          <ProductCount setValue={setValue} value={value} />
          <ProductButtons
            id={m.id}
            kind={kind}
            addToCart={addToCart}
            quantity={value}
          />
          <hr className="my-6" />
          <ProductCharacteristics product={[m]} />
        </div>
      </div>
    </OnModalProduct>
  );
};
