import React from "react";
import { BsFillTrashFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { GetAllProductsType } from "../api/products-list-api";
import { CheckoutForm } from "../components";
import {
  addToCartOneNumber,
  deleteFromCartOneNumber,
  deleteFromDate,
  setToCartOneNumber,
} from "../reducers/cart-reducer/cart-reducer";
import { getCartSelector } from "../reducers/cart-reducer/cart-selector";
import { getAllProducts } from "../reducers/products-list-reducer/products-list-selector";
import { AppDispatch } from "../reducers/redux-store";

export const Checkout = React.memo(() => {
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
    if (number < 0) {
      number = number * -1;
    }
    if (number === 0) {
      number = 1;
    }
    dispatch(setToCartOneNumber(id, number));
  };
  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <div className="mb-2">
            <h1>Checkout</h1>
            <p>There are {cartDate.products.length} product in this Checkout.</p>
          </div>
        </div>
      </div>
      <hr />
      <div className="row">
        <div className="col-3">
          
          <CheckoutForm />
        </div>
        <div className="col-9">
      <ul className="list-group list-group-flush">
        {cartDate.products.length > 0
          ? cartDate.products.map((m) => {
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
                  {/*   delete */}

                    <div className="col-1 text-lg-end text-start text-md-start col-md-1 col-lg-1">
                    <div className=" small lh-1">
                        <span
                          onClick={() => deleteFromCart(m.productId)}
                          className="text-decoration-none text-inherit span__link"
                        >
                          <span className="me-1 align-text-bottom text-muted">
                            <BsFillTrashFill />
                          </span>
                        </span>
                      </div>
                    </div>
                   {/*  title */}
                    <div className="col-2 col-md-2">
                      <img
                        src={findProduct?.image}
                        alt="/"
                        className="img-fluid w-50"
                      />
                    </div>
                {/*     title */}
                    <div className="col-4 col-md-6 col-lg-4">
                             <NavLink
                       
                              to={`/products/product/${findProduct.id}`}
                              className="text-inherit"
                            >
                              <h6 className="mb-0">{findProduct?.title}</h6>
                            </NavLink>
                      <span>
                        <small className="text-muted">98 / lb</small>
                      </span>
              
                    </div>
{/* delete */}
                    <div className="col-2 col-md-4 col-lg-2">
                    <div className="input-group input-spinner  ">
                     
                     <div className="">
                       <div className="input-group input-spinner  ">
                         <input
                           onClick={() => deleteOneNumberCart(m.productId)}
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
                             {/*  {m.count} */}
                    <div className="col-1 text-lg-end text-start text-md-end col-md-1col-lg-2">
                  
                      <span className="">${findProduct.price} {/* {m.quantity} */}</span>

                    </div>
{/* sum */}
                    <div className="col-1 text-lg-end text-start text-md-end col-md-1 col-lg-2">
                  
                  <span className="fw-bold">${findProduct.price * m.quantity} {/* {} */}</span>

                </div>
                  </div>
                </li>
              );
            })
          : "No added any products"}
      </ul>
      </div></div>
      <hr />
      <div className="d-flex justify-content-between">
        <div>  count:
          {cartDate.products.reduce((total, obj) => total + obj.quantity, 0)}</div>
        <div className="me-2">
        $ {sum.toFixed(2)} 
        </div>
      </div>
      <hr />
    </div>
  );
});
