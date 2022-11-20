import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux/es/exports";
import { NavBreadcrumb } from "../components";
import {
  getAllProducts,
  getFilter,
} from "../reducers/products-list-selector";
import { AppDispatch } from "../reducers/redux-store";
import { CartProduct } from "../components/Products/ProductsCard";
import {
  getDataInCategory,
  getProducts,
} from "../reducers/products-list-reducer";
import { useLocation, useNavigate, useNavigation } from "react-router-dom";

type QueryType = {
  limit?: string;
  sort?: string;
};

const Products = React.memo(() => {
  const products = useSelector(getAllProducts);
  const dispatch: AppDispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const filter = useSelector(getFilter)
  const productInCategoryUrl = location.pathname.slice(
    location.pathname.lastIndexOf("/")
  );

  //request
  useEffect(() => {
    if (location.pathname.includes("category")) {
      dispatch(
        getDataInCategory(productInCategoryUrl, filter.limit, filter.sort)
      );
      }
  }, [location.pathname])

  useEffect(() => {
    debugger
    if (!location.pathname.includes("category")) {
      dispatch(getProducts(filter.limit, filter.sort));
    }
  }, [])

// get Url Param
useEffect(() => {
  const getLocation = location.search;
  const queryString = require("query-string");
  const parsed = queryString.parse(getLocation) as QueryType;
  let actualFilter  = filter;

  if (parsed.limit) {
    const changeParsed = parsed.limit;
    actualFilter = {...actualFilter, limit: changeParsed};
  }

  if (parsed.sort) {
    const changeParsed = parsed.sort;
    actualFilter = {...actualFilter, sort: changeParsed}
  }

  if (location.pathname.includes("category")) {
    dispatch(getDataInCategory(productInCategoryUrl, actualFilter.limit, actualFilter.sort));
  } else {
    dispatch(getProducts(actualFilter.limit, actualFilter.sort));
  }
}, []);

  //set query in url
  useEffect(() => {
    const query: QueryType = {};
    if(filter.limit !== '5') {
       query.limit = filter.limit;
    }
  if(filter.sort !== 'asc'){
    query.sort = filter.sort;
  }
    const queryString = require("query-string");
    const queryStrings = queryString.stringify(query);
      navigate("?" + queryStrings);
  }, [filter, location.pathname]);



  const setLimitProducts = (productInfoLimit: string) => {
    if (location.pathname.includes("category")) {
      dispatch(
        getDataInCategory(productInCategoryUrl, productInfoLimit, filter.sort)
      );
    } else {
      dispatch(getProducts(productInfoLimit, filter.sort));
    }
  }

  const setProductsDesc = (productInfoDesc: string) => {
    if (location.pathname.includes("category")) {
      dispatch(
        getDataInCategory(productInCategoryUrl, filter.limit, productInfoDesc)
      );
    } else {
      dispatch(getProducts(filter.limit, productInfoDesc));
    }
  }
  
  return (
    <main>
      <NavBreadcrumb />
      <div>
        {/* container */}
        <div className="container">
          <div className="row  gx-10">
            {/*  section filter */}
            <aside className="col-lg-3 col-md-4 mb-6 mb-md-0">FIlters</aside>
            {/*   content section */}
            <section className="col-lg-9 col-md-12">
              {/* name category */}
              <div>
                <h1>Name category</h1>
              </div>
              {/*   category filter */}
              <div className="d-lg-flex justify-content-between align-items-center">
                <div className="mb-3 mb-lg-0">
                  <p className="mb-0">
                    {/*  count of products */}
                    <span className="text-dark">{products.length} </span>{" "}
                    Products found
                  </p>
                </div>
                <div className="d-md-flex justify-content-between align-items-center">
                  <div className="d-flex align-items-center justify-content-between">
                    <div className="">
                      <a href="shop-list.html" className="text-muted me-3">
                        <i className="bi bi-list-ul"></i>3
                      </a>
                      <a href="shop-grid.html" className=" me-3 active">
                        <i className="bi bi-grid"></i> 1
                      </a>
                      <a
                        href="shop-grid-3-column.html"
                        className="me-3 text-muted"
                      >
                        <i className="bi bi-grid-3x3-gap"></i> 2
                      </a>
                    </div>
                    <div className="ms-2 d-lg-none">
                      <a
                        className="btn btn-outline-gray-400 text-muted"
                        data-bs-toggle="offcanvas"
                        href="#offcanvasCategory"
                        role="button"
                        aria-controls="offcanvasCategory"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="feather feather-filter me-2"
                        >
                          <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
                        </svg>{" "}
                        Filters
                      </a>
                    </div>
                  </div>
                  <div className="d-flex mt-2 mt-lg-0">
                    <div className="me-2 flex-grow-1">
                      <select
                        value={filter.limit}
                        onChange={(e) => setLimitProducts(e.target.value)}
                        className="form-select"
                        aria-label="Default select example"
                      >
                        <option value="5">Show 5</option>
                        <option value="10">10</option>
                        <option value="20">20</option>
                      </select>
                    </div>
                    <div>
                      <select
                        value={filter.sort}
                        onChange={(e) => setProductsDesc(e.target.value)}
                        className="form-select"
                        aria-label="Default select example"
                      >
                        <option value="asc">Data: New</option>
                        <option value="desc">Data: Old</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>
              {/*  list products */}
              <div className="row g-4 row-cols-xl-3 row-cols-lg-3 row-cols-2 row-cols-md-2 mt-2">
                {products.map((m) => (
                  <CartProduct m={m} key={m.id} />
                ))}
              </div>
              <div>pages</div>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
});

export default Products;
