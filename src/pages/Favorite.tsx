import React, { useEffect } from "react";
import { BsFillTrashFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { ProductCartType } from "../admin/api/cart-api";
import { GetAllProductsType } from "../api/products-list-api";
import { ButtonAddToCard } from "../components/Products";
import { setProductCart } from "../reducers/cart-reducer/cart-reducer";
import { getFavoriteSelector } from "../reducers/products-list-reducer/products-list-selector";
import { AppDispatch } from "../reducers/redux-store";
import { onDeleteToFavorite } from "../utils/functions";
import { getLocalStorage } from "../utils/getLocalStorage";

import "./Favorite.scss";

const Favorite = React.memo(() => {
  const getFavoriteData = useSelector(getFavoriteSelector);
  const dispatch: AppDispatch = useDispatch();
  const addToCart = (
    userId: number,
    date: string,
    products: ProductCartType[]
  ) => {
    dispatch(setProductCart(userId, date, products));
  
  };

  const getLocalIdFavorite = getLocalStorage("favorite") as GetAllProductsType[]
  return (    <section>
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="mb-8 ">
              <h1 className="mb-1">My Wishlist</h1>
              <p>
                {getLocalIdFavorite.length > 0
                  ? `There are ${
                    getLocalIdFavorite.length === 1
                        ? `${getLocalIdFavorite.length} product`
                        : `${getLocalIdFavorite.length} products`
                    } in this wishlist.`
                  : ""}
              </p>
            </div>
            {getLocalIdFavorite.length > 0 ? (
              <div>
                <div className="table-responsive min__vh__50">
                  <table className="table text-nowrap">
                    <thead className="table-light">
                      <tr>
                        <th>
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              value=""
                            />
                            <label className="form-check-label"></label>
                          </div>
                        </th>
                        <th></th>
                        <th>Product</th>
                        <th>Amount</th>
                        <th>Status</th>
                        <th>Actions</th>
                        <th>Remove</th>
                      </tr>
                    </thead>
                    <tbody>
                      {getLocalIdFavorite.map((m, i) => {
                        return (
                          <tr key={m.id}>
                            <td className="align-middle">
                              <div className="form-check">
                                <input
                                  type=" checkbox"
                                  className=" form-check-input"
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor=""
                                ></label>
                              </div>
                            </td>
                            {/*  img */}
                            <td className="align-middle">
                              <Link to={"/products/product/" + m.id.toString()}>
                                <img
                                  src={m.image}
                                  alt={m.title}
                                  className="img-fluid icon-shape icon-xxl favorite__image"
                                />
                              </Link>
                            </td>
                            <td className="align-middle">
                              <div>
                                <h5 className="fs-6 mb-0">{m.title}</h5>
                                <small>{m.price}</small>
                              </div>
                            </td>
                            <td className="align-middle">{m.price}</td>
                            <td className="align-middle">
                              <span className="badge bg-success">In Stock</span>
                            </td>
                            <td className="align-middle">
                            <ButtonAddToCard addToCart={addToCart} id={m.id} />
                            </td>
                            <td className="align-middle">
                              <span className="text-muted">
                                <span
                                  onClick={() =>
                                    onDeleteToFavorite(m.id, dispatch)
                                  }
                                  className="span__link"
                                >
                                  <BsFillTrashFill />
                                </span>
                              </span>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : (
              <div className="min__vh__50">Not favorite</div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
});

export default Favorite;
