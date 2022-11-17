import React from "react";

import { Route, Routes } from "react-router-dom";
import { Error, Home } from "./pages";
import { Product } from "./pages/Product";

import Category from "./pages/Products";

export const AppRouters = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} errorElement={<Error />} />
        <Route
          path="products"
          element={<Category />}
          errorElement={<Error />}
        />
        <Route path="products/product/" element={<Product />} errorElement={<Error />} >
        <Route path=":id" element={<Product />} errorElement={<Error />} />
         </Route>

        <Route path="*" element={<Error />} errorElement={<Error />} />
      </Routes>
    </>
  );
};
