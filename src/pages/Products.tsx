import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux/es/exports";
import { NavBreadcrumb } from "../components";

import { getAllProducts } from "../reducers/products-list-selector";
import { AppDispatch } from "../reducers/redux-store";
import { CartProduct } from "../components/Products/ProductsCard";
import { getProducts } from "../reducers/products-list-reducer";

const Category = React.memo(() => {
  const products = useSelector(getAllProducts);
  const dispatch: AppDispatch = useDispatch();
  useEffect(() => {
    dispatch(getProducts());
  }, []);
  console.log(products)
  return (
    <main>
      <NavBreadcrumb />
      <div>
        {/* container */}
        <div className="container">
          <div className="row  gx-10">
            {/*  section filter */}
            <aside className="col-lg-3 col-md-4 mb-6 mb-md-0">erg</aside>
            {/*   content section */}
            <section className="col-lg-9 col-md-12">
              {/* name category */}
              <div>
                <h1>Name category</h1>
              </div>
              {/*   category filter */}
              <div>Filter</div>
              {/*  list products */}
              <div className="row row-cols-xl-4 row-cols-lg-3 row-cols-2 g-2 mt-2">
                {products.map((m) => <CartProduct m={m} key={m.id} />)}
              </div>
            </section>
          </div>
        </div>
      </div>
    </main>
  );
});

export default Category;



