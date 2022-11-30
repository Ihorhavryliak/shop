import React, { useState } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { getNameCategoryInformation } from "../../reducers/category-reducer/category-selector";
import "./Navbar.scss";

const Navbar = React.memo(() => {
  const [isOpenCategory, setOpenCategory] = useState(false);
  const categoryData = useSelector(getNameCategoryInformation);
  const startUrl = `/products/category/`;

  return (
    <div className="border-bottom  mb-4">
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container">
        {/*   <div className="nav-open-menu">
            <button
              className="btn btn-primary px-6"
              type="button"
              id="dropdownMenuButton1"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <span className="me-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="feather feather-grid"
                >
                  <rect x="3" y="3" width="7" height="7"></rect>
                  <rect x="14" y="3" width="7" height="7"></rect>
                  <rect x="14" y="14" width="7" height="7"></rect>
                  <rect x="3" y="14" width="7" height="7"></rect>
                </svg>
              </span>
              All Departments
            </button>
            <ul className="dropdown-menu">
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
          </div> */}
          {/* button small screen */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavDropdown"
            aria-controls="navbarNavDropdown"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon">i</span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavDropdown">
            <ul className="navbar-nav">
              {categoryData.length
                ? categoryData.map((m, i) => {
                    return (
                      <li className="nav-item" key={i}>
                        <NavLink
                          className="nav-link"
                          aria-current="page"
                          to={`${startUrl}${m
                            .replace(/['/]/g, "-")
                            .replace(" ", "")}`}
                        >
                          {m[0].toUpperCase() + m.slice(1)}
                        </NavLink>
                      </li>
                    );
                  })
                : ""}

              <li className="nav-item dropdown">
                <NavLink
                  className="nav-link dropdown-toggle"
                  to={`products/category`}
                  data-bs-toggle="dropdown"
                >
                  All categories
                </NavLink>
                <ul className="dropdown-menu open">
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
              </li>
            </ul>
          </div>
          {/* menu left for phone */}
          <div
            className="offcanvas offcanvas-start p-4 p-lg-0"
            id="navbar-default"
            aria-modal="true"
            role="dialog"
          >
            <div className="d-flex justify-content-between align-items-center mb-2 d-block d-lg-none">
              <a href="./index.html">
                <img
                  src="./assets/images/logo/freshcart-logo.svg"
                  alt="eCommerce HTML Template"
                />
              </a>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
              ></button>
            </div>

            <div className="d-lg-none d-block mb-3">
              <button
                type="button"
                className="btn  btn-outline-gray-400 text-muted w-100 "
                data-bs-toggle="modal"
                data-bs-target="#locationModal"
              >
                <i className="feather-icon icon-map-pin me-2"></i>Pick Location
              </button>
            </div>
          </div>
          {/*end  menu left for phone */}
        </div>
      </nav>
    </div>
  );
});

export default Navbar;
