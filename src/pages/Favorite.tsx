import React, { useEffect } from "react";
import { BsFillTrashFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getFavoriteSelector } from "../reducers/products-list-reducer/products-list-selector";
import { onDeleteToFavorite } from "../utils/funcrions";
import { getLocalStorage } from "../utils/getLocalStorage";

import "./Favorite.scss";

const Favorite = React.memo(() => {
  const getFavoriteData = useSelector(getFavoriteSelector);
  const dispatch = useDispatch();

  return (
    <section>
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="mb-8 ">
              <h1 className="mb-1">My Wishlist</h1>
              <p>
                {getLocalStorage("favorite").length > 0
                  ? `There are ${
                      getLocalStorage("favorite").length === 1
                        ? `${getLocalStorage("favorite").length} product`
                        : `${getLocalStorage("favorite").length} products`
                    } in this wishlist.`
                  : ""}
              </p>
            </div>
            {getLocalStorage("favorite").length > 0 ? (
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
                      {getLocalStorage("favorite").map((m, i) => {
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
                              <button className=" btn btn-dark btn-sm">
                                Add to cart
                              </button>
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
