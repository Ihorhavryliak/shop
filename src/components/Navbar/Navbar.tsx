import React, { useEffect, useRef, useState } from "react";
import { BsCart4 } from "react-icons/bs";
import { useSelector } from "react-redux";
import { Link, Navigate, NavLink } from "react-router-dom";
import { getNameCategoryInformation } from "../../reducers/category-reducer/category-selector";
import { Search } from "../Inputs/Search";
import "./Navbar.scss";

const Navbar = React.memo(() => {
  //set links
  const categoryData = useSelector(getNameCategoryInformation);
  const startUrl = `/products/category/`;
  //smartphone button
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  //close menu phone
  const [isOpenMenuSlide, setIsOpenMenuSlide] = useState(false);

  const [height, setHeight] = useState(0);
  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setHeight(ref.current!.offsetHeight);
  });

  console.log(height, "dfdf");
  return (
    <div className="border-bottom  mb-4">
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        {/* button small screen */}
        <div className="container     justify-content-end d-lg-none">
          <button
            className="navbar-toggler"
            type="button"
            onClick={() => setIsOpenMenu(!isOpenMenu)}
          >
            <span className="navbar-toggler-icon"></span>
          </button>
        </div>
        <div className="container ">
          <div className="collapse navbar-collapse" id="navbarNavDropdown">
            <ul className="navbar-nav">
              {categoryData.length
                ? categoryData.map((m, i) => {
                    return (
                      <li className="nav-item" key={i}>
                        <NavLink
                          className="nav-link"
                          aria-current="page"
                          to={`${startUrl}${m.replace(" ", "-")}`}
                        >
                          {m[0].toUpperCase() + m.slice(1)}
                        </NavLink>
                      </li>
                    );
                  })
                : ""}

              <li className="nav-item dropdown">
                <Link
                  className="nav-link dropdown-toggle"
                  to={`products`}
                  data-bs-toggle="dropdown"
                >
                  All categories
                </Link>
                <ul className="dropdown-menu open">
                  {categoryData.length &&
                    categoryData.map((m, i) => {
                      return (
                        <li className="nav-item" key={i}>
                          <NavLink
                            className="dropdown-item"
                            aria-current="page"
                            to={`${startUrl}${m.replace(" ", "-")}`}
                          >
                            {m[0].toUpperCase() + m.slice(1)}
                          </NavLink>
                        </li>
                      );
                    })}
                </ul>
              </li>
            </ul>
          </div>

          {/*end  menu left for phone */}
          <div
            className={`offcanvas offcanvas-start p-4 p-lg-0 d-lg-none ${
              isOpenMenu ? "show" : "show hiding"
            } `}
          >
            <div className="d-flex justify-content-between align-items-center mb-2 d-block d-lg-none">
              <NavLink to="/">
                <span className="logo">
                  <BsCart4 className="logo__icon" /> ShopStore{" "}
                </span>
              </NavLink>
              <button
                type="button"
                className="btn-close text-reset"
                onClick={() => setIsOpenMenu(!isOpenMenu)}
              ></button>
            </div>
            <div className="offcanvas-body">
              <Search />
              {/* menu open */}

              <div className="d-block d-lg-none mb-2 pt-2">
                <a
                  className={`btn btn-dark w-100 d-flex justify-content-center align-items-center `}
                  onClick={() => setIsOpenMenuSlide(!isOpenMenuSlide)}
                  href="#collapseExample"
                >
                  <span className="me-2"></span> 
                  All CATEGORY
                </a>
                <div
                  className={`mt-2 collapse  ${
                    isOpenMenuSlide ? " collapsing show" : " collapsing show "
                  }`}
                  style={{ height: `${isOpenMenuSlide ? `${height}px` : ""} ` }}
                >
                  <div ref={ref} className="card card-body">
                    <ul className="mb-0 list-unstyled">
                      {categoryData.length &&
                        categoryData.map((m, i) => {
                          return (
                            <li className="nav-item" key={i}>
                              <NavLink
                                className="dropdown-item"
                                aria-current="page"
                                to={`${startUrl}${m
                                  .replace(/['/]/g, "-")
                                  .replace(" ", "")}`}
                              >
                                {m[0].toUpperCase() + m.slice(1)}
                              </NavLink>
                            </li>
                          );
                        })}
                    </ul>
                  </div>
                </div>
              </div>
                      {/* list category */}
                      <div className="d-block d-lg-none">
                        <ul className="navbar-nav ">
                          {categoryData.map( (m, i) => {
                            return(
                              <li key={`${i}__`} className="nav-item dropdown">
                              <NavLink className="nav-link" to={startUrl + m}>{m[0].toUpperCase() + m.slice(1)}</NavLink>
                            </li>
                            )
                          })}
                    
                        </ul>
                      </div>

            </div>
          </div>
          {isOpenMenu && (
            <div
              onClick={() => setIsOpenMenu(!isOpenMenu)}
              className={`offcanvas-backdrop fade ${isOpenMenu ? "show" : ""} `}
            ></div>
          )}
        </div>
      </nav>
    </div>
  );
});

export default Navbar;
