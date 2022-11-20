import React from "react";
import { NavLink } from "react-router-dom";
import "../sass/mainAdmin.scss";
export const SidebarAdmin = React.memo(() => {
  return (
    <div className="container">
      <div className="row">
        <a
          href="/"
          className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none"
        >
          <svg className="bi me-2" width="40" height="32"></svg>
          <span className="fs-4">Sidebar</span>
        </a>
      </div>
      <hr />
      <div className="row">
      <ul className="nav nav-pills flex-column mb-auto">
      <li className="nav-item">
        <NavLink to="admin/add-product" className="nav-link text-white" aria-current="page">
          <svg className="bi me-2" width="16" height="16"></svg>
          Add Product
        </NavLink>
        <NavLink to="admin/products" className="nav-link text-white" aria-current="page">
          <svg className="bi me-2" width="16" height="16"></svg>
          All products
        </NavLink>
      </li>
    </ul>
      </div>
    </div>
  );
});
