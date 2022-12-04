import React, { useEffect } from "react";
import { BsFillTrashFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import { GetAllProductsType } from "../api/products-list-api";
import "./Favorite.scss";
const Favorite = React.memo(() => {
  let getDataLocalStorage: Array<GetAllProductsType> | null = [];

  if (localStorage.getItem("favorite") !== null) {
    getDataLocalStorage = JSON.parse(
      localStorage.getItem("favorite") as string
    ) as Array<GetAllProductsType>;
  }

  return (
    <section>
      <div className="container">
<div className="row">
  <div className="col-lg-12">
    <div className="mb-8">
    <h1 className="mb-1">My Wishlist</h1>
    <p>There are 5 products in this wishlist.</p>
    </div>
      {getDataLocalStorage.length > 0 ? (
        getDataLocalStorage.map((m, i) => {
          return (
            <div key={m.id}>
              <div className="table-responsive">
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
                    <tr>
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
                          <h5 className="fs-6 mb-0 ">{m.title}</h5>
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
                          <BsFillTrashFill />
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          );
        })
      ) : (
        <div>Not favorite</div>
      )}
 </div></div></div></section>
  );
});

export default Favorite;
