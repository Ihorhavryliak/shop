import React from "react";
import { CartProduct } from "../ProductsCard/ProductsCard";
import { GetAllProductsType } from "../../../api/products-list-api";

type FilterDeveloperType = {
  products: Array<GetAllProductsType>;
  filterRating: Array<number>;
  nameFilterCategory: Array<string | null>;
  minMaxPrice: number | number[];
  sortOldPrice: string;
  itemOffset: number;
  limitParamNew: number;
  productsLength: number;
};

export const FilterDeveloper: React.FC<FilterDeveloperType> = (props) => {
  const { products, filterRating, nameFilterCategory } = props;
  const { minMaxPrice, sortOldPrice, itemOffset, limitParamNew, productsLength } = props;
  return (
    <div className="row g-4 row-cols-xl-3 row-cols-lg-3 row-cols-2 row-cols-md-2 mt-2">
      {products.length > 0 && products
        /*   rating filter */
        .filter((r) => {
          if (filterRating.length > 0) {
            const min = Math.min(...filterRating);
            const max = Math.max(...filterRating);
            return min - 1 <= r.rating.rate && max >= r.rating.rate; //1 2.2 3  4.8
          } else {
            return r;
          }
        })
        /*   category filter */
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
        })

        /*      sortOldPrice */
        .sort((s, b) => {
          if (sortOldPrice === "low") {
            if (Number.isInteger(s.price)) {
              return s.price * 10 - b.price * 10;
            } else {
              return s.price * 100 - b.price * 100;
            }
          }
          if (sortOldPrice === "hight") {
            if (Number.isInteger(s.price)) {
              return b.price * 10 - s.price * 10;
            } else {
              return b.price * 100 - s.price * 100;
            }
          }

          if (sortOldPrice === "desc") {
            return b.id - s.id;
          }
          if (sortOldPrice === "rating" && Number.isInteger(s.rating.rate)) {
            return b.rating.rate * 10 - s.rating.rate * 10;
          }
          if (sortOldPrice === "rating" && !Number.isInteger(s.rating.rate)) {
            return b.rating.rate * 100 - s.rating.rate * 100;
          }
          /* asc default */
          return s.id - b.id;
        }

        )
        /* paginator slice */
        .slice(
          (itemOffset - 1) * limitParamNew,
          itemOffset * limitParamNew
        )
        .map((m) => (
          <CartProduct m={m} key={m.id} />
        ))}
      {/*  page not found */}

      {productsLength === 0 && <div>Products not founds</div>}
    </div>
  );
};
