import React from "react";

import { Route, Routes } from "react-router-dom";
import {  AdminProducts, HomeAdmin } from "./admin/pages";
import { AddNewProducts } from "./admin/pages/AddNewProducts";
import {  Error, Home } from "./pages";
import { Product } from "./pages/Product";
import Products from "./pages/Products";

export const AppRouters = () => {
  return (
    <>
      <Routes>
        <Route path="/"  > 
         <Route index element={<Home />} errorElement={<Error />} /> 
         <Route path="products" element={<Products />} errorElement={<Error />}/>
          <Route path="/products/category/" >
                <Route index element={<Products />} errorElement={<Error />} /> 
                <Route path=":id" element={<Products />} errorElement={<Error />} />
          </Route>
          <Route path="products/product/">
          <Route index element={<Product />} errorElement={<Error />} /> 
            <Route path=":id" element={<Product />} errorElement={<Error />} />
         </Route>
         <Route path="admin"> 
              <Route index element={<HomeAdmin />} errorElement={<Error />} ></Route>
              <Route path="/admin/add-product" element={<AddNewProducts />} errorElement={<Error />}/>
              <Route path="/admin/products" element={<AdminProducts />} errorElement={<Error />}/>
              all-products
         </Route>
        </Route>
        <Route path="*" element={<Error />} errorElement={<Error />} />
      </Routes>
    </>
  );
};
