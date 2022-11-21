import React, { SetStateAction, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux/es/exports";
import { NavBreadcrumb } from "../components";
import { getAllProducts, getFilter } from "../reducers/products-list-selector";
import { AppDispatch } from "../reducers/redux-store";
import { CartProduct } from "../components/Products/ProductsCard";
import {
  getDataInCategory,
  getProducts,
} from "../reducers/products-list-reducer";
import { useLocation } from "react-router-dom";
import { useQueryParam, StringParam, ArrayParam, objectToSearchString, decodeQueryParams } from "use-query-params";
import Paginator from "../utils/Paginator";
import Slider from "rc-slider";

import "rc-slider/assets/index.css";

type QueryType = {
  limit?: string;
  sort?: string;
};

const Products = React.memo(() => {
  //get data
  const products = useSelector(getAllProducts);
  const dispatch: AppDispatch = useDispatch();
  const location = useLocation();
  const filter = useSelector(getFilter);
  // set url
  const [limitParam, setLimitParam] = useQueryParam("limit", StringParam);
  const [paramSort, setParamSort] = useQueryParam("sort", StringParam);
  const [currentPage, setCurrentPage] = useQueryParam("page", StringParam);
  const [sortRatePrice, setSortRatePrice] = useQueryParam("sort", StringParam);
  const [sortRangePriceMaxMin, setSortRangePriceMaxMin] = useQueryParam("price", ArrayParam);
 
  //sent to paginator
  const [itemOffset, setItemOffset] = useState(1);
  let limitParamNew = 5;
  if (typeof limitParam === 'string' ) {
    limitParamNew = +limitParam
  }
//itemOffset - number page
//limitParamNew - limit page
  const itemOff = (itemOffset * limitParamNew) % products.length;
  const endOffset = itemOff + limitParamNew

  const currentItems = products.slice(itemOff, endOffset);
  debugger
    //Fitter min max price filter
    const productMaxPrice = Math.max.apply(
      null,
      products.map((m) => Math.round(m.price))
    );
    const productMinPrice = Math.min.apply(
      null,
      products.map((m) => Math.round(m.price))
    );
  // price on range and value
    const [maxMinStartPrice, setMaxMinStartPrice] = useState([0, 0]);
    const [minMaxPrice, setMinMaxPrice] = useState<Array<number> | number>([
      0, 0,
    ]);
  // sortOldPrice rating
  const [sortOldPrice, setSortOldPrice] = useState('')
  //Get category url
  const productInCategoryUrl = location.pathname.slice(
    location.pathname.lastIndexOf("/")
  );

  //requests first
  useEffect(() => {
    if (location.pathname.includes("category")) {
      dispatch(
        getDataInCategory(productInCategoryUrl, filter.sort, filter.limit)
      );
    }
  }, [location.pathname]);

  useEffect(() => {
    if (!location.pathname.includes("category")) {
      dispatch(getProducts(filter.sort, filter.limit));
    }
  }, []);

  //get url
  useEffect(() => {
    let actualFilter: QueryType = filter;
    if (limitParam) {
      const changeParamObj = limitParam as string;
      actualFilter = { ...actualFilter, limit: changeParamObj };
    }
    if (paramSort) {
      const changeParamObj = paramSort as string;
      actualFilter = { ...actualFilter, sort: changeParamObj };
    }

    if (currentPage) {
      setItemOffset(+currentPage);
    }
    if (sortRatePrice) {
      setSortOldPrice(sortRatePrice);
    }

    if(Array.isArray(sortRangePriceMaxMin)) {
      let min = 0;
      if (sortRangePriceMaxMin[0] !== null) {
        min = +sortRangePriceMaxMin[0]
       }
       let max = 0;
       if (sortRangePriceMaxMin[1] !== null) {
        max = +sortRangePriceMaxMin[1]
       }
    
      setMinMaxPrice([min, max])
    } 

    if (location.pathname.includes("category")) {
      dispatch(
        getDataInCategory(
          productInCategoryUrl,
          actualFilter.sort as string,
          actualFilter.limit as string
        )
      );
    } else {
      dispatch(
        getProducts(actualFilter.sort as string, actualFilter.limit as string)
      );
    }
  }, []);


  // request limit filter
  const setLimitProducts = (productInfoLimit: string) => {
    setItemOffset(1);
    setLimitParam(productInfoLimit);
    if (location.pathname.includes("category")) {
      dispatch(
        getDataInCategory(productInCategoryUrl, filter.sort, productInfoLimit)
      );
    } else {
      dispatch(getProducts(filter.sort, productInfoLimit));
    }
  };


  //sort old hight

  const filterOldPrice = (e: string) => {
    setSortRatePrice(e)
    if(e === 'rating') {
      setSortOldPrice('rating')
    }
    if(e === 'old') {
      setSortOldPrice('old')
    }
    if(e === 'hight') {
      setSortOldPrice('hight')
    }
    //data
    if(e === 'asc') {
      setSortOldPrice(e);
 /*    if (location.pathname.includes("category")) {
      dispatch(
        getDataInCategory(productInCategoryUrl, e, filter.limit)
      );
    } else {
      dispatch(getProducts(e, filter.limit));
    } */
    }
    if(e === 'desc') {
      setSortOldPrice(e);
 /*    if (location.pathname.includes("category")) {
      dispatch(
        getDataInCategory(productInCategoryUrl, e, filter.limit)
      );
    } else {
      dispatch(getProducts(e, filter.limit));
    } */
    }
    
  }

  //min max price from range filter ---
  useEffect(() => {

    if (
      productMaxPrice !== Infinity &&
      productMaxPrice !== -Infinity &&
      productMaxPrice !== undefined &&
      productMinPrice !== Infinity &&
      productMinPrice !== -Infinity &&
      productMinPrice !== undefined
    ) {
      if (sortRangePriceMaxMin) {

      } else {
      setMinMaxPrice([productMinPrice, productMaxPrice]);
      }
      setMaxMinStartPrice([productMinPrice, productMaxPrice]);
    } else {
      
      if (sortRangePriceMaxMin) {

      } else {
        setMinMaxPrice(0);
      }
      setMaxMinStartPrice([0, 0]);
    }
  
  }, [productMaxPrice, productMinPrice]);


  //price in inputs
  const setMinPrice = (e: string) => {
    if (Array.isArray(minMaxPrice)) {
      setMinMaxPrice([+e, minMaxPrice[1]]);
    }
  };
  const setMaxPrice = (e: string) => {
    if (Array.isArray(minMaxPrice)) {
      setMinMaxPrice([minMaxPrice[0], +e]);
    }
  };

  return (
    <>
      <main>
        <NavBreadcrumb />
        <div>
          {/* container */}
          <div className="container">
            <div className="row  gx-10">
              {/*  section filter */}
              <aside className="col-lg-3 col-md-4 mb-6 mb-md-0">
                {/*  min max ok form */}
                <div className="row mt-3">
                  <div className="mb-2">Price:</div>
                  <div className="col-4">
                    <input
                      type="text"
                      value={Array.isArray(minMaxPrice) && minMaxPrice.length > 0 ? minMaxPrice[0] : 0}
                      disabled={Array.isArray(minMaxPrice) && minMaxPrice.length > 0 ? false : true}
                      className="form-control"
                      onChange={(e) => setMinPrice(e.target.value)}
                    />
                  </div>
                  <span className="col-4 align-self-center  text-center">
                    —
                  </span>
                  <div className="col-4">
                    <input
                      type="text"
                      value={Array.isArray(minMaxPrice) && minMaxPrice.length > 0 ? minMaxPrice[1] : 0}
                      disabled={Array.isArray(minMaxPrice) && minMaxPrice.length > 0 ? false : true}
                      className="form-control"
                      onChange={(e) => setMaxPrice(e.target.value)}
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col">
                    <Slider
                      range
                      defaultValue={[maxMinStartPrice[0], maxMinStartPrice[1]]}
                      className="t-slider mt-3"
                      min={maxMinStartPrice[0]}
                      max={maxMinStartPrice[1]}
                      value={minMaxPrice}
                      onAfterChange ={(arr)=>{
                        if(arr !== undefined && Array.isArray(arr) ) {
                          setSortRangePriceMaxMin([arr[0].toString(), arr[1].toString()])
                        }
                      }}
                      onChange={(arr) => {setMinMaxPrice(arr);}}
                    />
                  </div>
                </div>
              </aside>
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
                      <span className="text-dark">{products.length} </span>
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
                          </svg>
                          Filters
                        </a>
                      </div>
                    </div>
                    <div className="d-flex mt-2 mt-lg-0">
                      {/* selector limit */}
                      <div className="me-2 flex-grow-1">
                        <select
                          value={filter.limit}
                          onChange={(e) => setLimitProducts(e.target.value)}
                          className="form-select"
                          aria-label="Default select example"
                        >
                          <option value="2">Show 2</option>
                          <option value="5"> 5</option>
                          <option value="10">10</option>
                          <option value="20">20</option>
                        </select>
                      </div>
                      {/* selector old new */}
                    {/*   <div className="me-2">
                        <select
                          value={filter.sort}
                          onChange={(e) => setProductsDesc(e.target.value)}
                          className="form-select"
                          aria-label="Default select example"
                        >
                 
                        </select>
                      </div> */}
                      {/* select price Low height   */}
                      <div>
                        <select
                          value={sortOldPrice}
                          onChange={(e) => filterOldPrice(e.target.value)}
                          className="form-select"
                          aria-label="Default select example"
                        >
                          <option value="asc">Data: New</option>
                          <option value="desc">Data: Old</option>
                          <option value="rating">Sort by: Rating</option>
                          <option value="old">Price: Old to Hight</option>
                          <option value="hight">Price: Hight to Old</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
                {/*  list products */}
                <div className="row g-4 row-cols-xl-3 row-cols-lg-3 row-cols-2 row-cols-md-2 mt-2">
                  {currentItems
                    .filter((m) => {
                      if (Array.isArray(minMaxPrice)) {
                        return (
                         Math.round(m.price)  <= minMaxPrice[1] && minMaxPrice[0] <=  Math.round(m.price)
                        );
                      } else {
                        return m;
                      }
                    })
                    
               /*      sortOldPrice */
                    .sort((s, b)=> sortOldPrice ===  'old' ? Math.round(s.price - b.price )  
                    : sortOldPrice ===  'hight' ?  Math.round( b.price - s.price ) 
                    : sortOldPrice ===  'asc' ?  s.id - b.id 
                    : sortOldPrice ===  'desc' ?  b.id - s.id 
                    : Number.isInteger(s.rating.rate) ? (b.rating.rate * 10 - s.rating.rate * 10) 
                    : (b.rating.rate * 100 - s.rating.rate * 100)
                  )

                    .map((m) => (
                      <CartProduct m={m} key={m.id} />
                    ))}
                </div>
                {/* paginator */}
                <div className="mt-3">
                  <Paginator
                    itemsPerPage={+filter.limit}
                    newOffset={itemOffset}
                    setCurrentPage={setCurrentPage}
                    items={products.length}
                    setItemOffset={setItemOffset}
                  />
                </div>
                {/* paginator */}
              </section>
            </div>
          </div>
        </div>
      </main>
    </>
  );
});

export default Products;
