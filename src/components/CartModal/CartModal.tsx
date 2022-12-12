import React, { useEffect, useState } from "react";
import { BsCheckCircleFill, BsFillTrashFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { GetAllProductsType } from "../../api/products-list-api";
import {
  addToCartOneNumber,
  cleanCart,
  deleteFromCartOneNumber,
  deleteFromDate,
  setProductCart,
  setToCartOneNumber,
} from "../../reducers/cart-reducer/cart-reducer";
import { getCartSelector } from "../../reducers/cart-reducer/cart-selector";
import { getProductsCategory } from "../../reducers/products-category-reducer/products-category-reducer";
import { getAllProductsCategory } from "../../reducers/products-category-reducer/products-category-selector";

import { getAllProducts } from "../../reducers/products-list-reducer/products-list-selector";
import { AppDispatch } from "../../reducers/redux-store";
import { OrderForm } from "../Form/OrderForm";

import { OnModalProduct } from "../Products";
import "./CartModal.scss";

type CartModalType = {
  isOpenMenu: boolean;
  setIsOpenMenu: (b: boolean) => void;
};

export const CartModal = React.memo(
  ({ isOpenMenu, setIsOpenMenu }: CartModalType) => {
    const cartDate = useSelector(getCartSelector);
    const getProduct = useSelector(getAllProductsCategory);
    const dispatch: AppDispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    /* modal */
    /*   const [isOpenModal, setIsOpenModal] = useState(false); */
    const [isOrderOneActive, setIsOrderOneActive] = useState(false);
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
      if (number < 0) {
        number = number * -1;
      }
      if (number === 0) {
        number = 1;
      }
      dispatch(setToCartOneNumber(id, number));
    };
    //clear cart
    const onClearCart = () => {
      dispatch(cleanCart());
    };

    // navigate to order page
    const onOrderPage = () => {
      // eslint-disable-next-line no-sequences
      return setIsOpenMenu(!isOpenMenu), navigate("/checkout");
    };

    useEffect(() => {
      dispatch(getProductsCategory("asc", "1000"));
    }, [navigate]);

    useEffect(() => {}, [cartDate]);
    //alert free delivery
    let summary = [0] as number[];
    if (cartDate.products.length > 0) {
      summary = cartDate.products.map((m) => {
        const findProduct = getProduct.find((f) => f.id === m.productId);
        if (findProduct === undefined) {
          return 0;
        } else {
          return findProduct.price * m.quantity;
        }
      });
    }

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
            <div>
              {cartDate.products.length > 0 && summary[0] > 200 ? (
                <div className="alert alert-info p-2">
                  You’ve got FREE delivery. Start
                  <Link to="checkout" className="alert-link">
                    {" "}
                    checkout now!
                  </Link>
                </div>
              ) : (
                ""
              )}
            </div>
            <ul className="list-group list-group-flush">
              {cartDate.products.length > 0
                ? cartDate.products.map((m) => {
                    const findProduct = getProduct.find(
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
                                      setValueCart(
                                        m.productId,
                                        +e.target.value
                                      );
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
                            <span className="fw-bold">
                              ${findProduct.price}
                            </span>
                          </div>
                        </div>
                      </li>
                    );
                  })
                : "No added any products"}
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
            {/*     buttons */}
            <div className="d-flex justify-content-between mt-4">
              <button
                onClick={() => setIsOrderOneActive(!isOrderOneActive)}
                className="btn btn-dark"
              >
                Checkout in a click
              </button>
              <button
                onClick={() => {
                  return onOrderPage();
                }}
                className="btn btn-dark"
              >
                Checkout
              </button>
            </div>
            {/* buttons */}
            <hr />
            <div className="mt-3 d-flex justify-content-between">
              <button
                onClick={() => setIsOpenMenu(!isOpenMenu)}
                className="btn btn-light"
              >
                Continue Shopping
              </button>
              <button onClick={() => onClearCart()} className="btn btn-light">
                Clear cart
              </button>
            </div>
          </div>
        </div>
        {/*  shadow */}
        {isOpenMenu && (
          <div
            onClick={() => setIsOpenMenu(!isOpenMenu)}
            className={`offcanvas-backdrop  ${
              isOpenMenu ? " fade show" : "fade"
            } `}
          ></div>
        )}

        {/*   order one click modal */}
        <OnModalProduct
          name={"Order in a click"}
          isOpenModal={isOrderOneActive}
          setIsOpenModal={setIsOrderOneActive}
        >
          <OrderForm
            isOpenModal={isOrderOneActive}
            setIsOpenModal={setIsOrderOneActive}
            isOpenMenu={isOpenMenu}
            setIsOpenMenu={setIsOpenMenu}
            onClearCart={onClearCart}
          />
        </OnModalProduct>
      </>
    );
  }
);
