import React from "react";

import { Route, Routes, ScrollRestoration } from "react-router-dom";
import {  AdminProducts, HomeAdmin } from "./admin/pages";
import { AddNewProducts } from "./admin/pages/AddNewProducts/AddNewProducts";
import {  Error, Favorite, Home, Checkout, SignUp, Category } from "./pages";
import { Product } from "./pages/Product";
import Products from "./pages/Products";
import { WindowsTopScroll } from "./utils/WindowsTopScroll";



export const AppRouters = () => {
  return (
    <>
      <WindowsTopScroll />
      <Routes>
        <Route path="/"  > 
         <Route index element={<Home />} errorElement={<Error />} /> 
      
         <Route path="/products" >
                <Route index element={<Category />} errorElement={<Error />} /> 
          </Route>

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
         <Route path="favorite"> 
              <Route index element={<Favorite />} errorElement={<Error />} ></Route>
         </Route>
            <Route path="Checkout"> 
              <Route index element={<Checkout />} errorElement={<Error />} ></Route>
         </Route>
         <Route path="sign-up"> 
              <Route index element={<SignUp />} errorElement={<Error />} ></Route>
         </Route>

         
        </Route>
        <Route path="*" element={<Error />} errorElement={<Error />} />
      </Routes>
    </>
  );
};
