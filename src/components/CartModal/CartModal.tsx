import React, { useState } from "react";
import { BsCheckCircleFill, BsFillTrashFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { GetAllProductsType } from "../../api/products-list-api";
import {
  addToCartOneNumber,
  deleteFromCartOneNumber,
  deleteFromDate,
  setToCartOneNumber,
} from "../../reducers/cart-reducer/cart-reducer";
import { getCartSelector } from "../../reducers/cart-reducer/cart-selector";
import { getAllProducts } from "../../reducers/products-list-reducer/products-list-selector";
import { AppDispatch } from "../../reducers/redux-store";
import "./CartModal.scss";

type CartModalType = {
  isOpenMenu: Boolean;
  setIsOpenMenu: (b: boolean) => void;
};

export const CartModal = React.memo(
  ({ isOpenMenu, setIsOpenMenu }: CartModalType) => {
    const cartDate = useSelector(getCartSelector);
    const getProducts = useSelector(getAllProducts);
    const dispatch: AppDispatch = useDispatch();
    let sum = 0;

    const deleteFromCart = (id: number) => {
      dispatch(deleteFromDate(id));
    };

    const deleteOneNumberCart = (id: number) => {
      dispatch(deleteFromCartOneNumber(id));
    };

    const addNumberToCart = (id: number) => {
      dispatch(addToCartOneNumber(id));
    };
    const setValueCart = (id: number, number: number) => {
     if(number < 0 ){
      number = number * -1
     } 
     if(number === 0 ){
      number = 1
     } 
      dispatch(setToCartOneNumber(id, number));
    };
    return (
      <>
        <div
          className={`offcanvas offcanvas-end  ${
            isOpenMenu ? "show" : "show hiding"
          } `}
        >
          <div className="offcanvas-header border-bottom">
            <div className="text-start">
              <h5 className="mb-0 fs-4">Shop Cart</h5>
              <small>Location</small>
            </div>
            <button
              type="button"
              onClick={() => setIsOpenMenu(!isOpenMenu)}
              className="btn-close text-reset"
              aria-label="Close"
            ></button>
          </div>

          <div className="offcanvas-body">
            {/* <div>
              <div className="alert alert-danger p-2">
                You’ve got FREE delivery. Start
                <a href="/" className="alert-link">
                  checkout now!
                </a>
              </div>
            </div> */}
            <ul className="list-group list-group-flush">
              {cartDate.products.length > 0 ?
                cartDate.products.map((m) => {

                  const findProduct = getProducts.find(
                    (f) => f.id === m.productId
                  ) as GetAllProductsType;
                  if (findProduct === undefined) {
                    return null;
                  }
                  sum += findProduct.price * m.quantity;
                
                  return (
                    <li
                      key={`${m.productId}___`}
                      className="list-group-item py-3 ps-0 "
                    >
                      <div className="row align-items-center">
                        <div className="col-3 col-md-2">
                          <img
                            src={findProduct?.image}
                            alt="/"
                            className="img-fluid"
                          />
                        </div>
                        <div className="col-4 col-md-6 col-lg-5">
                          <NavLink
                            onClick={() => setIsOpenMenu(!isOpenMenu)}
                            to={`/products/product/${findProduct.id}`}
                            className="text-inherit"
                          >
                            <h6 className="mb-0">{findProduct?.title}</h6>
                          </NavLink>
                          <span>
                            <small className="text-muted">98 / lb</small>
                          </span>
                          <div className="mt-2 small lh-1">
                            <span
                              onClick={() => deleteFromCart(m.productId)}
                              className="text-decoration-none text-inherit span__link"
                            >
                              <span className="me-1 align-text-bottom">
                                <BsFillTrashFill />
                              </span>
                            </span>
                          </div>
                        </div>
                        <div className="col-4 col-md-4 col-lg-4">
                          <div className="input-group input-spinner  ">
                            {/*  {m.quantity} */}

                            <div className="mb-3">
                              <div className="input-group input-spinner  ">
                                <input
                                  onClick={() =>
                                    deleteOneNumberCart(m.productId)
                                  }
                                  type="button"
                                  value="-"
                                  disabled={m.quantity === 1 && true}
                                  className="button-minus  btn  btn-sm "
                                  data-field="quantity"
                                />
                                <input
                                  className="quantity-field form-control-sm form-input   "
                                  type="number"
                                  value={m.quantity}
                                  onChange={(e) => {
                                    setValueCart(m.productId, +e.target.value); 
                                  }}
                                />
                                <input
                                  onClick={() => addNumberToCart(m.productId)}
                                  type="button"
                                  value="+"
                                  className="button-plus btn btn-sm "
                                  data-field="quantity"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-2 text-lg-end text-start text-md-end col-md-2">
                          <span className="fw-bold">${findProduct.price}</span>
                        </div>
                      </div>
                    </li>
                  );
                })
              : 'No added any products'
              
              }
            </ul>
            <hr />
            <div className="d-flex justify-content-between">
              <div>sum: {sum.toFixed(2)} </div>
              <div className="me-2">
                count:
                {cartDate.products.reduce(
                  (total, obj) => total + obj.quantity,
                  0
                )}
              </div>
            </div>
            <div className="d-flex justify-content-between mt-4">
              <button
                onClick={() => setIsOpenMenu(!isOpenMenu)}
                className="btn btn-primary"
              >
                Continue Shopping
              </button>
              <a href="/" className="btn btn-dark">
                Update Cart
              </a>
            </div>
          </div>
        </div>
        {isOpenMenu && (
          <div
            onClick={() => setIsOpenMenu(!isOpenMenu)}
            className={`offcanvas-backdrop  ${
              isOpenMenu ? " fade show" : "fade"
            } `}
          ></div>
        )}
      </>
    );
  }
);





