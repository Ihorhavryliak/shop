import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux/es/exports";
import {
  getAllProducts,
  getCategorySelector,
  getFilterSelector,
} from "../reducers/products-list-reducer/products-list-selector";
import { AppDispatch } from "../reducers/redux-store";
import {
  getDataInCategory,
  getProducts,
} from "../reducers/products-list-reducer/products-list-reducer";
import { useLocation } from "react-router-dom";
import {
  useQueryParam,
  StringParam,
  ArrayParam,
} from "use-query-params";
import Paginator from "../utils/Paginator";
import "rc-slider/assets/index.css";
import { BsGrid, BsGrid3X3Gap, BsListUl } from "react-icons/bs";
import useReactRouterBreadcrumbs from "use-react-router-breadcrumbs";
import { AsideSection, ContentCategoryName, FilterDeveloper, NavBreadcrumb } from "../components";



type QueryType = {
  limit?: string;
  sort?: string;
  contentStyle?: string
};

const Products = React.memo(() => {
  
  //get data
  const products = useSelector(getAllProducts);
  const dispatch: AppDispatch = useDispatch();
  const location = useLocation();
  const getFilter = useSelector(getFilterSelector);

  //save data filter content in  localStorage if null
  if (localStorage.getItem("filter_content") === null) {
    localStorage.setItem(
      "filter_content",
      JSON.stringify({ limit: getFilter.limit, sort: getFilter.sort, contentStyle: getFilter.contentStyle })
    );
  }
  // - get data from local
  const filter = JSON.parse(localStorage.getItem("filter_content") as string);

  // set url
  const [limitParam, setLimitParam] = useQueryParam("limit", StringParam);
  const [currentPage, setCurrentPage] = useQueryParam("page", StringParam);
  const [sortRatePrice, setSortRatePrice] = useQueryParam("sort", StringParam);
  const [sortRangePriceMaxMin, setSortRangePriceMaxMin] = useQueryParam(
    "price",
    ArrayParam
  );
  //filter check checkbox
  const [nameFilterCategory, setNameFilterCategory] = useState<Array<string | null>>([]);
  //get categories
  const categoriesNameData = useSelector(getCategorySelector);
  //sent to paginator
  const [itemOffset, setItemOffset] = useState(1);
  let limitParamNew = +filter.limit;
  if (typeof limitParam === "string") {
    limitParamNew = +limitParam;
  }

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
  // filter content sortOldPrice rating data
  const [sortOldPrice, setSortOldPrice] = useState(filter.sort);

  //Get category url
  const productInCategoryUrl = location.pathname.slice(
    location.pathname.lastIndexOf("/")
  ).replace("-", " ");
  // Filter rating stars
  const [filterRating, setFilterRating] = useState<Array<number>>([]);
  const ratingArr = [5, 4, 3, 2, 1];

  //Name category
  const breadcrumbs = useReactRouterBreadcrumbs();
  //@ts-ignore
  const categoryBreadcrumbsName = breadcrumbs[breadcrumbs.length - 1].breadcrumb.props.children as string;

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
    // set data in initial state
    if (sortRatePrice) {
      const changeParamObj = sortRatePrice as string;
      actualFilter = { ...actualFilter, sort: changeParamObj };
    }

    if (currentPage) {
      setItemOffset(+currentPage);
    }
    if (sortRatePrice) {
      setSortOldPrice(sortRatePrice);
    }
    // sort Range Price Max Min
    if (Array.isArray(sortRangePriceMaxMin)) {
      let min = 0;
      if (sortRangePriceMaxMin[0] !== null) {
        min = +sortRangePriceMaxMin[0];
      }
      let max = 0;
      if (sortRangePriceMaxMin[1] !== null) {
        max = +sortRangePriceMaxMin[1];
      }
      setMinMaxPrice([min, max]);
    }
    //send data
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
  //min max price from range filter ---
  useEffect(() => {
    if (
      productMaxPrice !== Infinity &&
      productMaxPrice !== -Infinity &&
      productMaxPrice !== undefined
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
  // request limit filter select
  const setLimitProducts = (productInfoLimit: string) => {
    // update page
    setItemOffset(1);
    // set limit in use
    setLimitParam(productInfoLimit);
    // ad to local storage
    addFilterStorageLocal("limit", productInfoLimit);
  };
  //sort old hight
  const setFilterSort = (e: string) => {
    //set in url
    setSortRatePrice(e);
    //set page on 1
    setItemOffset(1);
    // select filter sort
    choseFilterSort(e);
  };
  const choseFilterSort = (value: string) => {
    setSortOldPrice(value);
    addFilterStorageLocal("sort", value);
  };
  // function set add to local storage filter
  const addFilterStorageLocal = (name: string, value: string) => {
    const localStorageFilterData = JSON.parse(
      localStorage.getItem("filter_content") as string
    );
    localStorage.setItem(
      "filter_content",
      JSON.stringify({ ...localStorageFilterData, [name]: value })
    );
  };
  //set main style in local storage
  const setStylesContent = (name: string) => {
    addFilterStorageLocal('contentStyle', name)
  }


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
  //length depend on chose price on range and category
  const productsLength = products
    .filter((r) => {
      if (filterRating.length > 0) {
        const min = Math.min(...filterRating);
        const max = Math.max(...filterRating);
        return min - 1 <= r.rating.rate && max >= r.rating.rate; //1 2.2 3  4.8
      } else {
        return r;
      }
    })
    .filter((f) => {
      if (nameFilterCategory.length > 0) {
        return nameFilterCategory.includes(f.category);
      } else {
        return f;
      }
    })
    .filter((m) => {
      if (Array.isArray(minMaxPrice)) {
        return (
          Math.round(m.price) <= minMaxPrice[1] &&
          minMaxPrice[0] <= Math.round(m.price)
        );
      } else {
        return m;
      }
    }).length;

  //Filter category
  const setFilterCategoryName = (e: string) => {
    //set page on 1
    setItemOffset(1);
    //add delete category in arr
    let indexNameCategory = categoriesNameData.indexOf(e);
    if (nameFilterCategory.includes(e)) {
      indexNameCategory = nameFilterCategory.indexOf(e);
      const deleteCategory = nameFilterCategory.filter((f) => f !== e);
      setNameFilterCategory(deleteCategory);
    } else {
      setNameFilterCategory([
        ...nameFilterCategory,
        (nameFilterCategory[indexNameCategory] = e),
      ]);
    }
  };

  // Filter rating stars
  const setFilterRate = (e: number) => {
    //set page on 1
    setItemOffset(1);
    //add delete category in arr
    let indexNameRate = ratingArr.indexOf(e);
    if (filterRating.includes(e)) {
      indexNameRate = ratingArr.indexOf(e);
      const deleteRate = filterRating.filter((f) => f !== e);
      setFilterRating(deleteRate);
    } else {
      setFilterRating([...filterRating, (filterRating[indexNameRate] = e)]);
    }
  };

  return (
    <>
      <main>
        <NavBreadcrumb />
        <div className=" mt-8 mb-lg-14 mb-8">
          {/* container */}
          <div className="container">
            <div className="row  gx-10">
              {/*  section filter */}
              <AsideSection
                minMaxPrice={minMaxPrice}
                setMaxPrice={setMaxPrice}
                setMinPrice={setMinPrice}
                maxMinStartPrice={maxMinStartPrice}
                setSortRangePriceMaxMin={setSortRangePriceMaxMin}
                setItemOffset={setItemOffset}
                setMinMaxPrice={setMinMaxPrice}
                categoriesNameData={categoriesNameData}
                nameFilterCategory={nameFilterCategory}
                setFilterCategoryName={setFilterCategoryName}
                ratingArr={ratingArr}
                setFilterRate={setFilterRate}
                filterRating={filterRating}
              />
              {/*   content section */}
              <section className="col-lg-9 col-md-12">
                {/* name category */}
                <ContentCategoryName categoryName={categoryBreadcrumbsName}  />

                {/*   category filter */}
                <div className="d-lg-flex justify-content-between align-items-center">
                  <div className="mb-3 mb-lg-0">
                    <p className="mb-0">
                      {/*  count of products */}
                      <span className="text-dark">{productsLength} </span>
                      Products found
                    </p>
                  </div>
                  {/* content filter / */}
                  <div className="d-md-flex justify-content-between align-items-center">
                    <div className="d-flex align-items-center justify-content-between">
                      {/*  change style main content */}
              <div>
                        <a
                          href={"#list"}
                          onClick={() => {
                            setStylesContent("list");
                          }}
                        /*   className={
                            mainContentStyle === "list"
                              ? "active me-3"
                              : "text-muted me-3"
                          } */
                        >
                          <BsListUl />
                        </a>
                        <a
                          href={"#onFour"}
                          onClick={() => {
                            setStylesContent("on-four");
                          }}
                      /*     className={
                            mainContentStyle === "on-four"
                              ? "active me-3"
                              : "text-muted me-3"
                          } */
                        >
                          <BsGrid />
                        </a>
                        <a
                          href={"#onThree"}
                          onClick={() => {
                            setStylesContent("on-three");
                          }}
                      /*     className={
                            mainContentStyle === "on-three"
                              ? "active me-3"
                              : "text-muted me-3"
                          } */
                        >
                          <BsGrid3X3Gap />
                        </a>
                      </div> 
                      {/* icon filters on small screen  */}
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

                      {/* Filter in content select price Low height   */}
                      <div>
                        <select
                          value={filter.sort}
                          onChange={(e) => setFilterSort(e.target.value)}
                          className="form-select"
                          aria-label="Default select example"
                        >
                          <option value="asc">Data: New</option>
                          <option value="desc">Data: Old</option>
                          <option value="rating">Sort by: Rating</option>
                          <option value="low">Price: Low to Hight</option>
                          <option value="hight">Price: Hight to Old</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
                {/*  list products + filter */}
                <FilterDeveloper
                  productsLength={productsLength}
                  limitParamNew={limitParamNew}
                  itemOffset={itemOffset}
                  sortOldPrice={sortOldPrice}
                  minMaxPrice={minMaxPrice}
                  nameFilterCategory={nameFilterCategory}
                  filterRating={filterRating}
                  products={products}
                />
                {/* paginator */}
                {productsLength !== 0 ? (
                  <div className="mt-3">
                    <Paginator
                      itemsPerPage={+filter.limit}
                      newOffset={itemOffset}
                      setCurrentPage={setCurrentPage}
                      items={productsLength}
                      setItemOffset={setItemOffset}
                    />
                  </div>
                ) : null}
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



