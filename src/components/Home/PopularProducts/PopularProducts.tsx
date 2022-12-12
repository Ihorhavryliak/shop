import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { categoryPopularProducts } from "../../../data/setCategoryProducts";
import { getProductsCategory } from "../../../reducers/products-category-reducer/products-category-reducer";
import { getAllProductsCategory } from "../../../reducers/products-category-reducer/products-category-selector";
import { AppDispatch } from "../../../reducers/redux-store";
import { CartProduct } from "../../Products";
import "./PopularProducts.scss";
const PopularProducts = React.memo(() => {
  const products = useSelector(getAllProductsCategory);
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(getProductsCategory('asc', '100'));
  }, []);

  return (
    <section >
      <div className="container">
        <div className="row">
          <div className="col-12 mb-6">
            <h3 className="mb-0 fw-bold">Popular Products</h3>
          </div>
        </div>
        <div className="row g-3 row-cols-lg-5 row-cols-2 row-cols-md-3">
          {products.filter(f =>{
            return(
                f.category === categoryPopularProducts
            )
          }).slice(0, 5).map((m) => (
            <CartProduct m={m} key={m.id} />
          ))}
        </div>
      </div>
    </section>
  );
});

export default PopularProducts;
